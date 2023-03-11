
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChecker')

    })

    .subscribedEventHandler('eventHandlerBinary', (context, event) => {
        
                if (parent.loggingOn) {
                    console.log("processed event ${event.name} from device ${event.displayName} with value ${event.value}")
                }
                if (allOk) {
                    log.info('Event occured within the desired timing conditions, sending commands')
                    this.processEvents(['name': "${event.displayName}", 'value': "${event.value}"])
                } else {
                    if (parent.loggingOn) {
                        console.log('event did not occur within the desired timing conditions, not triggering')
                    }
                }
            

	})

    .subscribedEventHandler('doorClosed', (context, event) => {
        
                state.lastClosed = this.now()
            

	})

    .subscribedEventHandler('knockAcceleration', (context, event) => {
        
                let delay = knockDelay ? knockDelay : 5
                this.runIn(delay, 'doorKnock')
            

	})

    .subscribedEventHandler('modeChecker', (context, event) => {
        
                if (event.name != 'mode') {
                    return null
                }
                let checkMode = event.value
                let triggerFromModeChange = false
                if (myMode != null) {
                    log.info('mode change detected, mode now: ' + checkMode )
                }
                if (allOk) {
                    myMode.each({ let eachOfMyMode ->
                        if (checkMode == eachOfMyMode ) {
                            triggerFromModeChange = true
                            if (parent.loggingOn) {
                                console.log("checkMode '$checkMode' is in eachOfMyMode: '$eachOfMyMode', triggering cameras after short delay")
                            }
                        }
                    })
                }
                if (triggerFromModeChange) {
                    let modeDelayTime = modeDelay ? modeDelay : 5
                    this.runIn(modeDelay, processEvents, ['data': ['name': 'Mode', 'value': "$checkMode"]])
                }
            

	})
