
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
        
                console.log('Polling...')
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
                        case 'NAMain':
                            console.log("Updating NAMain $data")
                            child?.sendEvent(['name': 'temperature', 'value': ((this.cToPref(data['Temperature'])) as float), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'carbonDioxide', 'value': data['CO2']])
                            child?.sendEvent(['name': 'humidity', 'value': data['Humidity']])
                            child?.sendEvent(['name': 'pressure', 'value': data['Pressure']])
                            child?.sendEvent(['name': 'noise', 'value': data['Noise']])
                            break
                        case 'NAModule1':
                            console.log("Updating NAModule1 $data")
                            child?.sendEvent(['name': 'temperature', 'value': ((this.cToPref(data['Temperature'])) as float), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'humidity', 'value': data['Humidity']])
                            break
                        case 'NAModule3':
                            console.log("Updating NAModule3 $data")
                            child?.sendEvent(['name': 'rain', 'value': ((this.rainToPref(data['Rain'])) as float), 'unit': settings.rainUnits])
                            child?.sendEvent(['name': 'rainSumHour', 'value': ((this.rainToPref(data['sum_rain_1'])) as float), 'unit': settings.rainUnits])
                            child?.sendEvent(['name': 'rainSumDay', 'value': ((this.rainToPref(data['sum_rain_24'])) as float), 'unit': settings.rainUnits])
                            child?.sendEvent(['name': 'units', 'value': settings.rainUnits])
                            break
                        case 'NAModule4':
                            console.log("Updating NAModule4 $data")
                            child?.sendEvent(['name': 'temperature', 'value': ((this.cToPref(data['Temperature'])) as float), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'carbonDioxide', 'value': data['CO2']])
                            child?.sendEvent(['name': 'humidity', 'value': data['Humidity']])
                            break
                    }
                })
            

	})
