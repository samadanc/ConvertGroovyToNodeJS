
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Real Motion Sensor to Follow?', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('');

        });


        page.section('Do Not Disturb Switch#1 (MUST BE ON to disable)?', section => {
            section.deviceSetting('dndswitch1').capability(['switch']).name('');

        });


        page.section('Do Not Disturb Switch#2 (MUST BE ON to disable)?', section => {
            section.deviceSetting('dndswitch2').capability(['switch']).name('');

        });


        page.section('Virtual Motion Sensor to Trigger?', section => {
            section.deviceSetting('virtualmotion').capability(['motionSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dndswitch2, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dndswitch1, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        let dndswstate1 = dndswitch1.currentSwitch
        let dndswstate2 = dndswitch2.currentSwitch
        let motionstate = motion1.currentMotion
        console.log("Current Do Not Disturb Switch State: $dndswstate1 and $dndswstate2")
        console.log("${event.name}: ${event.value}")
        if (dndswstate1 == 'off') {
        if (dndswstate2 == 'off') {
        if (motionstate == 'active') {
        
        context.api.devices.sendCommands(context.config.virtualmotion, 'motionSensor', active)
    
        console.log('Changing State of Simulated Motion Sensor to active, DND switch is OFF')
        } else {
        if (motionstate == 'inactive') {
        
        context.api.devices.sendCommands(context.config.virtualmotion, 'motionSensor', inactive)
    
        console.log('Changing State of Simulated Motion Sensor to inactive, DND switch is OFF')
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        let dndswstate1 = dndswitch1.currentSwitch
        let dndswstate2 = dndswitch2.currentSwitch
        let motionstate = motion1.currentMotion
        console.log("Current Do Not Disturb Switch State: $dndswstate1 and $dndswstate2")
        console.log("${event.name}: ${event.value}")
        if (dndswstate1 == 'off') {
        if (dndswstate2 == 'off') {
        if (motionstate == 'active') {
        
        context.api.devices.sendCommands(context.config.virtualmotion, 'motionSensor', active)
    
        console.log('Changing State of Simulated Motion Sensor to active, DND switch is OFF')
        } else {
        if (motionstate == 'inactive') {
        
        context.api.devices.sendCommands(context.config.virtualmotion, 'motionSensor', inactive)
    
        console.log('Changing State of Simulated Motion Sensor to inactive, DND switch is OFF')
        }
        }
        }
        }
        

	})
