
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Use this switch as the trigger...', section => {
            section.deviceSetting('trigger').capability(['switch']).name('Switch');

        });


        page.section('Control this device...', section => {
            section.deviceSetting('outlet').capability(['switch']).name('Outlet');

        });


        page.section('Turn off after this many minutes...', section => {
            section.numberSetting('minutes').name('Minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.trigger, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.trigger, 'switch', 'switch.on', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.outlet, 'switch', on)
    
        let delay = minutes * 60
        this.runIn(delay, turnOffSwitch)
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.outlet, 'switch', off)
    
        

	})
