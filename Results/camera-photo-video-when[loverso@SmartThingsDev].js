
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduledTimeHandler', delay);

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                console.log("Event Handler: ${event.name}: ${event.value}, State: $state")
                this.getTriggerState(evt)
                if (recipients && state.trigger) {
                    this.sendMessage(evt)
                }
                if (photoOrVideo == 'photo' && state.trigger) {
                    this.cameraTake()
                } else {
                    if (photoOrVideo == 'video') {
                        if (state.trigger) {
                            this.startRecording(evt)
                        } else {
                            this.stopRecording(evt)
                        }
                    }
                }
            

	})

    .scheduledEventHandler('scheduledTimeHandler', (context, event) => {
        
                log.trace('scheduledTimeHandler()')
                this.eventHandler(null)
            

	})
