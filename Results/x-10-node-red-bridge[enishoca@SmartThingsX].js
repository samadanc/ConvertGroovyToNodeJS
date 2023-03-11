
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
                if (map.mac != state.nodeRedMac && map.ip != this.convertIPtoHex(settings.nodeRedAddress) || map.port != this.convertPortToHex(settings.nodeRedPort)) {
                    return null
                }
                let headers = this.parseHttpHeaders(map.headers)
                switch (headers.X10NodeRed) {
                    case 'Registered':
                        log.trace("lanResponseHandler Updating MAC address for Node Red Server: ${state.nodeRedMac}")
                        state.nodeRedMac = map.mac
                        break
                    case 'DeviceUpdate':
                        let body = this.parseHttpBody(map.body)
                        log.trace("lanResponseHandler Body: $body")
                        this.processEvent(body)
                        break
                }
            

	})
