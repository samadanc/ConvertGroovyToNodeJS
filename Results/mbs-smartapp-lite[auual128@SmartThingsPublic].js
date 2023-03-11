
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

        context.api.schedules.runEvery30Minutes('initialize', delay);

    })

    .subscribedEventHandler('inputHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config., '', log)
    
        if (state.ignoreEvent && state.ignoreEvent.name == event.displayName && state.ignoreEvent.type == event.name && state.ignoreEvent.value == event.value) {
        
        context.api.devices.sendCommands(context.config., '', log)
    
        state.ignoreEvent = false
        } else {
        if
        
        context.api.devices.sendCommands(context.config., '', log)
    
        return null
        } else {
        let json = new JsonOutput
        
        context.api.devices.sendCommands(context.config., '', log)
    
        
        context.api.devices.sendCommands(context.config., '', deviceNotification)
    
        }
        }
        

	})

    .subscribedEventHandler('bridgeHandler', (context, event) => {
        
        let json = new JsonSlurper
        
        context.api.devices.sendCommands(context.config., '', parseJson)
    
        
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
        if (json.command == false) {
        if
        it.name == 'setStatus'
        })) {
        
        context.api.devices.sendCommands(context.config., '', log)
    
        
        context.api.devices.sendCommands(context.config., '', setStatus)
    
        state.ignoreEvent = json
        return null
        }
        } else {
        if
        if
        if
        
        context.api.devices.sendCommands(context.config., '', log)
    
        return null
        }
        }
        let action = capability['action']
        if (action instanceof String) {
        
        context.api.devices.sendCommands(context.config., '', log)
    
        data == null ? this."$action"(device, json.type, json.value) : this."$action"(device, json.type, json.value, data)
        } else {
        if
        action = action[json.type]
        
        context.api.devices.sendCommands(context.config., '', log)
    
        data == null ? this."$action"(device, json.type, json.value) : this."$action"(device, json.type, json.value, data)
        }
        }
        return null
        }
        }
        }
        })
        } else {
        settings[ key ].each({ let device ->
        if (device.displayName == json.name && json.type != null && json.value != null) {
        if
        if
        
        context.api.devices.sendCommands(context.config., '', log)
    
        return null
        }
        }
        let command = json.type
        if
        it.name == command
        })) {
        
        context.api.devices.sendCommands(context.config., '', log)
    
        device."$command"(json.value)
        return null
        }
        }
        })
        }
        })
        

	})

    .scheduledEventHandler('initialize', (context, event) => {
        
        state.events = [:]
        CAPABILITY_MAP.each({ let key, let capability ->
        capability['attributes'].each({ let attribute ->
        if (settings[ key ] != null) {
        
        context.api.devices.sendCommands(context.config., '', subscribe)
    
        
        context.api.devices.sendCommands(context.config., '', log)
    
        settings[ key ].each({ let device ->
        state.events[device.displayName] = [:]
        state.events[device.displayName][ attribute ] = null
        })
        }
        })
        })
        
        context.api.devices.sendCommands(context.config., '', subscribe)
    
        
        context.api.devices.sendCommands(context.config., '', updateSubscription)
    
        

	})
