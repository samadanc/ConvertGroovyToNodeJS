
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which sensor can tell if the door is closed?', section => {
            section.deviceSetting('closedSensor').capability(['contactSensor']).name('Garage Door Closed Sensor');

        });


        page.section('Which sensor can tell if the door is open?', section => {
            section.deviceSetting('openSensor').capability(['contactSensor']).name('Garage Door Open Sensor');

        });


        page.section('Which virtual garage door to use?', section => {
            section.deviceSetting('virtualDoor').capability(['doorControl']).name('Virtual Garage Door');

        });


        page.section('Check if door opened/closed correctly?', section => {
            section.numberSetting('checkAfter').name('Operation Check Delay?');

        });


        page.section('Notifications', section => {

        });


        page.section('Logging', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.openSensor, 'contactSensor', 'contact', 'openSensorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualDoor, 'doorControl', 'door', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualDoor, 'doorControl', 'message', 'doorHandlerMessage')

        await context.api.subscriptions.subscribeToDevices(context.config.closedSensor, 'contactSensor', 'contact', 'closedSensorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        this.logDebug("doorHandler(${event.value})")
        if (event.value == 'opening' || event.value == 'closing') {
        if (checkAfter) {
        this.runIn(checkAfter, checkStatus, ['data': ['doorActionAt': this.getFormattedTime(event.date)]])
        }
        }
        

	})

    .subscribedEventHandler('doorHandlerMessage', (context, event) => {
        
        this.logDebug("doorHandlerMessage(${event.value})")
        this.notifyUsers(event.value)
        

	})

    .subscribedEventHandler('openSensorHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.virtualDoor, 'doorControl', currentValue)
    
        this.logDebug("openSensorHandler(${event.value}) door is $doorCurrentValue")
        if (event.value == 'closed' && doorCurrentValue != 'open') {
        
        context.api.devices.sendCommands(context.config.virtualDoor, 'doorControl', updateState)
    
        }
        if (event.value == 'open' && doorCurrentValue != 'closing') {
        this.notifyUsers('Garage door manually closed.')
        
        context.api.devices.sendCommands(context.config.virtualDoor, 'doorControl', updateState)
    
        }
        

	})

    .subscribedEventHandler('closedSensorHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.virtualDoor, 'doorControl', currentValue)
    
        this.logDebug("closedSensorHandler(${event.value}) door is $doorCurrentValue")
        if (event.value == 'open' && doorCurrentValue != 'opening') {
        this.notifyUsers('Garage door manually opened.')
        
        context.api.devices.sendCommands(context.config.virtualDoor, 'doorControl', updateState)
    
        }
        if (event.value == 'closed' && doorCurrentValue != 'closed') {
        
        context.api.devices.sendCommands(context.config.virtualDoor, 'doorControl', updateState)
    
        }
        

	})
