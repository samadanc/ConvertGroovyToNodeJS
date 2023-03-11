
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the temperature...', section => {
            section.deviceSetting('temperatureSensor1').capability(['temperatureMeasurement']).name('');

        });


        page.section('Only run when this door is closed...', section => {
            section.deviceSetting('contactSwitch').capability(['contactSensor']).name('Room Door?');

        });


        page.section('Delay turnning off switch for this many minutes after door is opened...', section => {
            section.numberSetting('delayMinutes').name('Delay?');

        });


        page.section('Unless this switch or virtual switch is on...', section => {
            section.deviceSetting('overrideSwitch').capability(['switch']).name('Enable Switch');

        });


        page.section('Turn off when the temperature drops below...', section => {
            section.numberSetting('temperatureLow').name('Temperature?');

        });


        page.section('Turn on when the temperature goes above...', section => {
            section.numberSetting('temperatureHigh').name('Temperature?');

        });


        page.section('Control this switch... (For AC or Fan)', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.overrideSwitch, 'switch', 'switch', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSwitch, 'contactSensor', 'contact', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor1, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        console.log('Change in door or override switch status')
        
        context.api.devices.sendCommands(context.config.overrideSwitch, 'switch', currentValue)
    
        let doorState = contactSwitch.currentContact
        if (overrideEnable == 'off' && doorState == 'open') {
        console.log('Scheduling Next Check if door is open')
        state.overrideEnable = False
        this.runIn(delayMinutes * 60, turnOffDoor)
        } else {
        if (overrideEnable == 'off' && doorState == 'closed') {
        console.log('Setting ForceOFF FALSE')
        state.overrideEnable = False
        state.forceOff = False
        } else {
        console.log('Override Enabled.. Leaving On')
        state.overrideEnable = True
        state.forceOff = False
        }
        }
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        log.trace("temperature: ${event.value}, $evt")
        let tooCold = temperatureLow
        let tooHot = temperatureHigh
        let mySwitch = settings.switch1
        let forcedOff = state.forceOff
        console.log("ForcedOff Stats: $forcedOff")
        if (event.doubleValue <= tooCold ) {
        console.log("Checking how long the temperature sensor has been reporting <= $tooCold")
        let deltaMinutes = 5
        let timeAgo = new Date(this.now() - 1000 * 60 * deltaMinutes .toLong())
        
        context.api.devices.sendCommands(context.config.temperatureSensor1, 'temperatureMeasurement', eventsSince)
    
        it.name == 'temperature'
        })
        log.trace("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $deltaMinutes minutes")
        let alreadySentSms = recentEvents.count({
        it.doubleValue <= tooCold
        }) > 1
        if (alreadySentSms) {
        console.log("SMS already sent to $phone1 within the last $deltaMinutes minutes")
        } else {
        console.log("Temperature dropped below $tooCold:  sending SMS to $phone1 and activating $mySwitch")
        this.send("${temperatureSensor1.displayName} is too cold, reporting a temperature of ${event.value}${(event.unit) ? event.unit : F}")
        switch1?.off()
        }
        } else {
        if (event.doubleValue >= tooHot && forcedOff == False ) {
        console.log("Checking how long the temperature sensor has been reporting <= $tooCold")
        let deltaMinutes = 5
        let timeAgo = new Date(this.now() - 1000 * 60 * deltaMinutes .toLong())
        
        context.api.devices.sendCommands(context.config.temperatureSensor1, 'temperatureMeasurement', eventsSince)
    
        it.name == 'temperature'
        })
        log.trace("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $deltaMinutes minutes")
        let alreadySentSms = recentEvents.count({
        it.doubleValue <= tooCold
        }) > 1
        if (alreadySentSms) {
        console.log("SMS already sent to $phone1 within the last $deltaMinutes minutes")
        } else {
        console.log("Temperature went above $tooHot:  sending SMS to $phone1 and activating $mySwitch")
        this.send("${temperatureSensor1.displayName} is too hot, reporting a temperature of ${event.value}${(event.unit) ? event.unit : F}")
        switch1?.on()
        }
        }
        }
        

	})
