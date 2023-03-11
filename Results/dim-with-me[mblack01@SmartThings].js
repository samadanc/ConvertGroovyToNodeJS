
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this...', section => {
            section.deviceSetting('masters').capability(['switchLevel']).name('Master Dimmer Switch...');

        });


        page.section('And these will follow with dimming level...', section => {
            section.deviceSetting('slaves').capability(['switchLevel']).name('Slave Dimmer Switch(es)...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'switch', 'switchSetLevelHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'switch.setLevel', 'switchSetLevelHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'switch.on', 'switchSetLevelHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'switch.off', 'switchOffHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        if (state.DWMTurnedOnLight) {
        log.info('The real switch was turned on by DWM so turning off now')
        log.info("switchoffHandler Event: ${event.value}")
        slaves?.off()
        state.DWMTurnedOnLight = false
        } else {
        log.info('The switch was NOT turned on by DWM so NOT turning off now')
        }
        

	})

    .subscribedEventHandler('switchSetLevelHandler', (context, event) => {
        
        if (event.value == 'on' || event.value == 'off') {
        return null
        }
        let level = event.value.toFloat()
        level = level.toInteger()
        log.info("In switchSetLevelHandler setting Level to: $level")
        slaves?.setLevel(level)
        

	})
