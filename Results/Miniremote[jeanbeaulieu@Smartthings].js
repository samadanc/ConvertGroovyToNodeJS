
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Dimmer for left buttons', section => {
            section.deviceSetting('LeftDimmer').capability(['switchLevel']).name('');

        });


        page.section('Select Dimmer for right buttons', section => {
            section.deviceSetting('RightDimmer').capability(['switchLevel']).name('');

        });


        page.section('Select Minimote', section => {
            section.deviceSetting('remote').capability(['button']).name('');

        });


        page.section('Initial level when light is turned on (0..100)', section => {
            section.numberSetting('OnLevel').name('Level');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.remote, 'button', 'button', 'buttonHandler')

    })

    .subscribedEventHandler('buttonHandler', (context, event) => {
        
        let pressedButtonNumber = (event.jsonData.buttonNumber as Integer)
        
        context.api.devices.sendCommands(context.config.RightDimmer, 'switchLevel', currentValue)
    
        
        context.api.devices.sendCommands(context.config.LeftDimmer, 'switchLevel', currentValue)
    
        
        context.api.devices.sendCommands(context.config.RightDimmer, 'switchLevel', currentValue)
    
        
        context.api.devices.sendCommands(context.config.LeftDimmer, 'switchLevel', currentValue)
    
        let NewLevel = 0
        console.log("button number :  $pressedButtonNumber")
        console.log("niveau : $RightLevel  Status : $RightOn")
        console.log("niveau : $LeftLevel  Status : $LeftOn")
        if (event.value == 'held') {
        if (pressedButtonNumber == 1 || pressedButtonNumber == 3) {
        
        context.api.devices.sendCommands(context.config.LeftDimmer, 'switchLevel', off)
    
        } else {
        
        context.api.devices.sendCommands(context.config.RightDimmer, 'switchLevel', off)
    
        }
        return null
        }
        if (pressedButtonNumber == 1) {
        if (LeftOn == 'off') {
        
        context.api.devices.sendCommands(context.config.LeftDimmer, 'switchLevel', setLevel)
    
        
        context.api.devices.sendCommands(context.config.LeftDimmer, 'switchLevel', on)
    
        console.log('was off')
        } else {
        NewLevel = LeftLevel + 20
        if (NewLevel > 100) {
        NewLevel = 100
        }
        
        context.api.devices.sendCommands(context.config.LeftDimmer, 'switchLevel', setLevel)
    
        console.log("New level : $NewLevel")
        }
        }
        if (pressedButtonNumber == 2) {
        if (RightOn == 'off') {
        
        context.api.devices.sendCommands(context.config.RightDimmer, 'switchLevel', setLevel)
    
        
        context.api.devices.sendCommands(context.config.RightDimmer, 'switchLevel', on)
    
        } else {
        NewLevel = RightLevel + 20
        if (NewLevel > 100) {
        NewLevel = 100
        }
        
        context.api.devices.sendCommands(context.config.RightDimmer, 'switchLevel', setLevel)
    
        console.log("New level : $NewLevel")
        }
        }
        if (pressedButtonNumber == 3) {
        if (LeftOn == 'off') {
        
        context.api.devices.sendCommands(context.config.LeftDimmer, 'switchLevel', setLevel)
    
        
        context.api.devices.sendCommands(context.config.LeftDimmer, 'switchLevel', on)
    
        } else {
        NewLevel = LeftLevel - 20
        if (NewLevel < 0) {
        NewLevel = 0
        }
        
        context.api.devices.sendCommands(context.config.LeftDimmer, 'switchLevel', setLevel)
    
        console.log("New level : $NewLevel")
        }
        }
        if (pressedButtonNumber == 4) {
        if (RightOn == 'off') {
        
        context.api.devices.sendCommands(context.config.RightDimmer, 'switchLevel', setLevel)
    
        
        context.api.devices.sendCommands(context.config.RightDimmer, 'switchLevel', on)
    
        } else {
        NewLevel = RightLevel - 20
        if (NewLevel < 0) {
        NewLevel = 0
        }
        
        context.api.devices.sendCommands(context.config.RightDimmer, 'switchLevel', setLevel)
    
        console.log("New level : $NewLevel")
        }
        }
        

	})
