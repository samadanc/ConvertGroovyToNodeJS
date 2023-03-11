
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
                    let processName = ''
                    if (usePreset && !disableRecording) {
                        processName = ' Moving and Triggering '
                    } else {
                        if (usePreset && disableRecording ) {
                            processName = ' Moving '
                        } else {
                            if (!usePreset && disableRecording ) {
                                processName = ' Doing Nothing to '
                            } else {
                                if (!usePreset && !disableRecording) {
                                    processName = ' Triggering '
                                }
                            }
                        }
                    }
                    if (parent.loggingOn) {
                        console.log("processName is $processName")
                    }
                    if (parent.localOnly || parent.usingBIServer) {
                        if (usingCameraDTH) {
                            if (!receiveAlerts) {
                                this.sendNotificationEvent("${event.displayName} is ${event.value}, BI Fusion is" + processName + "Cameras: $biCamerasSelected")
                            }
                            if (receiveAlerts) {
                                parent.send("${event.displayName} is ${event.value}, BI Fusion is" + processName + "Cameras: $biCamerasSelected")
                            }
                        } else {
                            if (!receiveAlerts) {
                                this.sendNotificationEvent("${event.displayName} is ${event.value}, BI Fusion is" + processName + "Camera: $biCamera")
                            }
                            if (receiveAlerts) {
                                parent.send("${event.displayName} is ${event.value}, BI Fusion is" + processName + "Camera: $biCamera")
                            }
                        }
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
