
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this...', section => {
            section.deviceSetting('masters').capability(['switch']).name('Master Switch...');

        });


        page.section('And these will follow with appropriate dimming level...', section => {
            section.deviceSetting('slaves').capability(['switchLevel']).name('Slave Dimmer Switch(es)...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switch', 'switch.on', 'switchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switch', 'switch.off', 'switchOffHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        log.info("switchoffHandler Event: ${event.value}")
        slaves?.off()
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        log.info("switchOnHandler Event: ${event.value}")
        this.getLevelFromSun()
        let level = 50
        log.info("Setting slave level: $level")
        slaves?.on()
        slaves?.setLevel(level)
        

	})
