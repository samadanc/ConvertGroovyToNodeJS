
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Here');
            section.deviceSetting('contact').capability(['contactSensor']).name('pick a contact sensor');
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Pre chek delay (defaults to 3 min)', section => {

        });


        page.section('False alarm threshold (defaults to 10 min)', section => {

        });


        page.section('Send Push Notification?', section => {
            section.booleanSetting('sendPushNotification').name('Send Push Notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'routineChanged')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        state.switchCounter = state.switchCounter + 1
        console.log("switch has been turned on ${state.switchCounter} times")
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        state.motionCounter = state.motionCounter + 1
        console.log("motion has been turned on ${state.motionCounter} times")
        

	})

    .subscribedEventHandler('routineChanged', (context, event) => {
        
        console.log("routineChanged: $evt")
        console.log("evt name: ${event.name}")
        console.log("evt value: ${event.value}")
        console.log("evt displayName: ${event.displayName}")
        console.log("evt descriptionText: ${event.descriptionText}")
        if (event.displayName == 'I\'m Back!') {
        let message_2 = 'Report:' + ((char) 10) + ((char) 13) + ' '
        message_2 = message_2 + " Switch Counter ${state.switchCounter}" + ((char) 10) + ((char) 13) + ' '
        message_2 = message_2 + " Motion Counter ${state.motionCounter}" + ((char) 10) + ((char) 13) + ' '
        log.info(message_2)
        if (this.sendPushN()) {
        this.sendPush(message_2)
        }
        }
        if (event.displayName == 'Goodbye Check!') {
        log.info('Start Goodbye Check')
        log.info('Start delay')
        let pre_start_delay = this.findPreCheckDelay() * 60
        this.runIn(pre_start_delay, 'Goodbye_Check_action')
        }
        

	})

    .subscribedEventHandler('presence', (context, event) => {
        
        console.log("event.name: ${event.value}")
        if (event.value == 'not present') {
        console.log('checking if everyone is away')
        if (this.everyoneIsAway()) {
        log.info('Set Goodbye Check!')
        location.helloHome?.execute('Goodbye Check!')
        } else {
        console.log('mode is the same, not evaluating')
        }
        } else {
        console.log('present; doing nothing')
        }
        

	})
