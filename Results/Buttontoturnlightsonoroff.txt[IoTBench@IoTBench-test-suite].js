
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pick a Button...', section => {

        });


        page.section('Push turns on...', section => {
            section.deviceSetting('switchOn').capability(['switch']).name('Lights');

        });


        page.section('Hold turns off...', section => {
            section.deviceSetting('switchOff').capability(['switch']).name('Lights');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.button, 'device.AeonKeyFob', 'button.held', 'allOff')

        await context.api.subscriptions.subscribeToDevices(context.config.button, 'device.AeonKeyFob', 'button.pushed', 'allOn')

    })

    .subscribedEventHandler('allOff', (context, event) => {
        
        console.log('Turning All Off')
        
        context.api.devices.sendCommands(context.config.switchOff, 'switch', off)
    
        

	})

    .subscribedEventHandler('allOn', (context, event) => {
        
        console.log('Turning All On')
        if (switchOn.currentSwitch == 'on') {
        
        context.api.devices.sendCommands(context.config.switchOn, 'switch', off)
    
        } else {
        
        context.api.devices.sendCommands(context.config.switchOn, 'switch', on)
    
        }
        

	})
