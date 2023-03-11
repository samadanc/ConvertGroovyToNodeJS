
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Garden Waterer'', section => {

        });


        page.section('Select a soil moisture sensor', section => {
            section.deviceSetting('soil1').capability(['relativeHumidityMeasurement']).name('Soil moisture sensor...');

        });


        page.section('Select a hose valve switch to turn on', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Turn on the hose when the soil moisture drops to:', section => {
            section.numberSetting('soilMin').name('Minium soil moisture...');

        });


        page.section('Turn off the hose when the soil moisture reaches:', section => {
            section.numberSetting('soilMax').name('Maximum soil moisture...');

        });


        page.section('Notify me when hose turns on:', section => {
            section.booleanSetting('sendPushMessage').name('Send push notification?');

        });


        page.section('Do not notify me in the following modes:', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('moistureSpotCheck', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.soil1, 'relativeHumidityMeasurement', 'humidity', 'moistureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        let switchValue = switchEvt.value
        console.log("${state.name}: switchHandler called")
        console.log("${state.name}: ${switchEvt.displayname} is $switchValue")
        state.switchValue = switchValue
        

	})

    .subscribedEventHandler('moistureHandler', (context, event) => {
        
        let moistureValue = moistureEvt.value.toInteger()
        state.soil1Name = moistureEvt.getDevice()
        console.log("${state.name}: moistureHandler called")
        console.log("${state.name}: ${state.soil1Name} moisture is $moistureValue")
        state.moistureValue = moistureValue
        if (moistureValue <= soilMin ) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        state.switchValue = 'on'
        console.log("${state.name}: Turning ${state.switch1Name} on")
        } else {
        if (moistureValue >= soilMax && state.switchValue == 'on') {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        state.switchValue = 'off'
        console.log("${state.name}: Turning ${state.switch1Name} off")
        } else {
        console.log("${state.name}: No Action, ${state.switch1Name} already ${state.switchValue}")
        }
        }
        

	})

    .scheduledEventHandler('moistureSpotCheck', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.soil1, 'relativeHumidityMeasurement', currentValue)
    
        state.switch1Name = switch1.getDevice
        console.log("${state.name}: moistureSpotCheck called")
        
        context.api.devices.sendCommands(context.config.soil1, 'relativeHumidityMeasurement', log)
    
        if (moistureValue <= soilMin ) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        state.switchValue = 'on'
        console.log('')
        } else {
        if (moistureValue >= soilMax && state.switchValue == 'on') {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        state.switchValue = 'off'
        console.log("${state.name}: Turning ${state.switch1Name} off")
        } else {
        console.log("${state.name}: No Action, ${state.switch1Name} already ${state.switchValue}")
        }
        }
        

	})
