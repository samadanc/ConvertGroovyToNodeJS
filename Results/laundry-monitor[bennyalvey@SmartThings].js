
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Tell me when this washer/dryer has stopped...', section => {
            section.deviceSetting('sensor1').capability(['accelerationSensor']).name('');

        });


        page.section('Via this number (optional, sends push notification if not specified)', section => {

        });


        page.section('And by turning on this light (optional)', section => {
            section.deviceSetting('switches').capability(['switch']).name('');
            section.enumSetting('lightMode').name('');

        });


        page.section('Time thresholds (in minutes, optional)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor1, 'accelerationSensor', 'acceleration.active', 'accelerationActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensor1, 'accelerationSensor', 'acceleration.inactive', 'accelerationInactiveHandler')

    })

    .subscribedEventHandler('accelerationActiveHandler', (context, event) => {
        
        log.trace('vibration')
        if (!state.isRunning) {
        log.info('Arming detector')
        state.isRunning = true
        state.startedAt = this.now()
        }
        state.stoppedAt = null
        

	})

    .subscribedEventHandler('accelerationInactiveHandler', (context, event) => {
        
        log.trace("no vibration, isRunning: ${state.isRunning}")
        if (state.isRunning) {
        console.log("startedAt: ${state.startedAt}, stoppedAt: ${state.stoppedAt}")
        if (state.stoppedAt) {
        let fillTimeMsec = fillTime ? fillTime * 60000 : 300000
        let remaining = fillTimeMsec - this.now() - state.stoppedAt
        if (remaining <= 0) {
        let cycleTimeMsec = cycleTime ? cycleTime * 60000 : 600000
        let duration = this.now() - state.startedAt
        if (duration - fillTimeMsec > cycleTimeMsec ) {
        console.log('Sending notification')
        let msg = "${event.linkText} is finished"
        log.info(msg)
        if (phone) {
        this.sendSms(phone, msg)
        } else {
        this.sendPush(msg)
        }
        if (switches) {
        if (lightMode?.equals('Turn On Lights')) {
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        } else {
        this.flashLights()
        }
        }
        } else {
        console.log("Not sending notification because duration of $duration msec wasn't long enough")
        }
        state.isRunning = false
        log.info('Disarming detector')
        } else {
        console.log("$remaining msec to go before sending message")
        }
        } else {
        state.stoppedAt = this.now()
        }
        }
        

	})
