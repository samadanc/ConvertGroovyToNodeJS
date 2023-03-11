
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('FUS Module:', section => {
            section.deviceSetting('fus').capability(['temperatureMeasurement']).name('Which FUS Module?');
            section.deviceSetting('temperature1').capability(['temperatureMeasurement']).name('First temp probe?');
            section.deviceSetting('temperature2').capability(['temperatureMeasurement']).name('Second temp probe?');
            section.deviceSetting('temperature3').capability(['temperatureMeasurement']).name('Third temp probe?');
            section.deviceSetting('temperature4').capability(['temperatureMeasurement']).name('Fourth temp probe?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.fus, 'temperatureMeasurement', 'temperature4', 'rsmHandler4')

        await context.api.subscriptions.subscribeToDevices(context.config.fus, 'temperatureMeasurement', 'temperature2', 'rsmHandler2')

        await context.api.subscriptions.subscribeToDevices(context.config.fus, 'temperatureMeasurement', 'temperature1', 'rsmHandler1')

        await context.api.subscriptions.subscribeToDevices(context.config.fus, 'temperatureMeasurement', 'temperature3', 'rsmHandler3')

    })

    .subscribedEventHandler('rsmHandler4', (context, event) => {
        
        let t4 = 0
        console.log('FUS RsMHandler4')
        
        context.api.devices.sendCommands(context.config.fus, 'temperatureMeasurement', currentValue)
    
        console.log(t4)
        settings.temperature4.setTemperature
        

	})

    .subscribedEventHandler('rsmHandler1', (context, event) => {
        
        let t1 = 0
        console.log('FUS RsMHandler1')
        
        context.api.devices.sendCommands(context.config.fus, 'temperatureMeasurement', currentValue)
    
        console.log(t1)
        settings.temperature1.setTemperature
        

	})

    .subscribedEventHandler('rsmHandler2', (context, event) => {
        
        let t2 = 0
        console.log('FUS RsMHandler2')
        
        context.api.devices.sendCommands(context.config.fus, 'temperatureMeasurement', currentValue)
    
        console.log(t2)
        settings.temperature2.setTemperature
        

	})

    .subscribedEventHandler('rsmHandler3', (context, event) => {
        
        let t3 = 0
        console.log('FUS RsMHandler3')
        
        context.api.devices.sendCommands(context.config.fus, 'temperatureMeasurement', currentValue)
    
        console.log(t3)
        settings.temperature3.setTemperature
        

	})
