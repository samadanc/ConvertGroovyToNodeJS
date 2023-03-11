
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Detect movement on...', section => {
            section.deviceSetting('motion_detector').capability(['motionSensor']).name('Where?');

        });


        page.section('Things to turn on 1st.', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Things to turn on 2nd.', section => {
            section.deviceSetting('switch2').capability(['switch']).name('');

        });


        page.section('Outside Lights', section => {
            section.deviceSetting('switch3').capability(['switch']).name('');

        });


        page.section('Door that triggers off command', section => {
            section.deviceSetting('door').capability(['contactSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion_detector, 'motionSensor', 'motion', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.door, 'contactSensor', 'contact', 'doorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        if (event.value == 'open') {
        console.log("${event.name} is ${event.value}.")
        this.unschedule()
        this.end()
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if (event.value == 'active') {
        console.log("${event.name} is ${event.value}.")
        if 
        this.start()
        }
        }
        

	})
