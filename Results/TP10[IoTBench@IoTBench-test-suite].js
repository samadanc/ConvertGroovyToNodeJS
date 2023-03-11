
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these lights...', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('Turning on when a contact opens and there\'s movement...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Where?');
            section.deviceSetting('contactSensor').capability(['contactSensor']).name('Which?');

        });


        page.section('And then off when it\'s light or there\'s been no movement for...', section => {
            section.numberSetting('delayMinutes').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'open') {
        console.log('turning on lights due to motion')
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        state.lastStatus = 'on'
        state.motionStopTime = null
        } else {
        state.motionStopTime = this.now()
        if (delayMinutes) {
        this.runIn(delayMinutes * 60, turnOffMotionAfterDelay)
        } else {
        this.turnOffMotionAfterDelay()
        }
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'active') {
        console.log('turning on lights due to motion')
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        state.lastStatus = 'on'
        state.motionStopTime = null
        } else {
        state.motionStopTime = this.now()
        if (delayMinutes) {
        this.runIn(delayMinutes * 60, turnOffMotionAfterDelay)
        } else {
        this.turnOffMotionAfterDelay()
        }
        }
        

	})
