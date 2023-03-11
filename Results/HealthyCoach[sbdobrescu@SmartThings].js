
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
                settings.devices.each({ let deviceId ->
                    let detail = state?.deviceDetail[ deviceId ]
                    let data = state?.deviceState[ deviceId ]
                    let child = children?.find({ 
                        it.deviceNetworkId == deviceId 
                    })
                    console.log("Update: $child")
                    switch (detail?.type) {
                        case 'NHC':
                            console.log("Updating NHC $data")
                            child?.sendEvent(['name': 'temperature', 'value': ((this.cToPref(data['Temperature'])) as float), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'carbonDioxide', 'value': data['CO2'], 'unit': 'ppm'])
                            child?.sendEvent(['name': 'humidity', 'value': data['Humidity'], 'unit': '%'])
                            child?.sendEvent(['name': 'temp_trend', 'value': data['temp_trend'], 'unit': ''])
                            child?.sendEvent(['name': 'pressure', 'value': this.pressToPref(data['Pressure']).toDouble().trunc(2), 'unit': settings.pressUnits])
                            child?.sendEvent(['name': 'soundPressureLevel', 'value': data['Noise'], 'unit': 'db'])
                            child?.sendEvent(['name': 'pressure_trend', 'value': data['pressure_trend'], 'unit': ''])
                            child?.sendEvent(['name': 'min_temp', 'value': ((this.cToPref(data['min_temp'])) as float), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'max_temp', 'value': ((this.cToPref(data['max_temp'])) as float), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'units', 'value': settings.pressUnits])
                            child?.sendEvent(['name': 'lastupdate', 'value': this.lastUpdated(data['time_utc']), 'unit': ''])
                            console.log("sent time ${this.lastUpdated(data[time_utc])}")
                            break
                    }
                })
            

	})
