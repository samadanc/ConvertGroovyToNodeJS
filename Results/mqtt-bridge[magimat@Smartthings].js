
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Input', section => {

        });


        page.section('Bridge', section => {
            section.deviceSetting('bridge').capability(['notification']).name('Notify this Bridge');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.bridge, 'notification', 'message', 'bridgeHandler')

        context.api.schedules.runEvery15Minutes('initialize', delay);

    })

    .subscribedEventHandler('bridgeHandler', (context, event) => {
        
        let json = new JsonSlurper
        
        context.api.devices.sendCommands(context.config., '', log)
    
        CAPABILITY_MAP.each({ let key, let capability ->
        if
        settings[ key ].each({ let device ->
        if (device.name == json.name) {
        if
        let action = capability['action']
        this."$action"(device, json.type, json.value)
        }
        }
        })
        }
        })
        

	})

    .scheduledEventHandler('initialize', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config., '', subscribe)
    
        
        context.api.devices.sendCommands(context.config., '', updateSubscription)
    
        

	})
