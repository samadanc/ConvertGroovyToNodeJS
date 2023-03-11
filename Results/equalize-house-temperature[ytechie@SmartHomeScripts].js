
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Temperature Sensors', section => {
            section.deviceSetting('mainFloorTempSensor').capability(['temperatureMeasurement']).name('');
            section.deviceSetting('secondFloorTempSensor').capability(['temperatureMeasurement']).name('');

        });


        page.section('Thermostat', section => {
            section.deviceSetting('furnaceFan').capability(['thermostat']).name('');

        });


        page.section('Parameters', section => {
            section.numberSetting('targetDiff').name('Temperature Difference');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.secondFloorTempSensor, 'temperatureMeasurement', 'temperature', 'tempChange')

        await context.api.subscriptions.subscribeToDevices(context.config.mainFloorTempSensor, 'temperatureMeasurement', 'temperature', 'tempChange')

    })

    .subscribedEventHandler('tempChange', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.mainFloorTempSensor, 'temperatureMeasurement', log)
    
        
        context.api.devices.sendCommands(context.config.secondFloorTempSensor, 'temperatureMeasurement', log)
    
        
        context.api.devices.sendCommands(context.config.mainFloorTempSensor, 'temperatureMeasurement', abs)
    
        console.log('Temp difference: ' + actualDiff )
        console.log('Max difference: ' + targetDiff )
        if (actualDiff > targetDiff ) {
        
        context.api.devices.sendCommands(context.config.furnaceFan, 'thermostat', fanOn)
    
        console.log('Turning furnace fan on to equalize temperature')
        } else {
        
        context.api.devices.sendCommands(context.config.furnaceFan, 'thermostat', fanAuto)
    
        console.log('Turning furnace fan back to automatic')
        }
        

	})
