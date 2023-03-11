
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Send Notifications?', section => {

        });


        page.section('Input', section => {

        });


        page.section('Device', section => {
            section.deviceSetting('openhabDevice').capability(['notification']).name('Notify this virtual device');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.openhabDevice, 'notification', 'message', 'openhabMessageHandler')

    })

    .subscribedEventHandler('inputHandler', (context, event) => {
        
        let device = event.device
        let capabilities = device.capabilities
        let json = new JsonOutput
        
        context.api.devices.sendCommands(context.config., '', log)
    
        
        context.api.devices.sendCommands(context.config., '', deviceNotification)
    
        

	})

    .subscribedEventHandler('openhabMessageHandler', (context, event) => {
        
        let json = new JsonSlurper
        
        context.api.devices.sendCommands(context.config., '', log)
    
        switch (json.path) {
        case 'update':
        
        context.api.devices.sendCommands(context.config., '', openhabUpdateHandler)
    
        break
        case 'state':
        
        context.api.devices.sendCommands(context.config., '', openhabStateHandler)
    
        break
        case 'discovery':
        
        context.api.devices.sendCommands(context.config., '', openhabDiscoveryHandler)
    
        break
        default:
        
        context.api.devices.sendCommands(context.config., '', log)
    
        }
        

	})
