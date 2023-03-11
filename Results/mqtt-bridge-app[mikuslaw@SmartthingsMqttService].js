
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Title'', section => {

        });


        page.section('Bridge', section => {
            section.deviceSetting('bridge').capability(['notification']).name('Bridge Device');
            section.deviceSetting('devices').capability(['notification']).name('Mqtt Devices');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.devices, 'notification', 'mqttrefreshsubscriptions', 'refreshSubscriptionsHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.devices, 'notification', 'mqttpoll', 'pollHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.bridge, 'notification', 'mqttpublish', 'publishHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.devices, 'notification', 'mqttnotifysubscriptions', 'notifySubscriptionsHandler')

    })

    .subscribedEventHandler('notifySubscriptionsHandler', (context, event) => {
        
        let json = new JsonSlurper().parseText(event.data)
        let subscriptions_map = state.subscriptions
        subscriptions_map.put(json.id, json.topics)
        state.subscriptions = subscriptions_map
        json.topics.each({
        
        context.api.devices.sendCommands(context.config.bridge, 'notification', subscribeToTopic)
    
        })
        console.log("State topic: ${state.subscriptions}")
        

	})

    .subscribedEventHandler('refreshSubscriptionsHandler', (context, event) => {
        
        this.runIn(1, refreshSubscriptions)
        

	})

    .subscribedEventHandler('pollHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.bridge, 'notification', poll)
    
        

	})

    .subscribedEventHandler('publishHandler', (context, event) => {
        
        let id = event.id
        if (event.name == 'mqttpublish') {
        this.notificationHandlerMqtt(evt)
        } else {
        console.log('Received device event other')
        }
        

	})
