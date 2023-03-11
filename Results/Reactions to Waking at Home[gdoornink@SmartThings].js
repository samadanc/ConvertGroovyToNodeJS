
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Home/Sleeping Indicators', section => {
            section.deviceSetting('homeIndicator').capability(['presenceSensor']).name('Presence indicator');
            section.deviceSetting('awakeIndicator').capability(['switch']).name('Switch indicating Awake');
            section.deviceSetting('sleepinIndicator').capability(['switch']).name('Sleep In Switch (on = sleeping in)');

        });


        page.section('If sleeping in', section => {
            section.deviceSetting('sleepinOnSwitches').capability(['switch']).name('Turn ON');
            section.deviceSetting('sleepinOffSwitches').capability(['switch']).name('Turn OFF');

        });


        page.section('If NOT sleeping in', section => {
            section.deviceSetting('normalOnSwitches').capability(['switch']).name('Turn ON');
            section.deviceSetting('normalOffSwitches').capability(['switch']).name('Turn OFF');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.awakeIndicator, 'switch', 'switch.on', 'awakeHandler')

    })

    .subscribedEventHandler('awakeHandler', (context, event) => {
        
        if
        if
        
        context.api.devices.sendCommands(context.config.sleepinOnSwitches, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.sleepinOffSwitches, 'switch', off)
    
        console.log('Greg woke up after sleeping in.')
        } else {
        
        context.api.devices.sendCommands(context.config.normalOnSwitches, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.normalOffSwitches, 'switch', off)
    
        console.log('Greg woke up after not sleeping in.')
        }
        
        context.api.devices.sendCommands(context.config.sleepinIndicator, 'switch', off)
    
        console.log('Turned sleep in indicator off.')
        } else {
        console.log('Person is away.')
        }
        

	})
