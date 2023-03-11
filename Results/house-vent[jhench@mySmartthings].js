
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('On/Off', section => {
            section.booleanSetting('appEnabled').name('true=On, false=Off');

        });


        page.section('Outdoor', section => {
            section.deviceSetting('outTemp').capability(['temperatureMeasurement']).name('Outdoor Thermometer');

        });


        page.section('Automatic Control', section => {
            section.deviceSetting('inTemp').capability(['temperatureMeasurement']).name('Indoor Thermometer');
            section.numberSetting('minTemp').name('Minimum Indoor Temperature');
            section.deviceSetting('fans').capability(['switch']).name('Vent Fan');

        });


        page.section('Manual Control', section => {
            section.deviceSetting('inTemp').capability(['temperatureMeasurement']).name('Indoor Thermometer');
            section.numberSetting('minTemp').name('Minimum Indoor Temperature');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.outTemp, 'temperatureMeasurement', 'temperature', 'checkThings')

        await context.api.subscriptions.subscribeToDevices(context.config.inTemp, 'temperatureMeasurement', 'temperature', 'checkThings')

    })

    .subscribedEventHandler('checkThings', (context, event) => {
        
        let outsideTemp = settings.outTemp.currentValue
        let insideTemp = settings.inTemp.currentValue
        console.log("Inside: $insideTemp, Outside: $outsideTemp, AppEnabled: $appEnabled")
        let shouldRun = true
        if (settings.appEnabled != true) {
        console.log('App disabled')
        shouldRun = false
        }
        if (insideTemp < outsideTemp ) {
        console.log('Not running due to insideTemp > outdoorTemp')
        shouldRun = false
        }
        if (insideTemp < settings.minTemp) {
        console.log('Not running due to insideTemp < minTemp')
        shouldRun = false
        }
        if (shouldRun && !state.fanRunning) {
        
        context.api.devices.sendCommands(context.config.fans, 'switch', on)
    
        state.fanRunning = true
        } else {
        if (!shouldRun && state.fanRunning) {
        
        context.api.devices.sendCommands(context.config.fans, 'switch', off)
    
        state.fanRunning = false
        }
        }
        

	})
