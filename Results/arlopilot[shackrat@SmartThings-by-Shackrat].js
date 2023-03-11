
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'SHMStateHandler')

    })

    .subscribedEventHandler('SHMStateHandler', (context, event) => {
        
                Map arloDevices = [:]
                Map deviceActions = [:]
                let notifyPush = false
                if (settings.enableSHM != null && !settings.enableSHM) {
                    this.logWarn('Smart Home Monitor features are currently disabled!')
                    return false
                }
                this.logTrace("SHMStateHandler: Alarm Event ${event.value}")
                switch (event.value) {
                    case 'away':
                        arloDevices = shmAwayDevices 
                        deviceActions = shmAwayDeviceActions 
                        notifyPush = settings.SHMArmAway_notifySendPush
                        break
                    case 'stay':
                        arloDevices = shmStayDevices 
                        deviceActions = shmStayDeviceActions 
                        notifyPush = settings.SHMArmStay_notifySendPush
                        break
                    case 'off':
                        arloDevices = shmOffDevices 
                        deviceActions = shmOffDeviceActions 
                        notifyPush = settings.SHMArmOff_notifySendPush
                        break
                    default: 
                    this.logWarn('Ignoring unexpected SHM alarm mode.')
                    break
                }
                this.logDebug("SHMStateHandler: Devices for ${event.value} = $arloDevices")
                let result = true
                arloDevices.each({ let deviceId, let modeId ->
                    if (!(this.setArloMode(deviceId, modeId))) {
                        result = false
                    }
                    this.pause(500)
                })
                if (notifyPush) {
                    this.sendPush("Arlo SHM changed to "${event.value}"; ${(result) ? all Arlo mode(s) changed. : one or more Arlo modes failed to change!} .")
                }
                if (deviceActions.size()) {
                    this.logTrace("SHMStateHandler: Processing device actions for SHM event - ${event.value}...")
                    deviceActions.each({ let propCmd, let deviceIdList ->
                        deviceIdList?.each({ 
                            this."$propCmd"(it)
                            this.pause(500)
                        })
                    })
                }
            

	})
