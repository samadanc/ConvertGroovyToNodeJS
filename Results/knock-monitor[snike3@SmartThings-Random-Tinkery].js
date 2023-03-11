
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor vibration here:', section => {
            section.deviceSetting('sensor1').capability(['accelerationSensor']).name('Sensor?');

        });


        page.section('Monitor the status of this door:', section => {
            section.deviceSetting('door').capability(['contactSensor']).name('Open/Close Sensor?');
            section.deviceSetting('lock').capability(['lock']).name('Lock? (Optional)');

        });


        page.section('Notifications', section => {
            section.booleanSetting('toPush').name('Send push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor1, 'accelerationSensor', 'acceleration.active', 'accelerationActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensor1, 'accelerationSensor', 'acceleration.inactive', 'accelerationInactiveHandler')

    })

    .subscribedEventHandler('accelerationActiveHandler', (context, event) => {
        
        log.trace('vibration')
        if (!state.isRunning) {
        let proceed = true
        if (lock) {
        
        context.api.devices.sendCommands(context.config.lock, 'lock', eventsSince)
    
        if (lockChanges) {
        if (lockChanges.find(it.value == 'lock')) {
        console.log('Door was locked, ignoring vibration')
        proceed = false
        } else {
        if (lockChanges.find(it.value == 'unlock')) {
        console.log('Door was unlocked, ignoring vibration')
        proceed = false
        }
        }
        }
        }
        if (proceed) {
        log.info('Arming detector')
        state.isRunning = true
        state.startedAt = this.now()
        }
        }
        state.stoppedAt = null
        

	})

    .subscribedEventHandler('accelerationInactiveHandler', (context, event) => {
        
        log.trace("no vibration, isRunning: ${state.isRunning}")
        if (state.isRunning) {
        console.log("startedAt: ${state.startedAt}, stoppedAt: ${state.stoppedAt}")
        if (!state.stoppedAt) {
        state.stoppedAt = this.now()
        let duration = state.stoppedAt - state.startedAt
        console.log("threshold: $threshold duration: $duration")
        if (duration >= threshold ) {
        let runDelay = Math.floor(openDelay * 1000 - duration - threshold / 1000).toInteger()
        console.log("checkRunning in $runDelay")
        this.runIn(runDelay, checkRunning, ['overwrite': false])
        } else {
        console.log('Not sending notification because insufficient amount of vibration was detected')
        this.disarm()
        }
        }
        }
        

	})
