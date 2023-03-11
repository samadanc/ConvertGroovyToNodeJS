
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the Garage Controller', section => {

        });


        page.section('Select Door Tiles', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theGarage, 'device.garagedoor', 'rightDoor', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theGarage, 'device.garagedoor', 'leftDoor', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.leftDoorTile, 'device.garageDoorTile', 'switch', 'leftDoorButtonHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.rightDoorTile, 'device.garageDoorTile', 'switch', 'rightDoorButtonHandler')

    })

    .subscribedEventHandler('rightDoorButtonHandler', (context, event) => {
        
        console.log(event.value)
        if (event.value == 'opening' || event.value == 'closing') {
        
        context.api.devices.sendCommands(context.config.theGarage, 'device.garagedoor', pushRight)
    
        }
        

	})

    .subscribedEventHandler('leftDoorButtonHandler', (context, event) => {
        
        console.log(event.value)
        if (event.value == 'opening' || event.value == 'closing') {
        
        context.api.devices.sendCommands(context.config.theGarage, 'device.garagedoor', pushLeft)
    
        }
        

	})

    .subscribedEventHandler('evtHandler', (context, event) => {
        
        if (event.name == 'leftDoor') {
        this.unschedule(checkLeft)
        if (event.value == 'open') {
        
        context.api.devices.sendCommands(context.config.leftDoorTile, 'device.garageDoorTile', contactOpen)
    
        }
        if (event.value == 'closed') {
        
        context.api.devices.sendCommands(context.config.leftDoorTile, 'device.garageDoorTile', contactClose)
    
        }
        } else {
        if (event.name == 'rightDoor') {
        this.unschedule(checkRight)
        if (event.value == 'open') {
        
        context.api.devices.sendCommands(context.config.rightDoorTile, 'device.garageDoorTile', contactOpen)
    
        }
        if (event.value == 'closed') {
        
        context.api.devices.sendCommands(context.config.rightDoorTile, 'device.garageDoorTile', contactClose)
    
        }
        } else {
        log.warn('This is weird - don\'t know how I got here')
        }
        }
        

	})
