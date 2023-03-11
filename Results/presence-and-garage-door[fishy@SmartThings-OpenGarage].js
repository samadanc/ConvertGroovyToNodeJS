
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage Door', section => {
            section.deviceSetting('door').capability(['garageDoorControl']).name('Which One?');

        });


        page.section('Presence Sensors', section => {
            section.deviceSetting('cars').capability(['presenceSensor']).name('Cars?');

        });


        page.section('Real close threshold', section => {
            section.numberSetting('seconds').name('Seconds?');
            section.textSetting('phone').name('Send SMS to this number?');
            section.deviceSetting('contact').capability(['contactSensor']).name('Optional helper contact sensor');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.door, 'garageDoorControl', 'door', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.cars, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        console.log("doorHandler: ${event.value}: $evt, $settings")
        if ('closing' == event.value || 'closed' == event.value) {
        state.lastClose = this.now()
        }
        

	})

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("contactHandler: ${event.value}: $evt, $settings")
        if ('closed' == event.value) {
        state.lastClose = this.now()
        }
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        let carName = event.getDevice().displayName
        console.log("presenceHandler: ${event.value}, $carName, $state, $settings")
        
        context.api.devices.sendCommands(context.config.door, 'garageDoorControl', latestValue)
    
        console.log("Current garage state: $doorState")
        if ('present' == event.value) {
        if (state.shouldOpen) {
        let msg = "Opening ${door.displayName} because $carName is home."
        console.log("$msg")
        this.sendPush(msg)
        
        context.api.devices.sendCommands(context.config.door, 'garageDoorControl', open)
    
        } else {
        let msg = "NOT auto opening ${door.displayName} as we didn't auto close it earlier"
        console.log("$msg")
        if (phone) {
        this.sendSms(phone, msg)
        }
        }
        } else {
        if ('not present' == event.value) {
        let shouldClose = true
        let now = this.now()
        let elapsed = now - state.lastClose
        if (seconds) {
        let milliSec = seconds * 1000
        shouldClose = 'closed' != doorState || milliSec > elapsed
        }
        state.shouldOpen = shouldClose
        if (shouldClose) {
        console.log("Closing at ${state.lastClose}")
        let msg = "Closing ${door.displayName} because $carName is leaving."
        console.log("$msg")
        this.sendPush(msg)
        
        context.api.devices.sendCommands(context.config.door, 'garageDoorControl', close)
    
        } else {
        let sec = elapsed / 1000
        let msg = "NOT auto closing as ${door.displayName} was $doorState and last closing was $secs ago"
        console.log("$msg")
        if (phone) {
        this.sendSms(phone, msg)
        }
        }
        }
        }
        

	})
