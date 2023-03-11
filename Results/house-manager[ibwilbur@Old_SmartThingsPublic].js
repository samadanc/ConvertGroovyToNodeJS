
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Raspberry Pi Setup', section => {
            section.textSetting('ip').name('IP Address');
            section.textSetting('port').name('Port');

        });


        page.section('Control things', section => {
            section.deviceSetting('lights').capability(['switch']).name('Lights');
            section.deviceSetting('doors').capability(['doorControl']).name('Doors');
            section.deviceSetting('music').capability(['musicPlayer']).name('Music Players');

        });


        page.section('View things', section => {
            section.deviceSetting('camera').capability(['imageCapture']).name('Cameras (Image Capture)');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Presence Sensors');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contact Sensors');
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('temperature').capability(['temperatureMeasurement']).name('Temperature');
            section.deviceSetting('humidity').capability(['relativeHumidityMeasurement']).name('Hygrometer');
            section.deviceSetting('battery').capability(['battery']).name('Battery Status');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.battery, 'battery', 'battery', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.music, 'musicPlayer', 'level', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.music, 'musicPlayer', 'mute', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.doors, 'doorControl', 'door', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperature, 'temperatureMeasurement', 'temperature', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.music, 'musicPlayer', 'trackData', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.humidity, 'relativeHumidityMeasurement', 'humidity', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lights, 'switch', 'switch.off', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.music, 'musicPlayer', 'trackDescription', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.camera, 'imageCapture', 'image', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.music, 'musicPlayer', 'status', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lights, 'switch', 'switch.on', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        console.log("Event from: ${e.displayName}, Value: ${e.value}, Source: ${e.source}, ID: ${e.deviceId}, Name: ${e.name}")
        let data = ['deviceid': e.deviceId, 'attribute': e.name, 'value': e.value]
        let headers = [:]
        let method = 'PUT'
        let value = e.value
        headers.put('HOST', "${settings.ip}:${settings.port}")
        headers.put('Content-Type', 'application/x-www-form-urlencoded')
        if (e.value.contains('refresh.')) {
        method = 'GET'
        data.value = 'refresh'
        }
        let hubAction = new physicalgraph.device.HubAction(['method': method , 'path': '/devices', 'headers': headers , 'body': data ])
        this.sendHubCommand(hubAction)
        

	})
