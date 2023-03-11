
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('ssdpDiscover', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'responseHandler')

    })

    .subscribedEventHandler('responseHandler', (context, event) => {
        
                let description = event.description
                let hub = evt?.hubId
                let parsedEvent = this.parseLanMessage(description)
                parsedEvent << ['hub': hub ]
                log.trace("locationHandler($parsedEvent)")
                console.log(parsedEvent?.headers)
                let d = this.getChildDevices()?.find({ 
                    it.getDataValue('ip') == parsedEvent?.ip && it.getDataValue('port') == parsedEvent?.port || it.getDataValue('mac') == parsedEvent?.mac && it.deviceNetworkId == parsedEvent?.headers?.sid
                })
                if (d) {
                    d.parseResponse(parsedEvent)
                }
            

	})
