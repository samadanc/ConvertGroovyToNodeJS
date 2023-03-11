
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Devices', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('Power Meter to Monitor.');
            section.deviceSetting('outlet').capability(['switch']).name('Outlet to Switch.');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'switchMeter')

    })

    .subscribedEventHandler('switchMeter', (context, event) => {
        
        let meterValue = (event.value as double)
        if (meterValue > 2) {
        
        context.api.devices.sendCommands(context.config.outlet, 'switch', on)
    
        } else {
        
        context.api.devices.sendCommands(context.config.outlet, 'switch', off)
    
        }
        

	})
