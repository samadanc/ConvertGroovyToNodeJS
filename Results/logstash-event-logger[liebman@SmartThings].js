
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log these Sensors', section => {
            section.deviceSetting('sensors').capability(['sensor']).name('');

        });


        page.section('Log these Actuators', section => {
            section.deviceSetting('actuators').capability(['actuator']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'position', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        if (logger) {
        logger.log(evt)
        }
        

	})
