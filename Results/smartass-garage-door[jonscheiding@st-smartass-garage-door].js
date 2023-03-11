
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage Door', section => {
            section.deviceSetting('doorSwitch').capability(['momentary']).name('Opener');
            section.deviceSetting('doorContactSensor').capability(['contactSensor']).name('Open/Close Sensor');
            section.deviceSetting('doorAccelerationSensor').capability(['accelerationSensor']).name('Movement Sensor');

        });


        page.section('Car / Driver', section => {
            section.deviceSetting('driver').capability(['presenceSensor']).name('Presence Sensor');

        });


        page.section('Interior Door', section => {
            section.deviceSetting('interiorDoor').capability(['contactSensor']).name('Open/Close Sensor');

        });


        page.section('Notifications', section => {
            section.enumSetting('shouldSendPush').name('Push Notifications');

        });


        page.section('Behavior', section => {
            section.booleanSetting('openOnArrival').name('Open On Arrival');
            section.numberSetting('arrivalDebounceMinutes').name('... Except Minutes After Departure');
            section.booleanSetting('closeOnDeparture').name('Close On Departure');
            section.numberSetting('closeOnDepartureDelayMinutes').name('... After Minutes');
            section.enumSetting('closeOnEntry').name('Close On Interior Door Entry');
            section.numberSetting('closeOnEntryDelayMinutes').name('... After Minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doorContactSensor, 'contactSensor', 'contact.closed', 'onGarageDoorClosed')

        await context.api.subscriptions.subscribeToDevices(context.config.interiorDoor, 'contactSensor', 'contact.$contactEvent', 'onInteriorDoorEntry')

        await context.api.subscriptions.subscribeToDevices(context.config.driver, 'presenceSensor', 'presence.present', 'onDriverArrived')

        await context.api.subscriptions.subscribeToDevices(context.config.driver, 'presenceSensor', 'presence.not present', 'onDriverDeparted')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'onModeChanged')

        await context.api.subscriptions.subscribeToDevices(context.config.doorContactSensor, 'contactSensor', 'contact.open', 'onGarageDoorOpen')

    })

    .subscribedEventHandler('onInteriorDoorEntry', (context, event) => {
        
        let expirationMinutes = 15
        if (state.lastArrival < state.lastClosed) {
        return null
        }
        if (state.lastArrival < this.now() - expirationMinutes * this.minutesToMilliseconds()) {
        return null
        }
        if (closeOnEntryDelayMinutes <= 0) {
        this.pushDoorSwitch('closed', "Closing ${doorSwitch.displayName} due to entry into ${interiorDoor.displayName}.", true)
        state.lastArrival = 0
        } else {
        state.lastEntry = this.now()
        this.notifyIfNecessary("${doorSwitch.displayName} will close in $closeOnEntryDelayMinutes minutes due to entry into ${interiorDoor.displayName}.")
        this.runIn(closeOnEntryDelayMinutes * this.minutesToSeconds(), onEntryDelayExpired)
        state.lastArrival = 0
        }
        

	})

    .subscribedEventHandler('onGarageDoorOpen', (context, event) => {
        
        state.lastOpened = this.now()
        

	})

    .subscribedEventHandler('onModeChanged', (context, event) => {
        
        if (!closeOnModes) {
        return null
        }
        if (closeOnModes?.find({
        it == event.value
        })) {
        if (state.lastOpened > this.now() - 1 * this.minutesToMilliseconds()) {
        this.notifyIfNecessary("Mode changed to ${event.value}, but not closing ${doorSwitch.displayName} because it was just opened.", true)
        }
        this.pushDoorSwitch('closed', "Closing ${doorSwitch.displayName} because mode changed to ${event.value}.")
        }
        

	})

    .subscribedEventHandler('onGarageDoorClosed', (context, event) => {
        
        state.lastClosed = this.now()
        

	})

    .subscribedEventHandler('onDriverDeparted', (context, event) => {
        
        state.lastDeparture = this.now()
        if (closeOnDeparture) {
        if (closeOnDepartureDelayMinutes <= 0) {
        this.pushDoorSwitch('closed', "Closing ${doorSwitch.displayName} due to departure of ${driver.displayName}.", true)
        } else {
        this.runIn(closeOnDepartureDelayMinutes * this.minutesToSeconds(), onDepartureDelayExpired)
        }
        }
        

	})

    .subscribedEventHandler('onDriverArrived', (context, event) => {
        
        state.lastArrival = this.now()
        if (openOnArrival) {
        if (this.now() < state.lastDeparture + arrivalDebounceMinutes * this.minutesToMilliseconds()) {
        this.notifyIfNecessary("${doorSwitch.displayName} will not be triggered because ${driver.displayName} left less than $arrivalDebounceMinutes minutes ago.", true)
        return null
        }
        this.pushDoorSwitch('open', "Opening ${doorSwitch.displayName} due to arrival of ${driver.displayName}.")
        }
        

	})
