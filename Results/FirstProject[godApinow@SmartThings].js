
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Button', section => {
            section.deviceSetting('button').capability(['button']).name('Button Pushed');

        });


        page.section('GarageDoor', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact Opens');
            section.deviceSetting('mySwitch').capability(['switch']).name('Switch Turned On');

        });


        page.section('Send this message', section => {
            section.textSetting('messageText').name('Message Text');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Notify me via Push Notification');

        });


        page.section('Minimum time between messages (optional, defaults to every message)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.button, 'button', 'button.pushed', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.mySwitch, 'switch', currentState)
    
        console.log("garage state $garage")
        let stingOn = 'on'
        let stringOff = 'off'
        if (frequency) {
        let lastTime = state[event.deviceId]
        if (lastTime == null || this.now() - lastTime >= frequency * 60000) {
        console.log('inside if statement')
        if (stringOff.equalsIgnoreCase(garage)) {
        console.log('same')
        let messageString = "Opening Garage Door Battery %$batteryAttr"
        messageString = messageString.replace('[', '')
        messageString = messageString.replace(']', '')
        this.sendMessage(messageString.toString())
        console.log('opening garage door')
        
        context.api.devices.sendCommands(context.config.mySwitch, 'switch', on)
    
        return null
        } else {
        console.log('not same')
        console.log('inside myswitch current Value')
        let messageString = "Closing Garage Door Battery %$batteryAttr"
        messageString = messageString.replace('[', '')
        messageString = messageString.replace(']', '')
        this.sendMessage(messageString.toString())
        console.log('closing garage door')
        
        context.api.devices.sendCommands(context.config.mySwitch, 'switch', off)
    
        return null
        }
        }
        } else {
        
        context.api.devices.sendCommands(context.config.button, 'button', currentState)
    
        console.log("battery $batteryAttr")
        console.log('inside if else statment')
        console.log("garage state in else statment is $garage")
        if (stringOff.equalsIgnoreCase(garage)) {
        console.log('same')
        let messageString = "Opening Garage Door Battery %$batteryAttr"
        messageString = messageString.replace('[', '')
        messageString = messageString.replace(']', '')
        this.sendMessage(messageString.toString())
        console.log('opening garage door')
        
        context.api.devices.sendCommands(context.config.mySwitch, 'switch', on)
    
        return null
        } else {
        console.log('not same')
        console.log('inside myswitch current Value')
        let messageString = "Closing Garage Door Battery %$batteryAttr"
        messageString = messageString.replace('[', '')
        messageString = messageString.replace(']', '')
        this.sendMessage(messageString.toString())
        console.log('closing garage door')
        
        context.api.devices.sendCommands(context.config.mySwitch, 'switch', off)
    
        return null
        }
        }
        

	})
