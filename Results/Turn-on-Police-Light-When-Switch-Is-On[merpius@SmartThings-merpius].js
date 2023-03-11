
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When a Switch is turned on...', section => {
            section.deviceSetting('switchMaster').capability(['switch']).name('Which?');

        });


        page.section('Turn on this/these Fibaro Police Light(s)...', section => {
            section.deviceSetting('fibaros').capability(['color control']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switchMaster, 'switch', 'switch.off', 'switchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switchMaster, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        log.trace("Turning off Fibaro RGBW: $fibaros")
        
        context.api.devices.sendCommands(context.config.fibaros, 'color control', off)
    
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        log.trace("Turning on Fibaro RGBW: $fibaros")
        
        context.api.devices.sendCommands(context.config.fibaros, 'color control', police)
    
        

	})
