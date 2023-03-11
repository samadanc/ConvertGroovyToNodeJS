
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('checkMachineState', delay);

    })

    .subscribedEventHandler('powerInputHandler', (context, event) => {
        
                console.log("powerInputHandler - Power Input Handler Value Changed to ${selectedWasherOrDryer.currentValue(power)}")
                this.checkMachineState()
            

	})

    .subscribedEventHandler('resetNotificationHandler', (context, event) => {
        
                console.log('resetNotificationHandler - Device triggered to reset needsToBeEmptied state')
                console.log("resetNotificationHandler - start atomicState: $atomicState")
                if (atomicState.machineState.equals('needsToBeEmptied')) {
                    atomicState.machineState = 'notRunning'
                    atomicState.timeEmptiedAt = this.now()
                }
                console.log("resetNotificationHandler - end atomicState: $atomicState")
            

	})

    .scheduledEventHandler('checkMachineState', (context, event) => {
        
                let latestPower = selectedWasherOrDryer.currentValue('power')
                console.log("checkMachineState - Power: $latestPowerW, minimumWattage: $minimumWattage")
                console.log("checkMachineState - Start atomicState: $atomicState")
                if (atomicState.machineState.equals('notRunning') || atomicState.machineState.equals('needsToBeEmptied') && latestPower > minimumWattage ) {
                    log.info('checkMachineState - Cycle started.')
                    atomicState.machineState = 'Running'
                    atomicState.timeStartedAt = this.now()
                    atomicState.timeStoppedAt = null
                    atomicState.timeEmptiedAt = null
                    if (sendStartMessage) {
                        log.trace('checkMachineState - Calling Cycle Start Notifications')
                        this.sendNotifications(startMessage)
                    }
                } else {
                    if (atomicState.machineState.equals('Running') && latestPower < minimumWattage ) {
                        log.info('checkMachineState - Mid Cycle Check')
                        atomicState.machineState = 'midCycleCheck'
                        atomicState.midCycleTime = this.now()
                        console.log("checkMachineState - runIn: minimumOffTime: $minimumOffTime, checkMachineState")
                        this.runIn(minimumOffTime, 'checkMachineState')
                    } else {
                        if (atomicState.machineState.equals('midCycleCheck') && latestPower > minimumWattage ) {
                            log.info('checkMachineState - Resetting Mid Cycle Check.')
                            atomicState.machineState = 'Running'
                            atomicState.midCycleTime = null
                        } else {
                            if (atomicState.machineState.equals('midCycleCheck') && latestPower < minimumWattage ) {
                                log.info('checkMachineState - Machine Needs To Be Emptied.')
                                atomicState.machineState = 'needsToBeEmptied'
                                atomicState.timeStoppedAt = this.now()
                                console.log("checkMachineState - Cycle complete startedAt: ${atomicState.timeStartedAt}, stoppedAt: ${atomicState.timeStoppedAt}")
                                let validModeForNotifications = modesRepeatNotifications?.find({ 
                                    it == location.mode.trim()
                                })
                                if (sendCompleteMessage && validModeForNotifications != null && this.anythingSet()) {
                                    console.log("checkMachineState - Checking Empty State - Not Running and Not Empty - Send Notifications because correct mode, call sendNotification with message: $completionMessage")
                                    this.sendNotifications(completionMessage)
                                }
                                console.log("checkMachineState - Recheck Empty State later to see if emptied runIn: repeatNotificationsTime: $repeatNotificationsTime, checkEmptyState")
                                this.runIn(repeatNotificationsTime, 'checkMachineState')
                            } else {
                                if (atomicState.machineState.equals('needsToBeEmptied')) {
                                    console.log('Still needs to be emptied, notify again...')
                                    let validModeForNotifications = modesRepeatNotifications?.find({ 
                                        it == location.mode.trim()
                                    })
                                    if (sendCompleteMessage && validModeForNotifications != null && this.anythingSet()) {
                                        console.log("checkMachineState - Checking Empty State - Not Running and Not Empty - Send Notifications because correct mode, call sendNotification with message: $completionMessage")
                                        this.sendNotifications(completionMessage)
                                    }
                                    console.log("checkMachineState - Recheck Empty State later to see if emptied runIn: repeatNotificationsTime: $repeatNotificationsTime, checkEmptyState")
                                    this.runIn(repeatNotificationsTime, 'checkMachineState')
                                }
                            }
                        }
                    }
                }
                console.log("checkMachineState - End atomicState: $atomicState")
            

	})
