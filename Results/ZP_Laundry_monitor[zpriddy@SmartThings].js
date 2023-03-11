
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Washer / Dryer Virtual Device', section => {
            section.deviceSetting('washerdryer').capability(['accelerationSensor']).name('Washer / Dryer Virtual Device');

        });


        page.section('Dryer Sensor', section => {
            section.deviceSetting('dryer').capability(['accelerationSensor']).name('');

        });


        page.section('Washer Sensor', section => {
            section.deviceSetting('washer').capability(['accelerationSensor']).name('');

        });


        page.section('Washer Door', section => {
            section.deviceSetting('washerDoor').capability(['contactSensor']).name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Time thresholds (in minutes, optional)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.washerDoor, 'contactSensor', 'contact', 'contactHandeler')

        await context.api.subscriptions.subscribeToDevices(context.config.dryer, 'accelerationSensor', 'acceleration', 'dryerHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.washer, 'accelerationSensor', 'acceleration', 'washerHandler')

    })

    .subscribedEventHandler('contactHandeler', (context, event) => {
        
        if (event.value == 'open') {
        log.trace('Washer Door Opened')
        
        context.api.devices.sendCommands(context.config.washerdryer, 'accelerationSensor', washer_open)
    
        state.washerIsRunning = false
        state.washerNotification = false
        state.dryerNotification = false
        this.unschedule('sendNotification')
        }
        

	})

    .subscribedEventHandler('dryerHandler', (context, event) => {
        
        if (event.value == 'active') {
        if (state.dryerIsRunning == false) {
        log.trace('Starting Dryer')
        state.dryerIsRunning = true
        state.dryerStartedAt = this.now()
        
        context.api.devices.sendCommands(context.config.washerdryer, 'accelerationSensor', dryer_start)
    
        } else {
        this.unschedule('dryerCheckFinished')
        log.trace('Dryer still active')
        }
        } else {
        log.trace('Dryer inactive.. Checking in 2 minutes.')
        this.runIn(60 * 2, dryerCheckFinished, ['overwrite': true])
        }
        

	})

    .subscribedEventHandler('washerHandler', (context, event) => {
        
        if (event.value == 'active') {
        if (state.washerIsRunning == false) {
        log.trace('Starting Washer')
        state.washerIsRunning = true
        state.washerStartedAt = this.now()
        
        context.api.devices.sendCommands(context.config.washerdryer, 'accelerationSensor', washer_start)
    
        } else {
        this.unschedule('washerCheckFinished')
        log.trace('Washer still active')
        }
        } else {
        log.trace('Washer inactive.. Checking in after filltime delay.')
        this.runIn(60 * fillTime , washerCheckFinished, ['overwrite': true])
        }
        

	})
