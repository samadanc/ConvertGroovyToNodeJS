
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('poll', delay);

    })

    .scheduledEventHandler('poll', (context, event) => {
        
                console.log('Polling')
                this.getDeviceList()
                let children = this.getChildDevices()
                if (location.timeZone == null) {
                    log.warn('Location is not set! Go to your ST app and set your location')
                }
                settings.devices.each({ let deviceId ->
                    let detail = state?.deviceDetail[ deviceId ]
                    let data = state?.deviceState[ deviceId ]
                    let child = children?.find({ 
                        it.deviceNetworkId == deviceId 
                    })
                    switch (detail?.type) {
                        case 'NATherm1':
                            console.log("Updating Thermostat $data")
                            let setpoint_mode = detail['setpoint'].find({ 
                                it.key == 'setpoint_mode'
                            }).value.capitalize()
                            if (setpoint_mode == 'Manual') {
                                child?.sendEvent(['name': 'setpoint_temp', 'value': detail['setpoint'].find({ 
                                    it.key == 'setpoint_temp'
                                }).value, 'unit': 'C'])
                                child?.sendEvent(['name': 'setpoint_endtime', 'value': this.formatTime(detail['setpoint'].find({ 
                                    it.key == 'setpoint_endtime'
                                }).value), 'unit': ''])
                            } else {
                                child?.sendEvent(['name': 'setpoint_temp', 'value': detail['measured'].find({ 
                                    it.key == 'setpoint_temp'
                                }).value, 'unit': 'C'])
                                child?.sendEvent(['name': 'setpoint_endtime', 'value': '--', 'unit': ''])
                            }
                            let rf_status = detail['rf_status']
                            if (rf_status == 60) {
                                child?.sendEvent(['name': 'rf_status', 'value': 'Full', 'unit': ''])
                            } else {
                                if (rf_status > 60) {
                                    child?.sendEvent(['name': 'rf_status', 'value': 'High', 'unit': ''])
                                } else {
                                    if (rf_status >= 70) {
                                        child?.sendEvent(['name': 'rf_status', 'value': 'Medium', 'unit': ''])
                                    } else {
                                        if (rf_status >= 80) {
                                            child?.sendEvent(['name': 'rf_status', 'value': 'Low', 'unit': ''])
                                        }
                                    }
                                }
                            }
                            child?.sendEvent(['name': 'temperature', 'value': detail['measured'].find({ 
                                it.key == 'temperature'
                            }).value, 'unit': 'C'])
                            child?.sendEvent(['name': 'setpoint_mode', 'value': setpoint_mode ])
                            child?.sendEvent(['name': 'last_updated', 'value': this.formatTime(detail['measured'].find({ 
                                it.key == 'time'
                            }).value), 'unit': ''])
                            child?.sendEvent(['name': 'battery', 'value': detail['battery_percent'], 'unit': '%'])
                            break
                    }
                })
            

	})
