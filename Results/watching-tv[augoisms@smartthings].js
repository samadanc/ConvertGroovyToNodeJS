
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select TV Sensor', section => {
            section.deviceSetting('tv').capability(['contactSensor']).name('');

        });


        page.section('Lights ON when TV ON', section => {
            section.deviceSetting('onWhenTVOnSwitches').capability(['switch']).name('');

        });


        page.section('Lights OFF when TV ON', section => {
            section.deviceSetting('offWhenTVOnSwitches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.tv, 'contactSensor', 'contact.open', 'onTVOff')

        await context.api.subscriptions.subscribeToDevices(context.config.tv, 'contactSensor', 'contact.closed', 'onTVOn')

    })

    .subscribedEventHandler('onTVOn', (context, event) => {
        
        console.log('TV is ON')
        
        context.api.devices.sendCommands(context.config.onWhenTVOnSwitches, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.offWhenTVOnSwitches, 'switch', off)
    
        

	})

    .subscribedEventHandler('onTVOff', (context, event) => {
        
        console.log('TV is OFF')
        
        context.api.devices.sendCommands(context.config.onWhenTVOnSwitches, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.offWhenTVOnSwitches, 'switch', on)
    
        

	})
