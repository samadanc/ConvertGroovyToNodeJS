
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Instance settings', section => {
            section.textSetting('instanceIp').name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('refreshDevices', delay);

    })

    .scheduledEventHandler('refreshDevices', (context, event) => {
        
        log.trace("Trying to refresh devices at $instanceIp:8123")
        this.sendHubCommand(new physicalgraph.device.HubAction("GET /api/states HTTP/1.1
        HOST: $instanceIp:8123
        
        ", physicalgraph.device.Protocol.LAN, null, ['callback': refreshCallbackHandler ]))
        

	})
