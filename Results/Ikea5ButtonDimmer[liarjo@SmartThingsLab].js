
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Controls configurations', section => {
            section.deviceSetting('theswitch').capability(['button']).name('Ikea 5 Buttons control');
            section.deviceSetting('Lights').capability(['switchLevel']).name('Lights to manage');
            section.numberSetting('step').name('Dimmer delta');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'button', 'button', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        let theDimmer = Lights[0]
        let previusLevel = theDimmer.currentLevel
        let currentLevel = theDimmer.currentLevel
        if (theDimmer.currentSwitch.contains('on')) {
        switch (event.jsonData.buttonNumber) {
        case '1':
        currentLevel = currentLevel + step
        if (currentLevel > 100) {
        currentLevel = 100
        }
        
        context.api.devices.sendCommands(context.config.Lights, 'switchLevel', setLevel)
    
        break
        case '3':
        currentLevel = currentLevel - step
        if (currentLevel < 0) {
        currentLevel = 0
        }
        
        context.api.devices.sendCommands(context.config.Lights, 'switchLevel', setLevel)
    
        break
        case '5':
        
        context.api.devices.sendCommands(context.config.Lights, 'switchLevel', off)
    
        break
        default:
        console.log("unknown {${event.jsonData.buttonNumber}}")
        }
        } else {
        switch (event.jsonData.buttonNumber) {
        case '1':
        break
        case '3':
        break
        case '5':
        
        context.api.devices.sendCommands(context.config.Lights, 'switchLevel', on)
    
        break
        default:
        console.log("unknown {${event.jsonData.buttonNumber}}")
        }
        }
        console.log("Devices $Lights | previus level $previusLevel | new level $currentLevel")
        

	})
