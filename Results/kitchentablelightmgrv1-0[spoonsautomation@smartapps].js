
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'selectedOffScene', 'offSceneChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'selectedOnScene', 'onSceneChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'selectedDimScene', 'dimSceneChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'motionLightsEnabledState', 'motionLightsStateChangeHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
                let roomMode = atomicState.roomMode
                if (debugLvl) {
                    console.log("$roomName: MotionDetectedHandler ${event.name}: ${event.value}, roomMode: $roomMode")
                }
                switch ( roomMode ) {
                    default: 
                    if (event.value == 'active') {
                        log.info("$roomName: motionDetectedHandler default: calling scheduleCheck(), state.roomMode: ${state.roomMode}")
                        this.scheduleCheck()
                    }
                    break
                }
            

	})

    .subscribedEventHandler('offSceneChangeHandler', (context, event) => {
        
                log.info("$roomName: offSceneChangeHandler(), SceneManager changed OFF routine, new OffRoutine = [${event.value}]")
                atomicState.offRoutine = event.value
            

	})

    .subscribedEventHandler('overrideDimmerLevelHandler', (context, event) => {
        
                let currentDimmerLevel = theOverrideSwitch.currentValue('level')
                virtualRoomSwitch.setLevel(currentDimmerLevel)
                log.warn("$roomName: overrideDimmerLevelChanged newLevel: $currentDimmerLevel")
            

	})

    .subscribedEventHandler('altRoomMotionHandler', (context, event) => {
        
                let roomMode = atomicState.roomMode
                log.info("$roomName: AltRoomMotionHandler default: calling scheduleCheck(), state.roomMode: $roomMode")
                this.scheduleCheck()
            

	})

    .subscribedEventHandler('dimSceneChangeHandler', (context, event) => {
        
                log.info("$roomName: dimSceneChangeHandler(), SceneManager changed DIM routine, new DimRoutine = [${event.value}]")
                atomicState.dimRoutine = event.value
            

	})

    .subscribedEventHandler('switchHandler', (context, event) => {
        
                let currentSwitchValue = virtualRoomSwitch.currentState('switch')
                if (debugLvl) {
                    console.log("$roomName: switchHandler called (event: ${event.value}): ${currentSwitchValue.value}")
                }
            

	})

    .subscribedEventHandler('dimmerLevelHandler', (context, event) => {
        
                let currentDimmerLevel = virtualRoomSwitch.currentState('level')
                if (debugLvl) {
                    console.log("$roomName: dimmerLevelHandler called Level: ${currentDimmerLevel.value}")
                }
            

	})

    .subscribedEventHandler('onSceneChangeHandler', (context, event) => {
        
                atomicState.onRoutine = event.value
                log.info("$roomName: onSceneChangeHandler(), SceneManager changed ON routine, new OnRoutine = [${event.value}]")
                let roomMode = atomicState.roomMode
                if ('MODE_RUNNING_SCENE' == roomMode ) {
                    this.incrementRemainingOnSeconds()
                    this.doRunScene(true)
                }
            

	})

    .subscribedEventHandler('overrideButtonHandler', (context, event) => {
        
                if (atomicState.isRunning != null && atomicState.isRunning == true) {
                    if (debugLvl) {
                        console.log("$roomName: overrideButtonHandler called atomicState.isRunning !!!")
                    }
                    return null
                }
                atomicState.isRunning = ((true) as Boolean)
                try {
                    let currentSwitchValue = theOverrideSwitch.currentState('switch')
                    let eventDescription = event.descriptionText
                    let roomMode = atomicState.roomMode
                    if (debugLvl) {
                        console.log("$roomName: overrideButtonHandler called (event: ${event.value})")
                    }
                    if (eventDescription?.startsWith('Up/Double')) {
                        log.info("$roomName: Up/Double PRESSED with roomMode: $roomMode")
                        this.doRunScene(true)
                        this.doOnHold(overrideOnMinutes)
                        this.updateVirtualRoomTimeRemaining(overrideOnMinutes * 60)
                    } else {
                        if (eventDescription?.startsWith('Down/Double')) {
                            log.info("$roomName: Down/Double PRESSED with roomMode: $roomMode")
                            if ('MODE_OFF' == roomMode ) {
                                atomicState.holdOff1Minute = 0
                                this.doOffHold(overrideOffMinutes)
                                this.updateVirtualRoomTimeRemaining(overrideOffMinutes * 60)
                            }
                        } else {
                            if (eventDescription?.startsWith('On/Up')) {
                                atomicState.roomModeUpdatedTime = this.now()
                                this.incrementRemainingOnSeconds()
                                log.info("$roomName: On/Up PRESSED with roomMode: $roomMode")
                                if ('MODE_RUNNING_SCENE' == roomMode || 'MODE_ON_HOLD' == roomMode ) {
                                    this.incrementMonitorLevels()
                                    this.doRunScene(false)
                                } else {
                                    atomicState.sceneTimerIncrement = sceneTimerInitialIncrement 
                                    if (testMode) {
                                        atomicState.remainingOnSeconds = 40
                                        this.setNextScheduleCheck(40)
                                        this.updateVirtualRoomTimeRemaining(40)
                                    }
                                    this.doRunScene(true)
                                }
                            } else {
                                if (eventDescription?.startsWith('Off/Down')) {
                                    log.info("$roomName: Off/Down  PRESSED with roomMode: $roomMode")
                                    if ('MODE_OFF' != roomMode && 'MODE_OFF_HOLD' != roomMode ) {
                                        if (!(this.decrementMonitorLevels())) {
                                            atomicState.holdOff1Minute = 1
                                            this.doFadeToOff(true)
                                        }
                                    }
                                } else {
                                    log.warn("$roomName: overrideButtonHandler unknown description: $eventDescription Event: ${event.name}: ${event.value}")
                                }
                            }
                        }
                    }
                } 
                catch (let e) {
                    log.warn("caught exception in overrideButtonHandler: $e")
                } 
                atomicState.isRunning = false
            

	})

    .subscribedEventHandler('motionLightsStateChangeHandler', (context, event) => {
        
                let bMmotionLightsEnabled = event.value == 1 ? true : false
                let data = this.parseJson(event.data)
                if (debugLvl) {
                    console.log("$roomName: motionLightsStateChangeHandler evt value: ${event.value}")
                }
                if (debugLvl) {
                    console.log("$roomName: event data: $data")
                }
                if (debugLvl) {
                    console.log("$roomName: event motionLightsStartTime: ${data.motionLightsStartTime}")
                }
                if (debugLvl) {
                    console.log("$roomName: event motionLightsEndTime: ${data.motionLightsEndTime}")
                }
            

	})

    .subscribedEventHandler('MotionAdjacentHandler', (context, event) => {
        
                let roomMode = state.roomMode
                if (debugLvl) {
                    console.log("adjacentRoomMotionHandler ${event.name}: ${event.value}, roomMode: $roomMode")
                }
                if (event.value == 'active' && roomMode == 'MODE_OFF') {
                    log.info("$roomName: AdjacentRoomMotionHandler default: calling scheduleCheck(), roomMode: roomMode")
                    this.scheduleCheck()
                }
            

	})
