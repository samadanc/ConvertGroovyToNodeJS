
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Family Members', section => {
            section.deviceSetting('familySensors').capability(['presenceSensor']).name('Who\');

        });


        page.section('Threshold', section => {
            section.textSetting('timeThreshold').name('Default is $defaultThreshold.');

        });


        page.section('Smart departure alerts', section => {
            section.booleanSetting('smartDepartureFeature').name('Smart departure alerts?');

        });


        page.section('Silent mode', section => {
            section.booleanSetting('silentMode').name('Silence all notifications?');

        });


        page.section('Verbose logging', section => {
            section.booleanSetting('logToNotifications').name('Log to notifications?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.familySensors, 'presenceSensor', 'presence', 'presenceHandler')

        context.api.schedules.schedule('reset', delay);

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        let person = event.displayName
        if (settings.silentMode) {
        this.logit("Ignoring presence handler.  Silent mode is ${settings.silentMode}.")
        return null
        }
        if (this.inProgress() == false) {
        this.startMonitor()
        state.baseCase = event.value
        this.logit("First person sensed ($person).  Checking for others to be ${event.value} in $threshold seconds")
        this.runIn(threshold, isFamilyTogether, ['overwrite': false])
        } else {
        this.logit("Presence Event: $person is ${event.value}")
        }
        if (!(state.changedThisTime.contains(person))) {
        state.changedThisTime.push(person)
        } else {
        state.changedThisTime = state.changedThisTime - person
        this.logit("Ignoring flapping presence event for $person")
        }
        

	})

    .scheduledEventHandler('reset', (context, event) => {
        
        if (this.inProgress()) {
        this.logit('Skipping re-calibration, execution in progress!')
        return null
        }
        this.logit('Re-calibrating.')
        state.baseCase = null
        state.changedThisTime = []
        this.wasApart()
        

	})
