
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Real Motion Sensor to Follow?', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Do Not Disturb Switch (MUST BE ON to disable)?', section => {
            section.deviceSetting('dndswitch').capability(['switch']).name('');

        });


        page.section('Virtual Motion Sensor to Trigger?', section => {
            section.deviceSetting('virtualmotion').capability(['motionSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.dndswitch, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        let dndswstate = dndswitch.currentSwitch
        let motionstate = motion1.currentMotion
        console.log("Current Do Not Disturb Switch State: $dndswstate")
        console.log("${event.name}: ${event.value}")
        if (dndswstate == 'off') {
        if (motionstate == 'active') {
        
        context.api.devices.sendCommands(context.config.virtualmotion, 'motionSensor', active)
    
        console.log('Changing State of Simulated Motion Sensor to active, DND switch is OFF')
        } else {
        if (motionstate == 'inactive') {
        
        context.api.devices.sendCommands(context.config.virtualmotion, 'motionSensor', inactive)
    
        console.log('Changing State of Simulated Motion Sensor to inactive, DND switch is OFF')
        }
        }
        } else {
        if (dndswstate == 'on') {
        console.log('No Change to Simulated Motion Sensor, DND switch is ON')
        }
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        let dndswstate = dndswitch.currentSwitch
        let motionstate = motion1.currentMotion
        console.log("Current Do Not Disturb Switch State: $dndswstate")
        console.log("${event.name}: ${event.value}")
        if (dndswstate == 'off') {
        if (motionstate == 'active') {
        
        context.api.devices.sendCommands(context.config.virtualmotion, 'motionSensor', active)
    
        console.log('Changing State of Simulated Motion Sensor to active, DND switch is OFF')
        } else {
        if (motionstate == 'inactive') {
        
        context.api.devices.sendCommands(context.config.virtualmotion, 'motionSensor', inactive)
    
        console.log('Changing State of Simulated Motion Sensor to inactive, DND switch is OFF')
        }
        }
        } else {
        if (dndswstate == 'on') {
        console.log('No Change to Simulated Motion Sensor, DND switch is ON')
        }
        }
        

	})
