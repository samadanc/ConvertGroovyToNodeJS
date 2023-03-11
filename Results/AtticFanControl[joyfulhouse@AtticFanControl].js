
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Outdoor', section => {
            section.deviceSetting('outTemp').capability(['temperatureMeasurement']).name('Outdoor Thermometer');
            section.numberSetting('minTempDiff').name('Minimum Temperature Difference');

        });


        page.section('Indoor', section => {
            section.deviceSetting('inTemp').capability(['temperatureMeasurement']).name('Indoor Thermometer');
            section.numberSetting('minTemp').name('Minimum Indoor Temperature');
            section.numberSetting('maxTemp').name('Maximum Indoor Temperature');
            section.deviceSetting('fan').capability(['switch']).name('Attic Fan');

        });


        page.section('Override Switch', section => {
            section.booleanSetting('checkSwitch').name('Enable Override Switch');
            section.booleanSetting('invertCheckSwitch').name('Invert On/Off');
            section.deviceSetting('overrideSwitch').capability(['switch']).name('Override Switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.outTemp, 'temperatureMeasurement', 'temperature', 'checkThings')

        await context.api.subscriptions.subscribeToDevices(context.config.fan, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.inTemp, 'temperatureMeasurement', 'temperature', 'checkThings')

        await context.api.subscriptions.subscribeToDevices(context.config.overrideSwitch, 'switch', 'switch', 'overrideSwitch')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.value == 'on') {
        state.fanRunning = true
        } else {
        if (event.value == 'off') {
        state.fanRunning = false
        }
        }
        this.checkThings(evt)
        

	})

    .subscribedEventHandler('checkThings', (context, event) => {
        
        if (!state.overrideOn || !settings.checkSwitch) {
        let outsideTemp = settings.outTemp.currentTemperature
        let insideTemp = settings.inTemp.currentTemperature
        let shouldRun = true
        if (insideTemp < outsideTemp ) {
        shouldRun = false
        }
        if (insideTemp - outsideTemp < settings.minTempDiff) {
        shouldRun = false
        }
        if (insideTemp < settings.minTemp) {
        shouldRun = false
        }
        if (insideTemp > settings.maxTemp) {
        shouldRun = true
        }
        if (shouldRun) {
        if
        
        context.api.devices.sendCommands(context.config.fan, 'switch', on)
    
        state.fanRunning = true
        }
        } else {
        if (!shouldRun) {
        if
        
        context.api.devices.sendCommands(context.config.fan, 'switch', off)
    
        state.fanRunning = false
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('overrideSwitch', (context, event) => {
        
        if (!settings.invertCheckSwitch) {
        if (event.value == 'on') {
        state.overrideOn = true
        } else {
        state.overrideOn = false
        }
        } else {
        if (event.value == 'on') {
        state.overrideOn = false
        } else {
        state.overrideOn = true
        }
        }
        if (state.overrideOn) {
        
        context.api.devices.sendCommands(context.config.fan, 'switch', off)
    
        }
        this.checkThings(evt)
        

	})
