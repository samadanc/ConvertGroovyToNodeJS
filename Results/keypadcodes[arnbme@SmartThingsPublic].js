
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Keypads to monitor', section => {

        });


        page.section('Living Room Light', section => {
            section.deviceSetting('theLRlight').capability(['switch']).name('Living Room Light?');

        });


        page.section('Front Door Light', section => {
            section.deviceSetting('theFDlight').capability(['switch']).name('Front Door Light?');

        });


        page.section('Garage Door', section => {
            section.deviceSetting('theGarageDoor').capability(['garageDoorControl']).name('Garage Door?');

        });


        page.section('LanNouncer TTS Device for Exit Delay talk', section => {
            section.deviceSetting('theTTS').capability(['speechSynthesis']).name('LanNouncer/DLNA?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thekeypad, 'device.CentraliteKeypad', 'codeEntered', 'buttonHandler')

    })

    .subscribedEventHandler('buttonHandler', (context, event) => {
        
        let thePin = ((event.value.substring(0, 4)) as String)
        let theMode = event.value.substring(5, 6)
        console.log("buttonHandler $evt value: ${event.value} data: ${event.data} thePin:$thePin theMode:$theMode")
        let alarm = location.currentState('alarmSystemStatus')
        let alarmstatus = alarm?.value
        if (thePin == '0000') {
        
        context.api.devices.sendCommands(context.config.theLRlight, 'switch', currentState)
    
        if (status == 'on') {
        
        context.api.devices.sendCommands(context.config.theLRlight, 'switch', off)
    
        } else {
        
        context.api.devices.sendCommands(context.config.theLRlight, 'switch', on)
    
        }
        } else {
        if (thePin == '1111') {
        
        context.api.devices.sendCommands(context.config.theFDlight, 'switch', currentState)
    
        if (status == 'on') {
        
        context.api.devices.sendCommands(context.config.theFDlight, 'switch', off)
    
        } else {
        
        context.api.devices.sendCommands(context.config.theFDlight, 'switch', on)
    
        }
        } else {
        if (thePin == '3333' && alarmstatus == 'off') {
        
        context.api.devices.sendCommands(context.config.theGarageDoor, 'garageDoorControl', open)
    
        this.GarageOpenTalk()
        } else {
        if (thePin == '4444') {
        
        context.api.devices.sendCommands(context.config.theGarageDoor, 'garageDoorControl', close)
    
        this.GarageCloseTalk()
        }
        }
        }
        }
        

	})
