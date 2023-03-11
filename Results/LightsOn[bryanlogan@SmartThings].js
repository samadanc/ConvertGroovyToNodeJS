
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Trigger lights when', section => {
            section.deviceSetting('MotionSensor').capability(['motionSensor']).name('Motion Detected');
            section.deviceSetting('OpenSensor').capability(['contactSensor']).name('Contact Opens');
            section.deviceSetting('LightSensor').capability(['illuminanceMeasurement']).name('Only When Dark');

        });


        page.section('Lights to turn on', section => {
            section.deviceSetting('Lights').capability(['switch']).name('Which?');

        });


        page.section('Turning Off', section => {
            section.numberSetting('OffDelayMinutes').name('Turn off after x minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.MotionSensor, 'motionSensor', 'motion', 'triggerEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.OpenSensor, 'contactSensor', 'contact', 'triggerEvent')

    })

    .subscribedEventHandler('triggerEvent', (context, event) => {
        
        console.log("triggerEvent ${event.name} - ${event.value}")
        console.log("state.LightsOn = ${state.LightsOn}")
        let delay = 60
        if (event.isPhysical()) {
        delay = 60 * OffDelayMinutes
        }
        let action = ''
        if (event.name == 'motion') {
        if (event.value == 'active') {
        action = 'on'
        } else {
        action = 'off'
        }
        } else {
        if (event.name == 'contact') {
        if (event.value == 'open') {
        action = 'on'
        } else {
        action = 'off'
        }
        }
        }
        if (action == 'on') {
        if (state.LightsOn) {
        this.unschedule()
        } else {
        Lights?.on()
        state.LightsOn = true
        }
        } else {
        if (state.LightsOn) {
        console.log("scheduling off callback in $delay sec")
        this.runIn(delay, 'lightsOffCallback')
        }
        }
        

	})
