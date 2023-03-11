
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('checkHeartbeat', delay);

    })

    .subscribedEventHandler('zonestatusChanged', (context, event) => {
        
                console.log("zonestatusChanged ${event.value}")
                let parts = event.value.split()
                let zonetype = parts[0]
                if (zonetype == 'heartbeat') {
                    state.lastHeartbeat = this.now()
                    console.log("received heartbeat: ${state.lastHeartbeat}")
                } else {
                    let zone = parts[1]
                    let status = parts[2]
                    let deviceName = "zone$zone"
                    let typeSettingName = "typezone$zone"
                    if (zonetype == 'wireless') {
                        deviceName = "wirelesszone$zone"
                        typeSettingName = "wirelesszonetype$zone"
                    }
                    console.log("$zonetype zone $zone status=$status")
                    let device = this.getChildDevice(deviceName)
                    if (device) {
                        console.log("$device statusChanged $status")
                        let zoneType = settings[ typeSettingName ]
                        if (zoneType == null || zoneType == '') {
                            zoneType = 'Open/Closed Sensor'
                        }
                        let eventName = 'contact'
                        if (zonetype == 'wireless') {
                            status = status == '0' ? 'open' : 'closed'
                        }
                        if (zoneType == 'Motion Detector') {
                            eventName = 'motion'
                            status = status == 'open' ? 'active' : 'inactive'
                        }
                        device.sendEvent(['name': eventName , 'value': status , 'isStateChange': true])
                    } else {
                        console.log("couldn't find device for zone $zone")
                    }
                }
            

	})

    .scheduledEventHandler('checkHeartbeat', (context, event) => {
        
                let elapsed = this.now() - state.lastHeartbeat
                console.log("checkHeartbeat elapsed: $elapsed")
                if (elapsed > 30000) {
                    this.sendPush('Arduino Alarm appears to be offline - haven\'t received a heartbeat in over 5 minutes')
                }
            

	})
