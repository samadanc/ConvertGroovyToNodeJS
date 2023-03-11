
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('discoverBridges', delay);

    })

    .scheduledEventHandler('discoverBridges', (context, event) => {
        
                state.bridges = [['bridgeId': 106201270, 'ip': '192.168.2.3', 'port': 8080, 'dateUpdated': '2017-11-09T17:54:26Z']]
                state.bridges.each({ let bridge ->
                    bridge.bridgeId = bridge.bridgeId.toString()
                    let device = this.getChildDevices()?.find({ 
                        it.currentValue('id') == bridge.bridgeId
                    })
                    if (device) {
                        bridge.token = device.currentValue('token')
                        bridge.mac = device.deviceNetworkId
                    }
                })
            

	})
