
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('eventHandlerBinary', (context, event) => {
        
                if (parent.loggingOn) {
                    console.log("processed event ${event.name} from device ${event.displayName} with value ${event.value} and data ${event.data}")
                }
                if (allOk) {
                    log.info('Event occured within the desired timing conditions, sending commands')
                    let actionName = ''
                    if (usePreset && !disableRecording) {
                        actionName = ' Moving and Triggering '
                    } else {
                        if (usePreset && disableRecording ) {
                            actionName = ' Moving '
                        } else {
                            if (!usePreset && disableRecording ) {
                                actionName = ' Doing nothing to '
                            } else {
                                if (!usePreset && !disableRecording) {
                                    actionname = ' Triggering '
                                }
                            }
                        }
                    }
                    if (usingCameraDTH) {
                        if (!receiveAlerts) {
                            this.sendNotificationEvent("${event.displayName} is ${event.value}, BI Fusion is" + actionName + "Cameras: $biCamerasSelected")
                        }
                        if (receiveAlerts) {
                            parent.send("${event.displayName} is ${event.value}, BI Fusion is" + actionName + "Cameras: $biCamerasSelected")
                        }
                    } else {
                        if (!receiveAlerts) {
                            this.sendNotificationEvent("${event.displayName} is ${event.value}, BI Fusion is" + actionName + "Camera: $biCamera")
                        }
                        if (receiveAlerts) {
                            parent.send("${event.displayName} is ${event.value}, BI Fusion is" + actionName + "Camera: $biCamera")
                        }
                    }
                    if (parent.localOnly || parent.usingBIServer) {
                        this.localAction()
                    } else {
                        this.externalAction()
                    }
                } else {
                    if (parent.loggingOn) {
                        console.log('event did not occur within the desired timing conditions, not triggering')
                    }
                }
            

	})
