
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('refresh', delay);

    })

    .scheduledEventHandler('refresh', (context, event) => {
        
                state.polling = ['last': this.now(), 'runNow': true]
                let updated = this.updateDeviceData()
                if (settings.debugVerbosityLevel.toInteger() > 5) {
                    console.log('state data: ' + state.data)
                    console.log('state lookup: ' + state.lookup)
                    console.log('state list: ' + state.list)
                }
                if (updated) {
                    let childDevice = this.getAllChildDevices()
                    childDevice.each({ 
                        if (settings.debugVerbosityLevel.toInteger() >= 5) {
                            console.log('Updating ' + it.deviceNetworkId)
                            console.log('Updating: state.data[it.deviceNetworkId]: ' + state.data[it.deviceNetworkId])
                        }
                        it.updateThermostatData(state.data[it.deviceNetworkId])
                    })
                }
            

	})
