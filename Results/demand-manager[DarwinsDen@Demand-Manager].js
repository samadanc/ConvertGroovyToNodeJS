
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('setSchedules', delay);

        context.api.schedules.runIn('initialize', delay);

    })

    .scheduledEventHandler('setSchedules', (context, event) => {
        
                this.logger('Setting schedules', 'debug')
                atomicState.lastThrottleRunTime = this.now()
                this.runEvery1Minute(throttleEvents)
                this.runEvery5Minutes(processWatchDog)
                this.runEvery1Hour(processWatchDog)
                this.runEvery1Hour(confirmDisplayIndications)
                this.subscribeDevices()
                this.schedulePrecooling()
                this.schedulePeakTimes()
                this.schedule(new Date(), versionCheck)
            

	})

    .scheduledEventHandler('initialize', (context, event) => {
        
                this.logger('initializing Demand Manager', 'debug')
                if (this.getChildDevice(this.dashboardDeviceId()) == null) {
                    console.log('adding virtual active peak period switch')
                    let child = this.addChildDevice('darwinsden', 'Demand Manager Dashboard', this.dashboardDeviceId(), null, ['name': 'dashboardDevice', 'label': 'Demand Manager Device', 'completedSetup': true])
                    let dashboardDevice = this.getChildDevice(this.dashboardDeviceId())
                    if (dashboardDevice) {
                        dashboardDevice.off()
                    }
                }
                if (installVirtualDemandMeters?.toBoolean()) {
                    this.addChildPowerMeter('demandPeakCurrent', 'Demand-Current')
                    this.addChildPowerMeter('demandPeakProjected', 'Demand-Projected')
                    this.addChildPowerMeter('demandPeakToday', 'Demand-Peak Today')
                    this.addChildPowerMeter('demandPeakMonth', 'Demand-Peak This Month')
                }
                let dashboardDevice = this.getChildDevice(this.dashboardDeviceId())
                if (dashboardDevice) {
                    dashboardDevice.setGoalDemand(this.goalDemandW())
                    dashboardDevice.setMode(this.mode())
                    dashboardDevice.setCycleMinutes(this.cycleTimeMinutes())
                }
                this.unsubscribe()
                this.unschedule()
                this.runIn(1, setSchedules)
            

	})
