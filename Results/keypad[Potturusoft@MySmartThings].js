
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmStatusHandler')

    })

    .subscribedEventHandler('alarmStatusHandler', (context, event) => {
        
                this.debugger("Keypad manager caught alarm status change: ${event.value}")
                if (runDefaultAlarm && event.value == 'off') {
                    keypad?.setDisarmed()
                } else {
                    if (runDefaultAlarm && event.value == 'away') {
                        keypad?.setArmedAway()
                    } else {
                        if (runDefaultAlarm && event.value == 'stay') {
                            keypad?.setArmedStay()
                        }
                    }
                }
            

	})

    .subscribedEventHandler('codeEntryHandler', (context, event) => {
        
                this.debugger("Caught code entry event! ${event.value.value}")
                let codeEntered = (event.value as String)
                let data = (event.data as Integer)
                let currentarmMode = keypad.currentValue('armMode')
                let correctUser = parent.keypadMatchingUser(codeEntered)
                if (correctUser) {
                    atomicState.tries = 0
                    this.debugger('Correct PIN entered.')
                    this.armCommand(data, correctUser, codeEntered)
                } else {
                    this.debugger('Incorrect code!')
                    atomicState.tries = atomicState.tries + 1
                    if (atomicState.tries >= attemptTollerance ) {
                        keypad.sendInvalidKeycodeResponse()
                        atomicState.tries = 0
                    }
                }
            

	})
