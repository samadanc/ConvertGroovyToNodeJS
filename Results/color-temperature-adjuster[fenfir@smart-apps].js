
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Settings', section => {
            section.numberSetting('outMin').name('Minimum color temperature in K');
            section.numberSetting('outMax').name('Maximum color temperature in K');
            section.numberSetting('levelBias').name('Bias [-100, 100] (positive is colder negative is warmer)');

        });


        page.section('Adjust this light', section => {
            section.deviceSetting('thelight').capability(['colorTemperature']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thelight, 'colorTemperature', 'level', 'brightnessChangedHandler')

    })

    .subscribedEventHandler('brightnessChangedHandler', (context, event) => {
        
        console.log("brightnessChangedHandler called: $evt")
        
        context.api.devices.sendCommands(context.config.thelight, 'colorTemperature', currentState)
    
        let colorTemp = this.mapLevelToColorTemp(level.value.toInteger(), 0, 100)
        console.log("Setting color temperature to $colorTemp")
        
        context.api.devices.sendCommands(context.config.thelight, 'colorTemperature', setColorTemperature)
    
        

	})
