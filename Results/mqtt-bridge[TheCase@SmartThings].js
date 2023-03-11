
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Send Notifications?', section => {

        });


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

    .subscribedEventHandler('inputHandler', (context, event) => {
        
        let json = new JsonOutput
        
        context.api.devices.sendCommands(context.config., '', log)
    
        
        context.api.devices.sendCommands(context.config., '', deviceNotification)
    
        

	})

    .subscribedEventHandler('bridgeHandler', (context, event) => {
        
        let json = new JsonSlurper
        
        context.api.devices.sendCommands(context.config., '', log)
    
        if (json.type == 'notify') {
        if (json.name == 'Contacts') {
        
        context.api.devices.sendCommands(context.config., '', sendNotificationToContacts)
    
        } else {
        
        context.api.devices.sendCommands(context.config., '', sendNotificationEvent)
    
        }
        return null
        }
        CAPABILITY_MAP.each({ let key, let capability ->
        if
        settings[ key ].each({ let device ->
        if (device.displayName == json.name) {
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
        
        CAPABILITY_MAP.each({ let key, let capability ->
        capability['attributes'].each({ let attribute ->
        
        context.api.devices.sendCommands(context.config., '', subscribe)
    
        })
        })
        
        context.api.devices.sendCommands(context.config., '', subscribe)
    
        
        context.api.devices.sendCommands(context.config., '', updateSubscription)
    
        

	})
