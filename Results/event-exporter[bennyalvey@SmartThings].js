
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow access to these devices...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Which Motion Sensors?');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Which Contact Sensors?');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Which Presence Sensors?');
            section.deviceSetting('temperatureSensors').capability(['temperatureMeasurement']).name('Which Temperature Sensors?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensors, 'temperatureMeasurement', 'temperature', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensors, 'contactSensor', 'contact', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensors, 'presenceSensor', 'presence', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        this.httpPostJson(['uri': 'http://florian.org:4567/event', 'body': ['id': event.deviceId, 'name': event.name, 'value': event.value, 'date': event.dateString]], { let resp ->
        console.log(resp.status)
        })
        

	})
