
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('First Input Switch', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');
            section.enumSetting('switch1state').name('State to Match');

        });


        page.section('Second Input Switch', section => {
            section.deviceSetting('switch2').capability(['switch']).name('');
            section.enumSetting('switch2state').name('State to Match');

        });


        page.section('Output Switch and Matching State', section => {
            section.deviceSetting('switchOut').capability(['switch']).name('');
            section.enumSetting('switchOutState').name('State When Matching');
            section.enumSetting('switch2Reset').name('Reset when unmatched?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("${event.device} is ${event.value}")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', currentValue)
    
        console.log("Matching $switch1state to $sw1cur")
        console.log("Matching $switch2state to $sw2cur")
        if
        console.log('Switch match.')
        if (switchOutState == 'On') {
        console.log('SwitchOut On')
        
        context.api.devices.sendCommands(context.config.switchOut, 'switch', on)
    
        } else {
        if (switch2Reset == 'Yes') {
        console.log('SwitchOut Off')
        
        context.api.devices.sendCommands(context.config.switchOut, 'switch', off)
    
        }
        }
        } else {
        if (switch2Reset == 'Yes') {
        console.log('Switch No-Match')
        if (switchOutState == 'On') {
        console.log('SwitchOut Off')
        
        context.api.devices.sendCommands(context.config.switchOut, 'switch', off)
    
        } else {
        console.log('SwitchOut On')
        
        context.api.devices.sendCommands(context.config.switchOut, 'switch', on)
    
        }
        }
        }
        

	})
