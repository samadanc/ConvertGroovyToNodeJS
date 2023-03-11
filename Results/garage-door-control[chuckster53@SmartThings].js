
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('The Door', section => {
            section.deviceSetting('doorSensor').capability(['contactSensor']).name('Which Sensor? ');
            section.deviceSetting('switches').capability(['switch']).name('');
            section.textSetting('doorName').name('Name');

        });


        page.section('Arrival / Departure', section => {
            section.deviceSetting('presenceArrive').capability(['presenceSensor']).name('Open when these people arrive:');
            section.deviceSetting('presenceDepart').capability(['presenceSensor']).name('Close when these people leave:');

        });


        page.section('Night Settings', section => {
            section.booleanSetting('sunsetOff').name('Close after sunset');

        });


        page.section('Sunset offset (optional)...', section => {
            section.textSetting('sunsetOffsetValue').name('HH:MM');
            section.enumSetting('sunsetOffsetDir').name('Before or After');

        });


        page.section('Zip code (optional, defaults to location coordinates)...', section => {
            section.textSetting('zipCode').name('');

        });


        page.section('If opened after dark, close after...', section => {
            section.numberSetting('closeAfter').name('Minutes');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Open Too Long', section => {
            section.numberSetting('notifyLeftOpen').name('Minutes');
            section.numberSetting('notifyFrequency').name('Minutes');
            section.numberSetting('notifyMax').name('Times');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunriseSunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceArrive, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceDepart, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.doorSensor, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'position', 'locationPositionChange')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("Contact is in ${event.value} state")
        if (event.value == 'open' && notify.contains('Opening')) {
        let openTime = "${event.date}"
        console.log("$openTime")
        let msg = "${this.getDoorName()} opened $openTime"
        console.log("$msg")
        this.sendPush("$msg")
        }
        if (event.value == 'closed' && notify.contains('Closing')) {
        let msg = "${this.getDoorName()} closed"
        console.log("$msg")
        this.sendPush("$msg")
        }
        if (event.value == 'open') {
        let openTime = "${event.date}"
        if (closeAfter && this.isItNight()) {
        console.log("closeAfter: $closeAfter minutes")
        this.runIn(closeAfter * 60, closeWhenDark)
        } else {
        if (notifyLeftOpen && event.value == 'open') {
        this.scheduleDoorCheck()
        }
        }
        }
        if (event.value == 'closed') {
        console.log('close()')
        state.openTime = 0
        state.openNotifyCount = 0
        }
        

	})

    .subscribedEventHandler('sunriseSunsetTimeHandler', (context, event) => {
        
        log.trace('sunriseSunsetTimeHandler()')
        this.astroCheck()
        

	})

    .subscribedEventHandler('locationPositionChange', (context, event) => {
        
        log.trace('locationChange()')
        this.astroCheck()
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("${event.displayName} has left the $location")
        if (event.value == 'not present' && doorSensor.contactState.value == 'open') {
        for (let person : presenceDepart ) {
        if (person.toString() == event.displayName) {
        this.close()
        if (notify.contains('Closing')) {
        let msg = "Closing ${this.getDoorName()} due to the departure of ${event.displayName}"
        console.log("$msg")
        this.sendPush("$msg")
        }
        break
        }
        }
        }
        if (event.value == 'present' && doorSensor.contactState.value == 'closed') {
        for (let person : presenceArrive ) {
        if (person.toString() == event.displayName) {
        this.open()
        if (notify.contains('Opening')) {
        let msg = "Opening ${this.getDoorName()} due to the arriaval of ${event.displayName}"
        console.log("$msg")
        this.sendPush("$msg")
        }
        break
        }
        }
        }
        

	})
