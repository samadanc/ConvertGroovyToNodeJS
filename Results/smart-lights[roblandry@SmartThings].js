
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Info'', section => {

        });


        page.section('Devices', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Sensor');
            section.deviceSetting('lights').capability(['switch']).name('Lights to turn on');

        });


        page.section('Preferences', section => {
            section.booleanSetting('motionEnabled').name('Enable/Disable Motion Control.');
            section.numberSetting('delayMinutes').name('Minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lights, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("Switch Handler Start: ${event.name}: ${event.value}, State: $state")
        if (delayMinutes) {
        this.unschedule('turnOffMotionAfterDelay')
        }
        if (event.value == 'off') {
        state.motionProgramActive = false
        lights.each({
        if (state.thelights[it.id].motionCommand) {
        log.info("Turning $it off, using MOTION.")
        } else {
        log.info("Turning $it off, using SWITCH.")
        }
        state.thelights[it.id].initialValue.switch = it.currentValue('switch')
        state.thelights[it.id].motionCommand = false
        })
        } else {
        if (event.value == 'on') {
        lights.each({
        if (state.thelights[it.id].motionCommand) {
        log.info("Turning $it on, using MOTION.")
        } else {
        log.info("Turning $it on, using SWITCH.")
        }
        })
        }
        }
        lights.each({
        state.thelights[it.id].currentValue.switch = it.currentValue('switch')
        })
        console.log("Switch Handler End: ${event.name}: ${event.value}, State: $state")
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("Motion Enabled: $motionEnabled")
        console.log("Motion Handler - ${event.name}: ${event.value}, State: $state")
        if (!motionEnabled) {
        return null
        }
        if (event.value == 'active') {
        log.info('Motion Detected.')
        lights.each({
        if (state.thelights[it.id].currentValue.switch == 'off') {
        state.thelights[it.id].motionCommand = true
        it.on()
        }
        })
        } else {
        if (event.value == 'inactive') {
        log.info('Motion Ceased.')
        lights.each({
        if (state.thelights[it.id].currentValue.switch == 'on' && state.thelights[it.id].initialValue.switch == 'off' && state.thelights[it.id].motionCommand) {
        state.motionProgramActive = true
        }
        })
        if (state.motionProgramActive) {
        state.motionStopTime = this.now()
        if (delayMinutes) {
        this.unschedule('turnOffMotionAfterDelay')
        this.runIn(delayMinutes * 60, 'turnOffMotionAfterDelay', ['overwrite': false])
        } else {
        this.turnOffMotionAfterDelay()
        }
        }
        }
        }
        

	})
