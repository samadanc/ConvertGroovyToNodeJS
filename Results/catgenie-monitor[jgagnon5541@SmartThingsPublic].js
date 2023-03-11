
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Select an icon'', section => {

        });


        page.section('Tell me when this CatGenie is running...', section => {
            section.deviceSetting('sensor1').capability(['accelerationSensor']).name('Which CatGenie?');

        });


        page.section('And by turning on this fans', section => {
            section.deviceSetting('fan').capability(['switch']).name('Which Fan?');

        });


        page.section('Time thresholds (in minutes, optional)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor1, 'accelerationSensor', 'acceleration.active', 'accelerationActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensor1, 'accelerationSensor', 'acceleration.inactive', 'accelerationInactiveHandler')

    })

    .subscribedEventHandler('accelerationActiveHandler', (context, event) => {
        
        log.trace('Detected vibration from CatGenie')
        if (!state.isRunning) {
        log.info('Arming detector')
        state.isRunning = true
        state.startedAt = this.now()
        }
        

	})

    .subscribedEventHandler('accelerationInactiveHandler', (context, event) => {
        
        log.trace("no vibration, isRunning: ${state.isRunning}")
        if (state.isRunning) {
        console.log("startedAt: ${state.startedAt}, stoppedAt: ${state.stoppedAt}")
        if (!state.stoppedAt) {
        state.stoppedAt = this.now()
        let delay = Math.floor(startDelay * 60).toInteger()
        this.runIn(delay, checkRunning, ['overwrite': false])
        console.log("RunIn Delay: $delay")
        }
        let cycledelay = Math.floor(cycleTime * 60).toInteger()
        console.log("Turning off delay: $cycledelay")
        this.runIn(cycledelay, checkRunning, ['overwrite': false])
        }
        

	})
