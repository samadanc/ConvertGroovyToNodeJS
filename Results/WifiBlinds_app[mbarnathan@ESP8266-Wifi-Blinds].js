
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery10Minutes('startDeviceDiscovery', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'onLocation')

    })

    .subscribedEventHandler('onLocation', (context, event) => {
        
                let parsedEvent = this.parseLanMessage(event.description)
                if (parsedEvent?.ssdpTerm?.contains('urn:schemas-blinds:device:WifiBlinds:1')) {
                    this.discoveredDevice(parsedEvent)
                }
                return parsedEvent 
            

	})

    .scheduledEventHandler('startDeviceDiscovery', (context, event) => {
        
                this.sendHubCommand(new physicalgraph.device.HubAction('lan discovery urn:schemas-blinds:device:WifiBlinds:1', physicalgraph.device.Protocol.LAN))
            

	})
