
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('modeSwitcher').capability(['actuator']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.modeSwitcher, 'actuator', 'modeChange', 'deviceModeChanged')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'locationModeChanged')

    })

    .subscribedEventHandler('deviceModeChanged', (context, event) => {
        
        console.log("current system mode is ${location.mode}, device requests mode change to ${event.value}")
        if (location.mode != event.value) {
        this.setLocationMode(event.value)
        }
        

	})

    .subscribedEventHandler('locationModeChanged', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.modeSwitcher, 'actuator', currentValue)
    
        console.log("current device mode is $currentDeviceMode, system mode changed to ${event.value}")
        if (currentDeviceMode != event.value) {
        
        context.api.devices.sendCommands(context.config.modeSwitcher, 'actuator', locationModeChanged)
    
        }
        

	})
