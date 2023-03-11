
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('discoverySearch', delay);

    })

    .scheduledEventHandler('discoverySearch', (context, event) => {
        
                console.log('Discovering Konnected devices on the network via SSDP')
                this.sendHubCommand(new physicalgraph.device.HubAction("lan discovery ${this.discoveryDeviceType()}", physicalgraph.device.Protocol.LAN))
            

	})
