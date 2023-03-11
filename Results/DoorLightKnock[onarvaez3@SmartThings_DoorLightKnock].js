
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this sensor detects vibration...', section => {
            section.deviceSetting('sensor1').capability(['accelerationSensor']).name('');

        });


        page.section('Turn on these lights...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which lights?');
            section.enumSetting('lightMode').name('Action?');

        });


        page.section('And turn off lights after (in minutes, optional)', section => {

        });


        page.section('Notify via SMS?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor1, 'accelerationSensor', 'acceleration.active', 'accelerationActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensor1, 'accelerationSensor', 'acceleration.inactive', 'accelerationInactiveHandler')

    })

    .subscribedEventHandler('accelerationActiveHandler', (context, event) => {
        
        if (location.currentMode == 'Away' || location.currentMode == 'Night') {
        log.trace('Vibration detected')
        if (!state.isEventOngoing || this.now() - state.startedAt > 60000) {
        log.info('New event')
        state.isEventOngoing = true
        state.startedAt = this.now()
        if (location.currentMode == 'Away') {
        this.sendNotification()
        }
        this.turnOnLights()
        }
        state.stoppedAt = null
        } else {
        log.trace('Vibration detected but incorrect Mode')
        }
        

	})

    .subscribedEventHandler('accelerationInactiveHandler', (context, event) => {
        
        log.trace("no vibration, isEventOngoing: ${state.isEventOngoing}")
        

	})
