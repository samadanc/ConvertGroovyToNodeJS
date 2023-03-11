
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Send Notifications?', section => {

        });


        page.section('Input', section => {
            section.deviceSetting('sensors').capability(['sensor']).name('Sensors');
            section.deviceSetting('actuators').capability(['actuator']).name('Actuators');

        });


        page.section('Bridge', section => {
            section.deviceSetting('bridge').capability(['notification']).name('Notify this Bridge');

        });


        page.section('Async?', section => {
            section.booleanSetting('async').name('Send device info asynchronously');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.bridge, 'notification', 'message', 'bridgeHandler')

        context.api.schedules.runIn('forwardDeviceByIds', delay);

    })

    .subscribedEventHandler('bridgeHandler', (context, event) => {
        
        let json = new JsonSlurper().parseText(event.value)
        console.log("Received device event from bridge: $json")
        

	})

    .scheduledEventHandler('forwardDeviceByIds', (context, event) => {
        
        console.log("forwardDeviceById called with $data")
        let deviceIdList = data.devices
        this.allDevices().each({ let device ->
        if (deviceIdList.contains(device.getId())) {
        this.forwardDevice(device)
        return null
        }
        })
        

	})
