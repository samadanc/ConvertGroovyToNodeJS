
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('virtualDoor').capability(['doorControl']).name('Garage Door?');

        });


        page.section('', section => {
            section.numberSetting('checkAfter').name('Delay (seconds) after which to check?');

        });


        page.section('Notifications', section => {

        });


        page.section('Logging', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.virtualDoor, 'doorControl', 'closedsensor', 'closedSensorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualDoor, 'doorControl', 'opensensor', 'openSensorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualDoor, 'doorControl', 'door', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualDoor, 'doorControl', 'notify', 'doorNotificationHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        this.logDebug("doorHandler(${event.value})")
        if (event.value == 'opening' || event.value == 'closing') {
        if (checkAfter) {
        this.runIn(checkAfter, checkStatus, ['data': ['doorActionAt': this.getFormattedTime(event.date)]])
        }
        }
        

	})

    .subscribedEventHandler('openSensorHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.virtualDoor, 'doorControl', currentValue)
    
        this.logDebug("openSensorHandler(${event.value}) door is $doorCurrentValue")
        if (event.value == 'closed' && doorCurrentValue != 'open') {
        
        context.api.devices.sendCommands(context.config.virtualDoor, 'doorControl', setDoorStatus)
    
        }
        if (event.value == 'open' && doorCurrentValue != 'closing') {
        this.notifyUsers('Garage door manually closed.')
        
        context.api.devices.sendCommands(context.config.virtualDoor, 'doorControl', setDoorStatus)
    
        }
        

	})

    .subscribedEventHandler('closedSensorHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.virtualDoor, 'doorControl', currentValue)
    
        this.logDebug("closedSensorHandler(${event.value}) door is $doorCurrentValue")
        if (event.value == 'open' && doorCurrentValue != 'opening') {
        this.notifyUsers('Garage door manually opened.')
        
        context.api.devices.sendCommands(context.config.virtualDoor, 'doorControl', setDoorStatus)
    
        }
        if (event.value == 'closed' && doorCurrentValue != 'closed') {
        
        context.api.devices.sendCommands(context.config.virtualDoor, 'doorControl', setDoorStatus)
    
        }
        

	})

    .subscribedEventHandler('doorNotificationHandler', (context, event) => {
        
        this.logDebug("doorNotificationHandler(${event.value})")
        this.notifyUsers(event.value)
        

	})
