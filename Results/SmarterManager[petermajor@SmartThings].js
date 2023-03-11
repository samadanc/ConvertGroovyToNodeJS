
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('ssdpDiscover', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'locationHandler')

    })

    .subscribedEventHandler('locationHandler', (context, event) => {
        
                let description = event.description
                let map = this.stringToMap(event.stringValue)
                let headersString = map.get('headers')
                if (headersString == null) {
                    return null
                }
                let headers = this.getHttpHeaders(headersString)
                if (headers.get('POST /smarter-coffee-callback HTTP/1.1') == null) {
                    return null
                }
                let bodyString = map.get('body')
                if (bodyString == null) {
                    return null
                }
                let body = this.getHttpBody(bodyString)
                let id = body?.id
                if (!id) {
                    return null
                }
                let child = this.getChildDevice(id)
                if (!child) {
                    return null
                }
                let status = body.status
                if (status) {
                    console.log("updating status for device $id")
                    child.updateStatus(status)
                    return null
                }
                let error = body.error
                if (error) {
                    console.log("sending error to device $id")
                    child.notifyError(error)
                    if (error == 'No carafe' && notifyOnCarafeNotReady ) {
                        this.sendPush('Unable to brew coffee... Carafe not ready.')
                    }
                    return null
                }
            

	})
