
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery1Hour('updateDevices', delay);

    })

    .scheduledEventHandler('updateDevices', (context, event) => {
        
                this.logDebug("UpdateDevices: ${state.devices}")
                state.missingDevice = false
                let devices = state.deviceIps
                if (deviceIps == [:]) {
                    this.findDevices(1000, parseIpData)
                    return null
                } else {
                    devices.each({ 
                        let deviceIP = it.value.ip
                        this.runIn(2, setMissing)
                        this.sendGetCmd(deviceIP, '/api/device/state', checkValid)
                        this.pauseExecution(2100)
                    })
                }
                if (state.missingDevice == true) {
                    state.deviceIps = [:]
                    this.findDevices(1000, parseIpData)
                    state.missingDevices == false
                }
            

	})
