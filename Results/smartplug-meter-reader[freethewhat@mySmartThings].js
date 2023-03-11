
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('SmartPlug Outlet', section => {
            section.deviceSetting('themeter').capability(['powerMeter']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themeter, 'powerMeter', 'switch.off', 'turnOffMonitor')

        await context.api.subscriptions.subscribeToDevices(context.config.themeter, 'powerMeter', 'switch.on', 'turnOnMonitor')

    })

    .subscribedEventHandler('turnOnMonitor', (context, event) => {
        
        console.log("themeter is powered on $evt")
        this.schedule('* * * * * ?', meterRefresh)
        

	})

    .subscribedEventHandler('turnOffMonitor', (context, event) => {
        
        console.log("themeter is powered off. $evt")
        this.unschedule(meterRefresh)
        

	})
