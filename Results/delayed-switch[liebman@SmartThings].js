
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'locationHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
                this.logit('info', "CURRENT: value: ${event.value} phys:${event.isPhysical()} change:${event.isStateChange()} date:${event.date} id:${event.id} app:${app.label}")
                let history = master.events(['max': 10])
                this.dumpEvents(history)
                if (history && history.size() > 1) {
                    let prev = history.get(0)
                    if (prev.id.equals(event.id)) {
                        this.logit('warn', 'first history event was the current one, using the one before that!')
                        prev = history.get(1)
                    }
                    this.logit('info', "PREVIOUS: value: ${prev.value} phys: ${prev.isPhysical()} change:${prev.isStateChange()} date:${prev.date} id:${prev.id}")
                    if (event.isPhysical() && !(event.isStateChange()) && !(action.equalsIgnoreCase(event.value)) && prev.isPhysical()) {
                        if (feedback) {
                            this.startFeedback(evt)
                        }
                        this.logit('info', "scheduling delayed $action in $delay seconds")
                        this.runIn(delay, delayedActionHandler)
                        this.logit('info', 'back from runIn()')
                    } else {
                        if (event.isPhysical() && event.isStateChange() && action.equalsIgnoreCase(event.value)) {
                            this.logit('info', 'unscheduling incase we were active!')
                            this.unschedule()
                        }
                    }
                }
            

	})

    .subscribedEventHandler('locationHandler', (context, event) => {
        
                this.logit('info', "location result: ${event.description}")
            

	})
