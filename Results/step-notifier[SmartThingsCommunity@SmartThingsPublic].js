
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('stepHandler', (context, event) => {
        
        log.trace('Entering stepHandler()')
        console.log("Event Value ${event.value}")
        console.log("state.steps = ${state.steps}")
        console.log("state.goal = ${state.goal}")
        let steps = event.value.toInteger()
        state.lastSteps = state.steps
        state.steps = steps
        let stepGoal
        if (settings.thresholdType == 'Goal') {
        stepGoal = state.goal
        } else {
        stepGoal = settings.threshold
        }
        if (state.lastSteps < stepGoal && state.steps >= stepGoal ) {
        if (settings.notificationType != 'None') {
        if (location.contactBookEnabled) {
        this.sendNotificationToContacts(stepMessage, recipients)
        } else {
        let options = ['method': settings.notificationType.toLowerCase(), 'phone': settings.phone]
        this.sendNotification(stepMessage, options)
        }
        }
        if (settings.sonos) {
        this.sonosNotification()
        }
        if (settings.hues) {
        this.hueNotification()
        }
        if (settings.lights) {
        this.lightsNotification()
        }
        }
        log.trace('Exiting stepHandler()')
        

	})

    .subscribedEventHandler('goalHandler', (context, event) => {
        
        log.trace('Entering goalHandler()')
        let goal = event.value.toInteger()
        state.goal = goal
        log.trace('Exiting goalHandler()')
        

	})
