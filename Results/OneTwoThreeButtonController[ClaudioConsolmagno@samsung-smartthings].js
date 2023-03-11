
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Button(s) and Switches They Will Control', section => {
            section.deviceSetting('buttons').capability(['button']).name('Buttons(s)');
            section.deviceSetting('switchA').capability(['switch']).name('Single Click Switch (x1)');
            section.deviceSetting('switchB').capability(['switch']).name('Double Click Switch (x2)');
            section.deviceSetting('switchC').capability(['switch']).name('Triple Click Switch (x3)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.buttons, 'button', 'button.pushed', 'buttonsHandler')

    })

    .subscribedEventHandler('buttonsHandler', (context, event) => {
        
        let buttonPressed = event.jsonData.buttonNumber
        log.info("Button $buttonPressed pushed")
        
        context.api.devices.sendCommands(context.config.switchA, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.switchB, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.switchC, 'switch', currentValue)
    
        console.log("switchA status is $currentStateA")
        console.log("switchB status is $currentStateB")
        console.log("switchC status is $currentStateC")
        if (buttonPressed == 1) {
        
        context.api.devices.sendCommands(context.config.switchA, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.switchB, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.switchC, 'switch', off)
    
        } else {
        if (buttonPressed == 2) {
        
        context.api.devices.sendCommands(context.config.switchA, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.switchB, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.switchC, 'switch', off)
    
        } else {
        if (buttonPressed == 3) {
        
        context.api.devices.sendCommands(context.config.switchA, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.switchB, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.switchC, 'switch', off)
    
        } else {
        if (buttonPressed == 4) {
        
        context.api.devices.sendCommands(context.config.switchA, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.switchB, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.switchC, 'switch', off)
    
        } else {
        log.info('Unknown push action')
        }
        }
        }
        }
        

	})
