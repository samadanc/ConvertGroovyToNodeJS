
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these bulbs...', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Hue Bulbs?');

        });


        page.section('Choose light effects...', section => {
            section.enumSetting('color').name('Hue Color?');
            section.enumSetting('lightLevel').name('Light Level?');

        });


        page.section('Turning on when it\'s dark and there\'s movement...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Where?');

        });


        page.section('And then off when it\'s light or there\'s been no movement for...', section => {
            section.numberSetting('delayMinutes').name('Minutes?');

        });


        page.section('Using this light sensor...', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lightSensor, 'illuminanceMeasurement', 'illuminance', 'illuminanceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

        context.api.schedules.schedule('astroCheck', delay);

    })

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}, lastStatus: ${state.lastStatus}, motionStopTime: ${state.motionStopTime}")
        let lastStatus = state.lastStatus
        if (lastStatus != 'off' && event.integerValue > 50) {
        
        context.api.devices.sendCommands(context.config.hues, 'colorControl', off)
    
        state.lastStatus = 'off'
        } else {
        if (state.motionStopTime) {
        if (lastStatus != 'off') {
        let elapsed = this.now() - state.motionStopTime
        if (elapsed >= delayMinutes ? delayMinutes : 0 * 60000) {
        
        context.api.devices.sendCommands(context.config.hues, 'colorControl', off)
    
        state.lastStatus = 'off'
        }
        }
        } else {
        if (lastStatus != 'on' && event.value < 30) {
        this.takeAction(evt)
        state.lastStatus = 'on'
        }
        }
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'active') {
        if (this.enabled()) {
        console.log('turning on lights due to motion')
        this.takeAction(evt)
        state.lastStatus = 'on'
        }
        state.motionStopTime = null
        } else {
        state.motionStopTime = this.now()
        if (delayMinutes) {
        this.runIn(delayMinutes * 60, turnOffMotionAfterDelay, ['overwrite': false])
        } else {
        this.turnOffMotionAfterDelay()
        }
        }
        

	})
