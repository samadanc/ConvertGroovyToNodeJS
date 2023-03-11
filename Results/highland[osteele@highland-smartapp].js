
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow Highland Home access to these things...', section => {
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Dimmers');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion sensors');
            section.deviceSetting('presences').capability(['presenceSensor']).name('Presence sensors');
            section.deviceSetting('switches').capability(['switch']).name('Switches');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'dimmer', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'position', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presences, 'presenceSensor', 'presence', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        let api_url = appSettings.api_url
        let api_secret = appSettings.api_secret
        if (!api_url || !api_secret) {
        return null
        }
        let device = event.device
        let body = ['secret': api_secret , 'date': event.isoDate, 'deviceId': event.deviceId, 'deviceName': device?.displayName, 'eventName': event.name, 'value': event.value, 'isStateChange': event.isStateChange]
        console.log("POST $api_url $body")
        this.httpPostJson(api_url, body, {
        console.log("POST $body response=$response")
        })
        

	})
