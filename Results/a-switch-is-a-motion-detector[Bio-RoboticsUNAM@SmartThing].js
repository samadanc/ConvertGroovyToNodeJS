
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Please select the switch that will trigger your motion detector\'s \'active\' state.', section => {
            section.deviceSetting('triggerSwitch').capability(['switch']).name('Select Switch');

        });


        page.section('Please select your custom fake motion detector (this won\'t work with hardware motion detectors because they typically don\'t accept commands).', section => {
            section.deviceSetting('fakeMotion').capability(['motionSensor']).name('Select Fake Motion Detector');

        });


        page.section('Motion will time out after this many seconds:', section => {
            section.numberSetting('seconds').name('Seconds');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.triggerSwitch, 'switch', 'switch.on', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log(event.value)
        if
        this.unschedule('deactivate')
        
        context.api.devices.sendCommands(context.config.fakeMotion, 'motionSensor', activate)
    
        console.log("activated ${fakeMotion.name}. Will deactivate in about $seconds seconds.")
        this.runIn(seconds, deactivate)
        } else {
        console.log("${fakeMotion.name} doesn't support the command 'activate'.")
        }
        this.runIn(10, turnOffTriggerSwitch)
        

	})
