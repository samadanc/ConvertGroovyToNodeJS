
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery3Hours('discoverySearch', delay);

    })

    .scheduledEventHandler('discoverySearch', (context, event) => {
        
                this.sendHubCommand(new physicalgraph.device.HubAction("lan discovery ${this.discoveryDeviceType()}", physicalgraph.device.Protocol.LAN))
            

	})
