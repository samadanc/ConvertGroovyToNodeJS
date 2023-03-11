
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
                    switch (detail?.type) {
                        case 'NAMain':
                            console.log("Updating Basestation $data")
                            child?.sendEvent(['name': 'temperature', 'value': ((this.cToPref(data['Temperature'])) as float), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'carbonDioxide', 'value': data['CO2'], 'unit': 'ppm'])
                            child?.sendEvent(['name': 'humidity', 'value': data['Humidity'], 'unit': '%'])
                            child?.sendEvent(['name': 'temp_trend', 'value': data['temp_trend'], 'unit': ''])
                            child?.sendEvent(['name': 'pressure', 'value': this.pressToPref(data['Pressure']).toDouble().trunc(2), 'unit': settings.pressUnits])
                            child?.sendEvent(['name': 'soundPressureLevel', 'value': data['Noise'], 'unit': 'db'])
                            child?.sendEvent(['name': 'sound', 'value': this.noiseTosound(data['Noise'])])
                            child?.sendEvent(['name': 'pressure_trend', 'value': data['pressure_trend'], 'unit': ''])
                            child?.sendEvent(['name': 'min_temp', 'value': ((this.cToPref(data['min_temp'])) as float), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'max_temp', 'value': ((this.cToPref(data['max_temp'])) as float), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'units', 'value': settings.pressUnits])
                            child?.sendEvent(['name': 'lastupdate', 'value': this.lastUpdated(data['time_utc']), 'unit': ''])
                            child?.sendEvent(['name': 'date_min_temp', 'value': this.lastUpdated(data['date_min_temp']), 'unit': ''])
                            child?.sendEvent(['name': 'date_max_temp', 'value': this.lastUpdated(data['date_max_temp']), 'unit': ''])
                            break
                        case 'NAModule1':
                            console.log("Updating Outdoor Module $data")
                            child?.sendEvent(['name': 'temperature', 'value': ((this.cToPref(data['Temperature'])) as float), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'humidity', 'value': data['Humidity'], 'unit': '%'])
                            child?.sendEvent(['name': 'temp_trend', 'value': data['temp_trend'], 'unit': ''])
                            child?.sendEvent(['name': 'min_temp', 'value': ((this.cToPref(data['min_temp'])) as float), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'max_temp', 'value': ((this.cToPref(data['max_temp'])) as float), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'battery', 'value': detail['battery_percent'], 'unit': '%'])
                            child?.sendEvent(['name': 'lastupdate', 'value': this.lastUpdated(data['time_utc']), 'unit': ''])
                            child?.sendEvent(['name': 'date_min_temp', 'value': this.lastUpdated(data['date_min_temp']), 'unit': ''])
                            child?.sendEvent(['name': 'date_max_temp', 'value': this.lastUpdated(data['date_max_temp']), 'unit': ''])
                            break
                        case 'NAModule3':
                            console.log("Updating Rain Module $data")
                            child?.sendEvent(['name': 'rain', 'value': this.rainToPref(data['Rain']), 'unit': settings.rainUnits])
                            child?.sendEvent(['name': 'rainSumHour', 'value': this.rainToPref(data['sum_rain_1']), 'unit': settings.rainUnits])
                            child?.sendEvent(['name': 'rainSumDay', 'value': this.rainToPref(data['sum_rain_24']), 'unit': settings.rainUnits])
                            child?.sendEvent(['name': 'units', 'value': settings.rainUnits])
                            child?.sendEvent(['name': 'battery', 'value': detail['battery_percent'], 'unit': '%'])
                            child?.sendEvent(['name': 'lastupdate', 'value': this.lastUpdated(data['time_utc']), 'unit': ''])
                            child?.sendEvent(['name': 'rainUnits', 'value': this.rainToPrefUnits(data['Rain']), 'displayed': false])
                            child?.sendEvent(['name': 'rainSumHourUnits', 'value': this.rainToPrefUnits(data['sum_rain_1']), 'displayed': false])
                            child?.sendEvent(['name': 'rainSumDayUnits', 'value': this.rainToPrefUnits(data['sum_rain_24']), 'displayed': false])
                            break
                        case 'NAModule4':
                            console.log("Updating Additional Module $data")
                            child?.sendEvent(['name': 'temperature', 'value': ((this.cToPref(data['Temperature'])) as float), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'carbonDioxide', 'value': data['CO2'], 'unit': 'ppm'])
                            child?.sendEvent(['name': 'humidity', 'value': data['Humidity'], 'unit': '%'])
                            child?.sendEvent(['name': 'temp_trend', 'value': data['temp_trend'], 'unit': ''])
                            child?.sendEvent(['name': 'min_temp', 'value': ((this.cToPref(data['min_temp'])) as float), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'max_temp', 'value': ((this.cToPref(data['max_temp'])) as float), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'battery', 'value': detail['battery_percent'], 'unit': '%'])
                            child?.sendEvent(['name': 'lastupdate', 'value': this.lastUpdated(data['time_utc']), 'unit': ''])
                            child?.sendEvent(['name': 'date_min_temp', 'value': this.lastUpdated(data['date_min_temp']), 'unit': ''])
                            child?.sendEvent(['name': 'date_max_temp', 'value': this.lastUpdated(data['date_max_temp']), 'unit': ''])
                            break
                        case 'NAModule2':
                            console.log("Updating Wind Module $data")
                            child?.sendEvent(['name': 'WindAngle', 'value': data['WindAngle'], 'unit': '°', 'displayed': false])
                            child?.sendEvent(['name': 'GustAngle', 'value': data['GustAngle'], 'unit': '°', 'displayed': false])
                            child?.sendEvent(['name': 'battery', 'value': detail['battery_percent'], 'unit': '%'])
                            child?.sendEvent(['name': 'WindStrength', 'value': this.windToPref(data['WindStrength']).toDouble().trunc(1), 'unit': settings.windUnits])
                            child?.sendEvent(['name': 'GustStrength', 'value': this.windToPref(data['GustStrength']).toDouble().trunc(1), 'unit': settings.windUnits])
                            child?.sendEvent(['name': 'max_wind_str', 'value': this.windToPref(data['max_wind_str']).toDouble().trunc(1), 'unit': settings.windUnits])
                            child?.sendEvent(['name': 'units', 'value': settings.windUnits])
                            child?.sendEvent(['name': 'lastupdate', 'value': this.lastUpdated(data['time_utc']), 'unit': ''])
                            child?.sendEvent(['name': 'date_max_wind_str', 'value': this.lastUpdated(data['date_max_wind_str']), 'unit': ''])
                            child?.sendEvent(['name': 'WindDirection', 'value': this.windTotext(data['WindAngle'])])
                            child?.sendEvent(['name': 'GustDirection', 'value': this.gustTotext(data['GustAngle'])])
                            child?.sendEvent(['name': 'WindStrengthUnits', 'value': this.windToPrefUnits(data['WindStrength']), 'displayed': false])
                            child?.sendEvent(['name': 'GustStrengthUnits', 'value': this.windToPrefUnits(data['GustStrength']), 'displayed': false])
                            child?.sendEvent(['name': 'max_wind_strUnits', 'value': this.windToPrefUnits(data['max_wind_str']), 'displayed': false])
                            break
                    }
                })
            

	})
