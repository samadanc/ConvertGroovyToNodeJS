
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
                this.getDeviceList()
                let children = this.getChildDevices()
                console.log("State: ${state.deviceState}")
                settings.devices.each({ let deviceId ->
                    let detail = state.deviceDetail[ deviceId ]
                    let data = state.deviceState[ deviceId ]
                    let child = children.find({ 
                        it.deviceNetworkId == deviceId 
                    })
                    console.log("Update: $child")
                    switch (detail.type) {
                        case 'NAMain':
                            console.log("Updating NAMain $data")
                            child?.sendEvent(['name': 'temperature', 'value': String.format("%.$decimalUnitsf", ((this.cToPref(data['Temperature'])) as float)), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'carbonDioxide', 'value': data['CO2']])
                            child?.sendEvent(['name': 'humidity', 'value': data['Humidity']])
                            child?.sendEvent(['name': 'pressure', 'value': ((data['Pressure']) as float)])
                            child?.sendEvent(['name': 'noise', 'value': data['Noise']])
                            child.updated()
                            break
                        case 'NAModule1':
                            console.log("Updating NAModule1 $data")
                            child?.sendEvent(['name': 'temperature', 'value': String.format("%.$decimalUnitsf", ((this.cToPref(data['Temperature'])) as float)), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'humidity', 'value': data['Humidity']])
                            break
                        case 'NAModule2':
                            console.log("Updating NAModule2 $data")
                            child?.sendEvent(['name': 'WindAngle', 'value': data['WindAngle']])
                            child?.sendEvent(['name': 'WindStrength', 'value': ((data['WindStrength']) as float)])
                            child?.sendEvent(['name': 'GustStrength', 'value': ((data['GustStrength']) as float)])
                            child.updated()
                            break
                        case 'NAModule3':
                            console.log("Updating NAModule3 $data")
                            child?.sendEvent(['name': 'rain', 'value': data['Rain']])
                            child?.sendEvent(['name': 'rainSumHour', 'value': ((data['sum_rain_1']) as float)])
                            child?.sendEvent(['name': 'rainSumDay', 'value': ((data['sum_rain_24']) as float)])
                            child.updated()
                            break
                        case 'NAModule4':
                            console.log("Updating NAModule4 $data")
                            child?.sendEvent(['name': 'temperature', 'value': String.format("%.$decimalUnitsf", ((this.cToPref(data['Temperature'])) as float)), 'unit': this.getTemperatureScale()])
                            child?.sendEvent(['name': 'carbonDioxide', 'value': data['CO2']])
                            child?.sendEvent(['name': 'humidity', 'value': data['Humidity']])
                            break
                    }
                })
            

	})
