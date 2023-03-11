
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When these switches are toggled adjust the indicator...', section => {
            section.deviceSetting('mains').capability(['switch']).name('Switches to fix...');

        });


        page.section('When these switches are toggled adjust the indicator in reverse (useful for Linear brand)...', section => {
            section.deviceSetting('mains2').capability(['switch']).name('Switches to fix in reverse...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.mains, 'switch', 'switch.on', 'switchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.mains2, 'switch', 'switch.on', 'switchOnHandler2')

        await context.api.subscriptions.subscribeToDevices(context.config.mains2, 'switch', 'switch.off', 'switchOffHandler2')

        await context.api.subscriptions.subscribeToDevices(context.config.mains, 'switch', 'switch.off', 'switchOffHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        log.info("switchoffHandler Event: ${event.value}")
        mains?.indicatorWhenOn()
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        log.info("switchOnHandler Event: ${event.value}")
        mains?.indicatorWhenOff()
        

	})

    .subscribedEventHandler('switchOnHandler2', (context, event) => {
        
        log.info("switchOnHandler2 Event: ${event.value}")
        mains2?.indicatorWhenOn()
        

	})

    .subscribedEventHandler('switchOffHandler2', (context, event) => {
        
        log.info("switchoffHandler2 Event: ${event.value}")
        mains2?.indicatorWhenOff()
        

	})
