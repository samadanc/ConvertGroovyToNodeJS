
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'allHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'allHandler')

    })

    .subscribedEventHandler('allHandler', (context, event) => {
        
                log.info("${app.label}: ${event.displayName} ${event.name} ${event.value}")
                let doit = true
                if (event.name in ['temperature', 'humidity', 'power', 'energy', 'battery', 'illuminance', 'mode', 'presence', 'button', 'routineExecuted']) {
                    doit = this.testEvt(evt)
                }
                if (doit) {
                    this.doTrigger(false)
                }
            

	})

    .subscribedEventHandler('physicalHandler', (context, event) => {
        
                log.info("${app.label}: Physical ${event.displayName} ${event.name} ${event.value}")
                if (event.isPhysical()) {
                    this.doTrigger(false)
                }
            

	})

    .subscribedEventHandler('disabledHandler', (context, event) => {
        
                state.disabled = event.value == 'on'
            

	})
