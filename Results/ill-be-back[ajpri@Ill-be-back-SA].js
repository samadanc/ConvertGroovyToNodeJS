
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Trigger to Arm the motion Sensor', section => {
            section.deviceSetting('trigger').capability(['switch']).name('');

        });


        page.section('Select Lights...', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('What motion sensor will turn back on lights?', section => {
            section.deviceSetting('motionTrigger').capability(['motionSensor']).name('');

        });


        page.section('Delay before arming', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.trigger, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionTrigger, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("${event.value}")
        if (event.value == 'on') {
        this.saveState()
        
        context.api.devices.sendCommands(context.config.lights, 'switch', off)
    
        this.runIn(30, setArmed)
        } else {
        if (event.value == 'off') {
        state.sysArmed = false
        }
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'active') {
        if (state.sysArmed == true) {
        console.log('turning on lights')
        
        context.api.devices.sendCommands(context.config.trigger, 'switch', off)
    
        this.restoreState()
        state.sysArmed = false
        }
        } else {
        if (event.value == 'inactive') {
        }
        }
        

	})
