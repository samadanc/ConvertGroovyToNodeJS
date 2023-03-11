
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When vibration is sensed...', section => {
            section.deviceSetting('accelerationSensor').capability(['accelerationSensor']).name('Which Sensor?');

        });


        page.section('Turn on switch...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensor, 'accelerationSensor', 'acceleration.active', 'accelerationActiveHandler')

    })

    .subscribedEventHandler('accelerationActiveHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        

	})
