
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Security Sensors', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contact Sensors');
            section.deviceSetting('accelerations').capability(['accelerationSensor']).name('Acceleration Sensors');

        });


        page.section('Alarms to set off', section => {
            section.deviceSetting('lights').capability(['switch']).name('Turn on these lights');
            section.deviceSetting('alarms').capability(['alarm']).name('Activate these alarms');

        });


        page.section('Delay after motion', section => {
            section.numberSetting('motionDelay').name('Time to wait after motion (minutes)?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion.active', 'updateMotion')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerations, 'accelerationSensor', 'acceleration.active', 'triggerAlarm')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact.open', 'triggerAlarm')

    })

    .subscribedEventHandler('updateMotion', (context, event) => {
        
        console.log('motion detected')
        state.lastMotion = this.now()
        

	})

    .subscribedEventHandler('triggerAlarm', (context, event) => {
        
        let nowWithDelay = this.now() - motionDelay * 60 * 1000
        console.log("time with added delay $nowWithDelay")
        console.log("${state.lastMotion}")
        if (nowWithDelay > state.lastMotion) {
        console.log('triggering alarm')
        lights?.on()
        alarm?.both()
        }
        

	})
