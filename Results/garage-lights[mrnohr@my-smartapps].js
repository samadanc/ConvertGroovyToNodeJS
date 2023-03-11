
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sensors', section => {
            section.deviceSetting('garageDoors').capability(['contactSensor']).name('Garage Door');
            section.deviceSetting('door1').capability(['contactSensor']).name('Interior Door');
            section.deviceSetting('motion1').capability(['motionSensor']).name('Motion Sensor');

        });


        page.section('Lights', section => {
            section.deviceSetting('lights').capability(['switch']).name('Lights');

        });


        page.section('Delays', section => {
            section.numberSetting('doorDelay').name('Turn off after door close delay (minutes)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.door1, 'contactSensor', 'contact', 'interiorDoorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.garageDoors, 'contactSensor', 'contact', 'garageDoorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('interiorDoorHandler', (context, event) => {
        
        let closed = event.value == 'closed'
        
        context.api.devices.sendCommands(context.config.motion1, 'motionSensor', latestValue)
    
        console.log("Interior Door Event: ${event.value} - motion=$motion, closed=$closed")
        if (motion || !closed) {
        this.lightsShouldBeOn()
        } else {
        this.runIn(60 * doorDelay , 'doorScheduleHandler')
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.door1, 'contactSensor', latestValue)
    
        let motion = event.value == 'active'
        console.log("Motion event: ${event.value} - motion=$motion, closed=$closed")
        if (motion || !closed) {
        this.lightsShouldBeOn()
        } else {
        this.lightsShouldBeOff()
        }
        

	})

    .subscribedEventHandler('garageDoorHandler', (context, event) => {
        
        console.log("Garage door event: ${event.value}")
        if (event.value == 'open' || event.value == 'opening') {
        this.lightsShouldBeOn()
        } else {
        this.runIn(60 * doorDelay , 'doorScheduleHandler')
        }
        

	})
