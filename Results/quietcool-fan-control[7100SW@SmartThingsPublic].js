
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when temperature exceeds:', section => {
            section.deviceSetting('theMercury').capability(['temperatureMeasurement']).name('Sensor?');

        });


        page.section('Temperature threshold:', section => {
            section.numberSetting('threshold').name('Fahrenheit?');

        });


        page.section('Turn on this fan', section => {
            section.deviceSetting('theFanSwitch').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theMercury, 'temperatureMeasurement', 'temperature', 'temperatureChangeHandler')

    })

    .subscribedEventHandler('temperatureChangeHandler', (context, event) => {
        
        if (event.value > threshold ) {
        
        context.api.devices.sendCommands(context.config.theFanSwitch, 'switch', on)
    
        }
        

	})
