
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Device(s) under control:', section => {
            section.deviceSetting('ThisSwitch').capability(['switch']).name('Switched Device');

        });


        page.section('Temperature sensors:', section => {
            section.deviceSetting('InsideTemp').capability(['temperatureMeasurement']).name('Inside Thermometer');
            section.deviceSetting('OutsideTemp').capability(['temperatureMeasurement']).name('Outside Thermometer');

        });


        page.section('Temperature settings:', section => {
            section.numberSetting('Delta').name('Temperature Delta');
            section.numberSetting('MinimumTemp').name('Inside Minimum Temp');
            section.numberSetting('MaxTemp').name('Always Run If Hotter Than');
            section.booleanSetting('Override').name('Override off time setting on always run setting?');

        });


        page.section('Time Constraints', section => {
            section.timeSetting('TimeOff').name('Turn off at:');
            section.timeSetting('TimeOn').name('Start program at:');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('stopCallback', delay);

        context.api.schedules.schedule('startCallback', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.OutsideTemp, 'temperatureMeasurement', 'temperature', 'myHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.ThisSwitch, 'switch', 'currentswitch', 'myHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.InsideTemp, 'temperatureMeasurement', 'temperature', 'myHandler')

    })

    .subscribedEventHandler('myHandler', (context, event) => {
        
        let Inside = settings.InsideTemp.currentValue
        let Outside = settings.OutsideTemp.currentValue
        console.log("Variables: $Inside $Outside $Delta $MinimumTemp ${state.fanRunning}")
        if (state.runtime) {
        if (Inside > MinimumTemp && Inside > Outside + Delta || Inside > MaxTemp && !state.fanRunning) {
        console.log('Turn on')
        
        context.api.devices.sendCommands(context.config.ThisSwitch, 'switch', on)
    
        state.fanRunning = true
        } else {
        if (Inside < MinimumTemp || Inside < Outside && Inside < MaxTemp && state.fanRunning) {
        console.log('Turn off')
        
        context.api.devices.sendCommands(context.config.ThisSwitch, 'switch', off)
    
        state.fanRunning = false
        }
        }
        } else {
        if (!state.runtime) {
        if (Inside > MaxTemp ) {
        console.log('Offtime Turn on')
        
        context.api.devices.sendCommands(context.config.ThisSwitch, 'switch', on)
    
        state.fanRunning = true
        } else {
        if (Inside < MaxTemp ) {
        console.log('Offtime Turn off')
        
        context.api.devices.sendCommands(context.config.ThisSwitch, 'switch', off)
    
        state.fanRunning = false
        }
        }
        }
        }
        

	})

    .scheduledEventHandler('startCallback', (context, event) => {
        
        state.runtime = true
        state.fanRunning = false
        

	})

    .scheduledEventHandler('stopCallback', (context, event) => {
        
        state.runtime = false
        state.fanRunning = false
        
        context.api.devices.sendCommands(context.config.ThisSwitch, 'switch', off)
    
        

	})
