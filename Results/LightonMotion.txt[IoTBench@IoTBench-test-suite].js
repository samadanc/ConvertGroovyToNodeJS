
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Motion Detector', section => {
            section.deviceSetting('motion_detector').capability(['motionSensor']).name('Where?');

        });


        page.section('Select Light', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Turn off after how many minutes?', section => {
            section.numberSetting('minutesLater').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion_detector, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if (event.value == 'active') {
        console.log('Motion detected, turning on light and killing timer')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        this.unschedule(turnOff)
        } else {
        let delay = minutesLater * 60
        console.log("Motion cleared, turning off switches in $minutesLater minutes ($delays).")
        this.runIn(delay, turnOff)
        }
        

	})
