
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Humidity', section => {
            section.deviceSetting('humiditySensor').capability(['relativeHumidityMeasurement']).name('Which Sensor?');
            section.numberSetting('desiredHumidity').name('Desired Humidity?');
            section.deviceSetting('dehumidifierSwitch').capability(['switch']).name('Which Switch?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensor, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

    })

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        console.log("Humidity: ${event.value}, $evt")
        if (Double.parseDouble(event.value.replace('%', '')) <= desiredHumidity ) {
        if 
        console.log('Turning dehumidifier off')
        
        context.api.devices.sendCommands(context.config.dehumidifierSwitch, 'switch', off)
    
        }
        } else {
        if (Double.parseDouble(event.value.replace('%', '')) > desiredHumidity ) {
        if 
        console.log('Turning dehumidifier on')
        
        context.api.devices.sendCommands(context.config.dehumidifierSwitch, 'switch', on)
    
        }
        } else {
        console.log("Current humidity is ${event.value}")
        }
        }
        
        context.api.devices.sendCommands(context.config.dehumidifierSwitch, 'switch', poll)
    
        

	})
