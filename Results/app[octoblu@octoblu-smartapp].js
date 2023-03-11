
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('eventForward', (context, event) => {
        
                let eventData = ['devices': ['*'], 'payload': this.getEventData(evt)]
                this.debug("sending event: ${groovy.json.JsonOutput.toJson(eventData)}")
                let vendorDevice = state.vendorDevices[event.deviceId]
                if (!vendorDevice) {
                    log.error("aborting, vendor device for ${event.deviceId} doesn't exist?")
                    return null
                }
                this.debug("using device $vendorDevice")
                let postParams = ['uri': this.apiUrl() + 'messages', 'headers': ['meshblu_auth_uuid': vendorDevice.uuid, 'meshblu_auth_token': vendorDevice.token], 'body': groovy.json.JsonOutput.toJson(eventData)]
                try {
                    this.httpPostJson(postParams, { let response ->
                        this.debug('sent off device event')
                    })
                } 
                catch (let e) {
                    log.error("unable to send device event $e")
                } 
            

	})
