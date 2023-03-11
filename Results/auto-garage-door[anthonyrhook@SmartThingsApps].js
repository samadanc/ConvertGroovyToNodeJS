
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which sensor is this tied to?', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Presence sensors');

        });


        page.section('Which garage door is theirs?', section => {
            section.deviceSetting('garageDoor').capability(['garageDoorControl']).name('Which garage door to open?');

        });


        page.section('Close the garage door when an interior door opens?', section => {
            section.deviceSetting('houseDoor').capability(['contactSensor']).name('Interior door');

        });


        page.section('Send Notifications?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.houseDoor, 'contactSensor', 'contact.open', 'garageCloserHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'garageToggleHandler')

    })

    .subscribedEventHandler('garageToggleHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.garageDoor, 'garageDoorControl', currentValue)
    
        console.log("garageToggleHandler called: $evt")
        console.log(currentState)
        if ('present' == event.value && currentState == 'closed') {
        console.log("Welcome home, opening $garageDoor.")
        
        context.api.devices.sendCommands(context.config.garageDoor, 'garageDoorControl', open)
    
        } else {
        if ('not present' == event.value && currentState == 'open') {
        console.log("Bon voyage, closing $garageDoor.")
        
        context.api.devices.sendCommands(context.config.garageDoor, 'garageDoorControl', close)
    
        let now = new Date()
        let runTime = new Date(now.getTime() + 15 * 1000)
        this.runOnce(runTime, checkDoor)
        } else {
        console.log('I didn\'t make any changes.')
        }
        }
        

	})

    .subscribedEventHandler('garageCloserHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.garageDoor, 'garageDoorControl', currentValue)
    
        console.log("garageCloserHandler called: $evt")
        if ('open' == event.value && currentState == 'open') {
        console.log("Welcome home, closing $garageDoor")
        
        context.api.devices.sendCommands(context.config.garageDoor, 'garageDoorControl', close)
    
        let now = new Date()
        let runTime = new Date(now.getTime() + 15 * 1000)
        this.runOnce(runTime, checkDoor)
        } else {
        console.log('I didn\'t make any changes.')
        }
        

	})
