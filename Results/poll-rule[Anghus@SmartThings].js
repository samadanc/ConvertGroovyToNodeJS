
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('timerEvent', delay);

    })

    .subscribedEventHandler('triggerEvent', (context, event) => {
        
                this.trace("triggerEvent(${event.value})")
                if (targetDevice) {
                    targetDevice.poll()
                }
            

	})

    .scheduledEventHandler('timerEvent', (context, event) => {
        
                this.trace('timerEvent()')
                if (targetDevice) {
                    targetDevice.poll()
                }
            

	})
