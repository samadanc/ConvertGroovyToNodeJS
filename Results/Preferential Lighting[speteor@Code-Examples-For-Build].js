
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pick your sensors', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Which Motion Sensors');
            section.deviceSetting('openSensor').capability(['contactSensor']).name('Which Open/Close Sensors');
            section.enumSetting('priority').name('If you picked both sensors, which one do you want to come first? (Enter Motion or Contact)');

        });


        page.section('Turn on these lights...', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('Turn them off after...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.openSensor, 'contactSensor', 'contact.open', 'justContactOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.openSensor, 'contactSensor', 'contact.closed', 'contactFirstClosedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.active', 'justMotionActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.openSensor, 'contactSensor', 'contact.closed', 'justContactClosedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.active', 'motionFirstActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.inactive', 'motionFirstInactiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.openSensor, 'contactSensor', 'contact.open', 'contactFirstOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.inactive', 'justMotionInactiveHandler')

    })

    .subscribedEventHandler('justContactClosedHandler', (context, event) => {
        
        console.log('There is only one sensor set: Contact Sensor.  It was closed.  Light countdown begins now.')
        this.calcThreshLightsOff()
        

	})

    .subscribedEventHandler('justMotionInactiveHandler', (context, event) => {
        
        console.log('There is only one sensor set: Motion Sensor.  It has not detected motion recently.  Light countdown begins now.')
        let motionValue = motionSensor.find({
        it.currentMotion == 'active'
        })
        if (!motionValue) {
        this.calcThreshLightsOff()
        }
        

	})

    .subscribedEventHandler('motionFirstInactiveHandler', (context, event) => {
        
        console.log('Motion is no longer being detected.  Open/close should no longer have any effect.')
        this.unsubscribe(contactSecondOpenHandler)
        this.unsubscribe(contactSecondClosedHandler)
        

	})

    .subscribedEventHandler('justMotionActiveHandler', (context, event) => {
        
        console.log('There is only one sensor set: Motion Sensor.  It has detected motion.  Lights going on.')
        this.unschedule(lightsOff)
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        

	})

    .subscribedEventHandler('motionFirstActiveHandler', (context, event) => {
        
        console.log('Motion was detected...moving on to open/close criteria.')
        this.subscribe(openSensor, 'contact.open', contactSecondOpenHandler)
        this.subscribe(openSensor, 'contact.closed', contactSecondClosedHandler)
        

	})

    .subscribedEventHandler('justContactOpenHandler', (context, event) => {
        
        console.log('There is only one sensor set: Contact Sensor.  It was opened.  Lights going on.')
        this.unschedule(lightsOff)
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        

	})

    .subscribedEventHandler('contactFirstClosedHandler', (context, event) => {
        
        console.log('Door was closed.  Motion should no longer have any effect.')
        this.unsubscribe(motionSecondActiveHandler)
        this.unsubscribe(motionSecondInactiveHandler)
        

	})

    .subscribedEventHandler('contactFirstOpenHandler', (context, event) => {
        
        console.log('Door was opened...moving on to motion criteria.')
        this.subscribe(motionSensor, 'motion.active', motionSecondActiveHandler)
        this.subscribe(motionSensor, 'motion.inactive', motionSecondInactiveHandler)
        

	})
