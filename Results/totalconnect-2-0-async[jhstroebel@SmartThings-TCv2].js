
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleChecker', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmHandler')

    })

    .subscribedEventHandler('alarmHandler', (context, event) => {
        
                let alarmPanel = this.getChildDevice("TC-${settings.securityDeviceId}")
                if (event.value == 'away' && !(alarmPanel.currentStatus == 'Armed Away' || alarmPanel.currentStatus == 'Armed Away - Instant')) {
                    console.log('SHM Mode is set to Away, Performing ArmAway')
                    alarmPanel.armAway()
                } else {
                    if (event.value == 'stay' && !(alarmPanel.currentStatus == 'Armed Stay' || alarmPanel.currentStatus == 'Armed Stay - Instant')) {
                        console.log('SHM Mode is set to Stay, Performing ArmStay')
                        alarmPanel.armStay()
                    } else {
                        if (event.value == 'off' && alarmPanel.currentStatus != 'Disarmed') {
                            console.log('SHM Mode is set to Off, Performing Disarm')
                            alarmPanel.disarm()
                        }
                    }
                }
            

	})

    .scheduledEventHandler('scheduleChecker', (context, event) => {
        
                if (settings.pollOn) {
                    if (settings.alarmDevice) {
                        if (this.now() - state.alarmStatusRefresh / 1000 > settings.panelPollingInterval.toInteger() * 1.5) {
                            this.panelAutoUpdater()
                            console.log('Panel AutoUpdater Restarted')
                        }
                    }
                    if (settings.zoneDevices) {
                        if (this.now() - state.zoneStatusRefresh / 1000 > settings.zonePollingInterval.toInteger() * 1.5) {
                            this.zoneAutoUpdater()
                            console.log('Zone AutoUpdater Restarted')
                        }
                    }
                    if (settings.automationDevices) {
                        if (this.now() - state.automationStatusRefresh / 1000 > settings.automationPollingInterval.toInteger() * 1.5) {
                            this.automationAutoUpdater()
                            console.log('Automation AutoUpdater Restarted')
                        }
                    }
                }
                if (this.now() - state.tokenRefresh / 1000 > 149) {
                    this.keepAlive()
                }
            

	})
