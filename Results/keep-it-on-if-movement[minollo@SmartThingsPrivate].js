
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s movement...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Turn on something...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Switches?');

        });


        page.section('Keep it on when I leave for...', section => {
            section.numberSetting('offTimeout').name('Minutes?');

        });


        page.section('Turn off if away...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.active', 'motionActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.inactive', 'motionInactiveHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        try {
        this.unschedule(doOff)
        }
        catch (let e) {
        log.error("Ignoring error: $e")
        }
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        

	})

    .subscribedEventHandler('motionInactiveHandler', (context, event) => {
        
        this.runIn(offTimeout * 60, doOff)
        

	})
