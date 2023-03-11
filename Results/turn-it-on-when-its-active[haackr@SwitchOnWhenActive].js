
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the sensor is active...', section => {
            section.deviceSetting('accelerationSensor').capability(['accelerationSensor']).name('Where?');

        });


        page.section('Turn on a light...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Turn it back off after (optional)...', section => {
            section.numberSetting('offDelay').name('Minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensor, 'accelerationSensor', 'acceleration.active', 'accelerationActiveHandler')

    })

    .subscribedEventHandler('accelerationActiveHandler', (context, event) => {
        
        console.log("${event.value}: $evt, $settings")
        log.trace("Turning on switches: $switches")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        if (offDelay) {
        this.runIn(offDelay * 60, 'turnSwitchesOff')
        }
        

	})
