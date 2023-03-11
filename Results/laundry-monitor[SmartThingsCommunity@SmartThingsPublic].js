
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


        page.section('And by turning on these lights (optional)', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which lights?');
            section.enumSetting('lightMode').name('Action?');

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
        if (!state.stoppedAt) {
        state.stoppedAt = this.now()
        let delay = Math.floor(fillTime * 60).toInteger()
        this.runIn(delay, checkRunning, ['overwrite': false])
        }
        }
        

	})
