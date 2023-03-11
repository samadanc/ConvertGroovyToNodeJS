
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which Camera Device:', section => {
            section.deviceSetting('camera').capability(['switch']).name('');

        });


        page.section('Maker Key:', section => {

        });


        page.section('Which Wemo outlet:', section => {
            section.deviceSetting('cameraOutlet').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.cameraOutlet, 'switch', 'switch.off', 'scheduleOn')

        await context.api.subscriptions.subscribeToDevices(context.config.camera, 'switch', 'switch.off', 'resetOutlet')

    })

    .subscribedEventHandler('resetOutlet', (context, event) => {
        
        console.log('Resetting Outlet')
        
        context.api.devices.sendCommands(context.config.cameraOutlet, 'switch', reset)
    
        
        context.api.devices.sendCommands(context.config.camera, 'switch', beenReset)
    
        

	})

    .subscribedEventHandler('scheduleOn', (context, event) => {
        
        console.log('outlet is off scheduling on')
        
        context.api.devices.sendCommands(context.config.cameraOutlet, 'switch', on)
    
        console.log('Outlet turned on')
        if 
        this.runIn(60, scheduleOn)
        }
        

	})
