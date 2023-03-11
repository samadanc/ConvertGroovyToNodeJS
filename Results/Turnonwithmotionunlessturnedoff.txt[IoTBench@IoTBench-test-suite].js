
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Sensor');
            section.deviceSetting('lights').capability(['switch']).name('Lights to turn on');

        });


        page.section('Preferences', section => {
            section.deviceSetting('switchLight').capability(['switch']).name('Switch');
            section.numberSetting('minutes').name('Minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switchLight, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("Switch Handler - Evt value: ${event.value}, isPhysical: ${event.isPhysical()}")
        if (event.value == 'off' && event.isPhysical()) {
        console.log('Motion disabled')
        state.enabled = false
        let runInMins = minutes * 60
        this.runIn(runInMins, enable)
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("Motion Handler - Evt value: ${event.value}")
        if (event.value == 'active') {
        if (state.enabled) {
        console.log('Turning on lights')
        lights?.on()
        } else {
        console.log('Motion is disabled - not turning on lights')
        }
        }
        

	})
