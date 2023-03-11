
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('resetDailyShowerCounter', delay);

    })

    .subscribedEventHandler('liquidFlowRateHandler', (context, event) => {
        
                this.debug("${event.name} = ${event.value}")
                if (!enableAutoShutOffWhenLongShowerDetected) {
                    atomicState.showerStartedTime = 0
                    return null
                }
                if (event.value.toInteger() <= this.getMinumumWaterFlow() && atomicState.showerStartedTime > 0 && !atomicState.scheduledFlowRateStopped) {
                    this.runIn(this.getWaitSecondsBetweenShowers(), 'handleFlowRateStopped')
                    atomicState.scheduledFlowRateStopped = true
                } else {
                    if (atomicState.waterHeaterActive && event.value.toInteger() > this.getMinumumWaterFlow()) {
                        this.unschedule(handleFlowRateStopped)
                        atomicState.scheduledFlowRateStopped = false
                        this.handleFlowRateStarted()
                    }
                }
            

	})

    .subscribedEventHandler('heatingSetpointChangeHandler', (context, event) => {
        
                if (!(event.value.isNumber())) {
                    this.debug("[ERROR] Invalid Event Value: ${event.value}")
                    return null
                }
                let currSetPoint = new Float(event.value)
                this.debug("${event.name} = ${event.value}")
                if (this.getMinTemp() - 0.5 < currSetPoint && this.getMinTemp() + 0.5 > currSetPoint ) {
                    this.debug("Smart water heater is Inactive (${event.name} = ${event.value})")
                    atomicState.waterHeaterActive = false
                    atomicState.timeHeaterActiveStarted = this.now()
                    if (turnOnWhenWaterIsHot != null) {
                        turnOnWhenWaterIsHot.off()
                    }
                    this.fireToggleOff()
                } else {
                    if (this.getMaxTemp() - 0.5 < currSetPoint && this.getMaxTemp() + 0.5 > currSetPoint ) {
                        this.debug("Smart water heater is Active (${event.name} = ${event.value})")
                        atomicState.waterHeaterActive = true
                        atomicState.notificationStartedSent = false
                        atomicState.notificationEndedSent = false
                        this.fireToggleOn()
                    }
                }
                this.unschedule(updateStatusLight)
                this.schedule('0/2 * * * * ?', updateStatusLight)
            

	})

    .subscribedEventHandler('thermostatOperatingStateChangeHandler', (context, event) => {
        
                this.debug("${event.name} = ${event.value}")
                this.unschedule(setWaterHeaterOffAuto)
                if (event.value == 'heating') {
                    this.unschedule(checkWaterHeaterStarted)
                    this.updateWaterHeaterApproxTimes()
                    atomicState.timeHeatingStarted = this.now()
                    atomicState.isHeating = true
                    if (atomicState.waterHeaterActive && !atomicState.notificationStartedSent) {
                        this.sendNotifications(notifyWhenStart1Devices, notifyWhenStart1Modes, notifyWhenStart1Message)
                        atomicState.notificationStartedSent = true
                    }
                    this.debug("Started at ${new Date()}")
                } else {
                    atomicState.timeHeatingEnded = this.now()
                    atomicState.isHeating = false
                    this.onFinishedHeatingWater()
                    this.debug("Ended at ${new Date()}")
                }
                this.unschedule(updateStatusLight)
                this.schedule('0/2 * * * * ?', updateStatusLight)
            

	})

    .scheduledEventHandler('resetDailyShowerCounter', (context, event) => {
        
                this.debug('Reseting daily shower count')
                this.setDailyShowerCount(0)
                atomicState.showerStartedTime = 0
            

	})
