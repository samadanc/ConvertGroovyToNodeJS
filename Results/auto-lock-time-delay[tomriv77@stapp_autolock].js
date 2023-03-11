
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runOnce('checkCurrentDeviceStates', delay);

    })

    .scheduledEventHandler('checkCurrentDeviceStates', (context, event) => {
        
                log.trace("checkCurrentDeviceStates() door status is ${contactSensor.currentState(contact).value}/${lock.currentState(lock).value}")
                if (contactSensor.currentState('contact').value == 'open') {
                    this.scheduleDoorOpenTooLong(openThresholdInMin)
                    console.log('checkCurrentDeviceStates() scheduled doorOpenTooLong')
                } else {
                    if (contactSensor.currentState('contact').value == 'closed') {
                        this.scheduleDoorUnlockedTooLong(closedThresholdInMin)
                        console.log('checkCurrentDeviceStates() scheduled doorUnlockedTooLong')
                    }
                }
            

	})
