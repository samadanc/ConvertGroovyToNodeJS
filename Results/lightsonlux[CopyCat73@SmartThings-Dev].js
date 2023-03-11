
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Settings', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('Select illuminance sensor');
            section.deviceSetting('lights').capability(['switch']).name('Select one or more lights to switch');
            section.numberSetting('upperThreshold').name('Enter lux amount above which lights turn off');
            section.numberSetting('lowerThreshold').name('Enter lux amount below which lights turn on');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lightSensor, 'illuminanceMeasurement', 'illuminance', 'illuminanceHandler')

    })

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        if (event.integerValue <= lowerThreshold && state.canSwitchOn) {
        state.canSwitchOn = false
        state.canSwitchOff = true
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        }
        if (event.integerValue >= upperThreshold && state.canSwitchOff) {
        state.canSwitchOn = true
        state.canSwitchOff = false
        
        context.api.devices.sendCommands(context.config.lights, 'switch', off)
    
        }
        

	})
