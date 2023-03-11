
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'lanResponseHandler')

    })

    .subscribedEventHandler('lanResponseHandler', (context, event) => {
        
                let map = this.stringToMap(event.stringValue)
                if (map.headers == null || map.body == null) {
                    return null
                }
                let headers = this.getHttpHeaders(map.headers)
                let body = this.getHttpBody(map.body)
                let deviceId = headers.Device
                if (deviceId == null) {
                    return null
                }
                let childDevice = this.getChildDevice(state.childDeviceID)
                childDevice.parse_json(deviceId, body)
            

	})
