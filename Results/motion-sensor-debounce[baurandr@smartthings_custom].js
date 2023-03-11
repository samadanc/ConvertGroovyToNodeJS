
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Motion Sensor Input to Debounce', section => {
            section.deviceSetting('motionIn').capability(['motionSensor']).name('Inputs');

        });


        page.section('Motion Sensor To Use as Output', section => {
            section.deviceSetting('motionOut').capability(['motionSensor']).name('Output');

        });


        page.section('Motion Inactive After How Many Seconds?', section => {
            section.numberSetting('seconds1').name('Seconds?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionIn, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.device} : ${event.name} : ${event.value}")
        if (event.value == 'active') {
        
        context.api.devices.sendCommands(context.config.motionOut, 'motionSensor', currentState)
    
        if (motionState.value == 'inactive') {
        
        context.api.devices.sendCommands(context.config.motionOut, 'motionSensor', active)
    
        }
        } else {
        if (event.value == 'inactive') {
        this.runIn(seconds1, scheduleCheck, ['overwrite': false])
        }
        }
        

	})
