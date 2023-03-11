
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Devices to Authorize', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches?');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('');
            section.deviceSetting('temperatureSensors').capability(['temperatureMeasurement']).name('');
            section.deviceSetting('batterySensors').capability(['battery']).name('');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensors, 'temperatureMeasurement', 'temperature', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensors, 'contactSensor', 'contact', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.batterySensors, 'battery', 'battery', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        let data = "${settings.username}:${settings.password}"
        let bytes = data.bytes
        Base64 coder = new Base64()
        let encodedData = coder.encode(bytes)
        String basicAuth = new String(encodedData)
        console.log("token $basicAuth")
        console.log("uri ${settings.uri}")
        let json_body = ['id': event.deviceId, 'value': event.value, 'type': event.name, 'name': event.displayName]
        let json_params = ['uri': "${settings.uri}/push", 'success': success , 'body': json_body , 'headers': ['Authorization': "Basic $basicAuth"]]
        try {
        this.httpPostJson(json_params)
        }
        catch (let e) {
        log.error("http post failed: $e")
        }
        

	})
