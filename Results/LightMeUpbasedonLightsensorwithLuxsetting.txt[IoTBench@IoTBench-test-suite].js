
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the luminosity...', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('');

        });


        page.section('Turn on a light...', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('For how dark...', section => {
            section.numberSetting('lumins').name('Illuminance?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lightSensor, 'illuminanceMeasurement', 'illuminance', 'illuminanceHandler')

    })

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        let lastStatus = state.lastStatus
        if (lastStatus != 'on' && event.integerValue < lumins ) {
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        state.lastStatus = 'on'
        } else {
        if (lastStatus != 'off' && event.integerValue > lumins + 100) {
        
        context.api.devices.sendCommands(context.config.lights, 'switch', off)
    
        state.lastStatus = 'off'
        }
        }
        

	})
