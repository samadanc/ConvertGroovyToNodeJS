
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When one of these persons arrives', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('And it\'s dark...', section => {
            section.deviceSetting('luminance').capability(['illuminanceMeasurement']).name('Where?');

        });


        page.section('Turn on these lights...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Where?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presenseHandler')

    })

    .subscribedEventHandler('presenseHandler', (context, event) => {
        
        if (event.value == 'present') {
        let lightSensorState = luminance.currentIlluminance
        console.log("SENSOR = $lightSensorState")
        if (lightSensorState && lightSensorState < 20) {
        log.trace("light.on() ... [luminance: $lightSensorState]")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        }
        }
        

	})
