
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
        
                console.log('In Poll')
                let children = this.getChildDevices()
                console.log("State: ${state.deviceState}")
                let deviceState = [:]
                this.apiGet('api/device', { let response ->
                    console.log("api/device response2: ${response.data}")
                    response.data.device.each({ let value ->
                        let key = "${value.id}"
                        console.log("key: $key")
                        deviceState[ key ] = [:]
                        deviceState[ key ]['state'] = value.state
                        deviceState[ key ]['id'] = value.id
                        deviceState[ key ]['statevalue'] = value.statevalue
                    })
                })
                console.log("poll deviceState: $deviceState")
                settings.devices.each({ let deviceId ->
                    let detail = state?.deviceDetail[ deviceId ]
                    if (detail != null) {
                        console.log("poll detail: $detail")
                        if (detail.type == 'sensor') {
                            let data = [:]
                            data['Temperature'] = null
                            data['Humidity'] = null
                            let httpparams = [:]
                            httpparams['Id'] = detail.id
                            this.apiGet('api/sensordata', httpparams, { let response ->
                                console.log("api/sensordata response data: ${response.data}")
                                response.data.data.each({ let value ->
                                    console.log("value: $value")
                                    if (value.name == 'humidity') {
                                        data['Humidity'] = value.value
                                    }
                                    if (value.name == 'temp') {
                                        data['Temperature'] = value.value
                                    }
                                })
                            })
                            console.log("sensor data: $data")
                            let child = children?.find({ 
                                it.deviceNetworkId == deviceId 
                            })
                            child?.sendEvent(['name': 'temperature', 'value': ((this.cToPref(data['Temperature'])) as float), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'humidity', 'value': data['Humidity']])
                        } else {
                            if (detail.type == 'switch') {
                                console.log("processing switch ${detail.id}")
                                let child = children?.find({ 
                                    it.deviceNetworkId == deviceId 
                                })
                                if (deviceState[detail.id].state == 1) {
                                    console.log("switch ${detail.id} is on")
                                    child?.sendEvent(['name': 'switch', 'value': 'on'])
                                } else {
                                    console.log("switch ${detail.id} is off")
                                    child?.sendEvent(['name': 'switch', 'value': 'off'])
                                }
                            } else {
                                console.log("Unknown type: ${detail.type}")
                            }
                        }
                    }
                })
            

	})
