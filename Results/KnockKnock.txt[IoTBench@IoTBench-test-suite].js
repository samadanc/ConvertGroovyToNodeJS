
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When vibration is detected...', section => {
            section.deviceSetting('accelSensor').capability(['accelerationSensor']).name('Where?');

        });


        page.section('But not when this door is opened...', section => {
            section.deviceSetting('contactSensor').capability(['contactSensor']).name('Ignore if this contact opens');

        });


        page.section('Send this message in a push notification', section => {
            section.textSetting('message').name('Message Text');

        });


        page.section('And text me at (optional)...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact.open', 'contactOpenedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.accelSensor, 'accelerationSensor', 'acceleration', 'vibrationHandler')

    })

    .subscribedEventHandler('contactOpenedHandler', (context, event) => {
        
        console.log("${settings.contactSensor}: ${event.value}")
        if (state.ShouldCheckForKnock) {
        state.DoorWasOpened = true
        }
        

	})

    .subscribedEventHandler('vibrationHandler', (context, event) => {
        
        console.log("Should Check For Knock: ${state.ShouldCheckForKnock}")
        console.log("Door Was Opened: ${state.DoorWasOpened}")
        console.log("Value: ${event.value}")
        console.log("Accelerometer: ${settings.accelSensor}")
        
        context.api.devices.sendCommands(context.config.contactSensor, 'contactSensor', currentState)
    
        if (event.value == 'active' && contactState.value == 'closed') {
        console.log('Potential knock detected')
        state.DoorWasOpened = false
        state.ShouldCheckForKnock = true
        } else {
        if (event.value == 'active' && contactState.value == 'open') {
        console.log('Contact was already open, knock ignored')
        } else {
        if (event.value == 'inactive' && state.ShouldCheckForKnock) {
        state.ShouldCheckForKnock = false
        console.log('Attempting to notify user')
        let notifyUser = true
        if (state.DoorWasOpened) {
        console.log('Contact was opened, knock ignored')
        notifyUser = false
        }
        if (notifyUser) {
        console.log("Notifying user with the following: $message")
        this.sendPush(message)
        if (phone) {
        this.sendSms(phone, message)
        }
        }
        } else {
        console.log('skipping knock check')
        }
        }
        }
        

	})
