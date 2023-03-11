
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('And it\'s dark...', section => {
            section.deviceSetting('luminance1').capability(['illuminanceMeasurement']).name('Where?');

        });


        page.section('Turn on a light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        let lightSensorState = luminance1.currentIlluminance
        console.log("SENSOR = $lightSensorState")
        if (lightSensorState != null && lightSensorState < 10) {
        log.trace("light.on() ... [luminance: $lightSensorState]")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        }
        

	})
