
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Bathroom Setup', section => {
            section.deviceSetting('doorContact').capability(['contactSensor']).name('Door Contact Sensor');
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Motion Detector');
            section.deviceSetting('mainLights').capability(['switch']).name('Light');
            section.numberSetting('timeout').name('Timeout in minutes if door left open');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doorContact, 'contactSensor', 'contact.open', 'openHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.doorContact, 'contactSensor', 'contact.closed', 'closedHandler')

    })

    .subscribedEventHandler('openHandler', (context, event) => {
        
        console.log("Open - state.out: ${state.out}")
        this.unsubscribe(motionSensor)
        this.subscribe(motionSensor, 'motion', openMotionHandler)
        
        context.api.devices.sendCommands(context.config.mainLights, 'switch', on)
    
        motionSensor.each({
        if (it.currentValue('motion') != 'active') {
        
        context.api.devices.sendCommands(context.config.timeout, 'number', runIn)
    
        }
        })
        if (state.out) {
        state.out = false
        } else {
        state.out = true
        }
        

	})

    .subscribedEventHandler('closedHandler', (context, event) => {
        
        console.log("Closed - state.out: ${state.out}")
        this.unsubscribe(motionSensor)
        this.unschedule()
        this.subscribe(motionSensor, 'motion.active', closedMotionHandler)
        if (state.out) {
        
        context.api.devices.sendCommands(context.config.mainLights, 'switch', off)
    
        }
        

	})
