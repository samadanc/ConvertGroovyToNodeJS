
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('startWatering', delay);

    })

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
                console.log("Soil Moisture is ${event.value}%")
                if (event.numberValue < low ) {
                    this.startWatering()
                } else {
                    if (high && event.numberValue >= high && atomicState.run || atomicState.delayed || atomicState.paused) {
                        this.stopWatering()
                    }
                }
            

	})

    .scheduledEventHandler('startWatering', (context, event) => {
        
                if (atomicState.run || atomicState.delayed) {
                    return null
                }
                if (!enable) {
                    return null
                }
                java.lang.Integer hours = 48
                let yesterday = new Date(this.now() - 3600000 * hours .toLong())
                let lastHumDate = settings.sensor.latestState('humidity').date
                if (lastHumDate < yesterday ) {
                    this.note('warning', "${app.label}: Please check sensor ${settings.sensor}, no humidity reports for $hours+ hours", 'w')
                }
                if (sensor.currentHumidity > low ) {
                    return null
                }
                if (controller.currentSwitch != 'off' || controller.currentStatus == 'pause') {
                    console.log("watering delayed, ${controller.displayName} busy")
                    atomicState.delayed = true
                    this.subscribe(controller, 'switch.off', endDelay)
                    this.note('delayed', "${app.label}: Waiting for current schedule to complete", 'd')
                    return null
                }
                if (settings.sync) {
                    if (settings.sync.currentSwitch != 'off' || settings.sync.currentStatus == 'pause') {
                        console.log("watering sync delayed, ${sync.displayName} busy")
                        atomicState.delayed = true
                        this.subscribe(settings.sync, 'switch.off', syncOn)
                        this.note('delayed', "${app.label}: Waiting for ${settings.sync.displayName} to complete", 'd')
                        return null
                    }
                }
                atomicState.run = true
                if (this.isWaterPaused()) {
                    String pauseList = this.getWaterPauseList()
                    console.log("watering paused, $pauseList")
                    this.subWaterUnpause()
                    controller.programWait()
                    this.note('pause', "${app.label}: Watering paused, $pauseList", 'd')
                    return null
                }
                console.log('watering starting')
                controller.programOn()
                if (high) {
                    this.subscribe(sensor, 'humidity', humidityHandler)
                }
                this.subWaterPause()
                this.subscribe(controller, "switch$zone.z$zoneoff", zoneOffHandler)
                controller."z$zoneon"()
                atomicState.startTime = this.now()
                atomicState.pauseSecs = 0
                this.runIn(duration * 60, stopWatering)
                String s = ''
                if (duration > 1) {
                    s = 's'
                }
                this.note('active', "${app.label}: Zone $zone turned on for $duration min$s", 'e')
            

	})
