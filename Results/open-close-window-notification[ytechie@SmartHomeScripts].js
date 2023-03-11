
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Temperature Sensors', section => {
            section.deviceSetting('mainFloorTempSensor').capability(['temperatureMeasurement']).name('');
            section.deviceSetting('outdoorTempSensor').capability(['temperatureMeasurement']).name('');

        });


        page.section('Parameters', section => {
            section.numberSetting('targetTemp').name('Target Temperature');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.outdoorTempSensor, 'temperatureMeasurement', 'temperature', 'tempChange')

        await context.api.subscriptions.subscribeToDevices(context.config.mainFloorTempSensor, 'temperatureMeasurement', 'temperature', 'tempChange')

    })

    .subscribedEventHandler('tempChange', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.mainFloorTempSensor, 'temperatureMeasurement', log)
    
        
        context.api.devices.sendCommands(context.config.outdoorTempSensor, 'temperatureMeasurement', log)
    
        
        context.api.devices.sendCommands(context.config.outdoorTempSensor, 'temperatureMeasurement', latestValue)
    
        
        context.api.devices.sendCommands(context.config.mainFloorTempSensor, 'temperatureMeasurement', latestValue)
    
        let shouldBeOpen = outdoorTemp < indoorTemp
        if (state.open && !shouldBeOpen) {
        this.sendPush('Close the Windows')
        state.open = false
        }
        if (!state.open && shouldBeOpen ) {
        this.sendPush('Open the Windows')
        state.open = true
        }
        console.log('Windows open: ' + state.open)
        

	})
