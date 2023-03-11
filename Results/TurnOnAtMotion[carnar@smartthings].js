
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when motion detected:', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Where?');

        });


        page.section('Turn on this light', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('Which?');

        });


        page.section('Turn on between what times?', section => {
            section.timeSetting('fromTime').name('From?');
            section.timeSetting('toTime').name('To?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionActiveHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        console.log('Motion detected')
        let between = this.timeOfDayIsBetween(fromTime, toTime, new Date(), location.timeZone)
        if (between) {
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', on)
    
        console.log('...Lights on')
        }
        

	})
