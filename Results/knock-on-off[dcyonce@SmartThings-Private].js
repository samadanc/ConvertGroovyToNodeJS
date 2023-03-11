
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Knock Sensor?', section => {
            section.deviceSetting('knockSensor').capability(['accelerationSensor']).name('MultiSensor?');

        });


        page.section('Lamps to control?', section => {
            section.deviceSetting('lamp').capability(['switch']).name('Select one or more lights');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.knockSensor, 'accelerationSensor', 'acceleration.active', 'knockEvent')

    })

    .subscribedEventHandler('knockEvent', (context, event) => {
        
        console.log("event.value=${event.value}")
        let isOn = lamp.currentswitch.contains('on') == true
        console.log("lamp=${lamp.currentswitch}, $isOn")
        if (event.value == 'active') {
        if (isOn) {
        
        context.api.devices.sendCommands(context.config.lamp, 'switch', off)
    
        } else {
        
        context.api.devices.sendCommands(context.config.lamp, 'switch', on)
    
        }
        }
        

	})
