
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this washing machine...', section => {
            section.deviceSetting('sensor1').capability(['accelerationSensor']).name('');

        });


        page.section('Has stopped for this number of minutes...', section => {

        });


        page.section('Turn on a switch ...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor1, 'accelerationSensor', 'acceleration', 'accelerationHandler')

    })

    .subscribedEventHandler('accelerationHandler', (context, event) => {
        
        log.trace("${event.name}: ${event.value}")
        if (event.value == 'active') {
        this.unschedule('turnOn')
        } else {
        if (event.value == 'inactive') {
        this.runIn(timePeriod * 60, turnOn)
        }
        }
        

	})
