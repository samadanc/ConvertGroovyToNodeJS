
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
        
                console.log("zonestatusChanged ${event.name} ${event.value} ${event.type}")
                let parts = event.value.split()
                let part0 = parts[0]
                if (event.type == 'alarmStatus') {
                    state.lastHeartbeat = this.now()
                    console.log("received heartbeat: ${state.lastHeartbeat}")
                } else {
                    if (event.type == 'Open/Closed Sensor' || event.type == 'Motion Detector') {
                        let zone = parts[1]
                        let status = parts[2]
                        let deviceName = "zone$zone"
                        let typeSettingName = "typezone$zone"
                        if (part0 == 'w') {
                            deviceName = "wirelesszone$zone"
                            typeSettingName = "wirelesszonetype$zone"
                        }
                        console.log("$part0 zone $zone status=$status")
                        console.log("deviceName = $deviceName")
                        let device = this.getChildDevice(deviceName)
                        if (device) {
                            let zoneType = settings[ typeSettingName ]
                            let eventName 
                            if (zoneType == null || zoneType == '' || zoneType == 'Open/Closed Sensor') {
                                eventName = 'contact'
                                status = status == '0' || status == 'open' ? 'open' : 'closed'
                            } else {
                                if (zoneType == 'Motion Detector') {
                                    eventName = 'motion'
                                    status = status == '0' || status == 'active' ? 'active' : 'inactive'
                                } else {
                                    if (zoneType == 'Light Sensor') {
                                        eventName = 'illuminance'
                                    } else {
                                        if (zoneType == 'Temperature Sensor') {
                                            eventName = 'temperature'
                                        } else {
                                            if (zoneType == 'Button') {
                                                eventName = 'button'
                                                status = 'pushed'
                                            }
                                        }
                                    }
                                }
                            }
                            console.log("$device statusChanged $status")
                            device.sendEvent(['name': eventName , 'value': status , 'isStateChange': true])
                        } else {
                            console.log("couldn't find device for zone $zone")
                        }
                    }
                }
            

	})

    .scheduledEventHandler('checkHeartbeat', (context, event) => {
        
                let elapsed = this.now() - state.lastHeartbeat
                console.log("checkHeartbeat elapsed: $elapsed")
                if (elapsed > 30000) {
                    console.log('Haven\'t received heartbeat in a while - alarm is offline')
                    this.sendPush('Arduino Alarm appears to be offline - haven\'t received a heartbeat in over 5 minutes')
                }
            

	})
