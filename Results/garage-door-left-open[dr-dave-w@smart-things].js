
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage door:', section => {
            section.deviceSetting('theDoor').capability(['contactSensor']).name('Which door sensor?');

        });


        page.section('', section => {

        });


        page.section('Presence:', section => {
            section.deviceSetting('thePresence').capability(['presenceSensor']).name('Which presence sensor?');

        });


        page.section('Send Notifications?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theDoor, 'contactSensor', 'contact', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thePresence, 'presenceSensor', 'presence', 'presenceHandler')

        context.api.schedules.runIn('checkDoor', delay);

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        console.log("doorHandler ${event.value}.")
        if (event.value == 'open') {
        console.log('The door has been opened. Start the clock.')
        this.runIn(60 * minutes , checkDoor)
        } else {
        console.log('The door has been closed. Call off the dogs.')
        this.unschedule(checkDoor)
        }
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("presenceHandler ${event.value}.")
        if (event.value == 'present') {
        console.log('Not doing anything. Present.')
        } else {
        console.log('Ah ha! Gone away.')
        let dateFormatter = new java.text.SimpleDateFormat('HH:mm:ss')
        dateFormatter.setTimeZone(location.timeZone)
        let time = dateFormatter.format(new Date())
        
        context.api.devices.sendCommands(context.config.theDoor, 'contactSensor', currentState)
    
        let doorIs = currentState.value
        console.log("The door is $doorIs.")
        if (doorIs == 'open') {
        let message = "OMG! The door has been left open! ($time)"
        console.log(message)
        this.sendSms(phone, message)
        } else {
        let message = "Relax, the garage is closed. ($time)"
        this.sendPush(message)
        }
        }
        

	})

    .scheduledEventHandler('checkDoor', (context, event) => {
        
        console.log('The door is STILL open!')
        let message = "Hey there! The door garage door has been open for $minutes"
        if (minutes == 1) {
        message = message + ' minute.'
        } else {
        message = message + ' minutes.'
        }
        console.log(message)
        this.sendSms(phone, message)
        

	})
