
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Bridge', section => {
            section.textSetting('bridgeUri').name('Uri (https://host:port)');
            section.textSetting('bridgeAuth').name('Auth token');

        });


        page.section('Connect those devices', section => {
            section.deviceSetting('actuators').capability(['actuator']).name('Select actuators');
            section.deviceSetting('sensors').capability(['sensor']).name('Select sensors');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery1Hour('refresh', delay);

    })

    .scheduledEventHandler('refresh', (context, event) => {
        
        this.unsubscribe()
        this.getDevices().each({ let device ->
        device.supportedAttributes.each({ let attr ->
        this.subscribe(device, attr.name, forwardDeviceStatus)
        })
        this.initDeviceStatus(device)
        })
        this.subscribe(location, 'routineExecuted', forwardRoutine)
        console.log('Subscriptions refreshed!')
        

	})
