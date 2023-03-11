
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Trigger', section => {
            section.deviceSetting('triggerSwitch').capability(['switch']).name('Switch');

        });


        page.section('Target', section => {
            section.textSetting('targetMacAddress').name('Target MAC Address, in hex, without delimiters');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.triggerSwitch, 'switch', 'switch.on', 'triggerSwitchOnHandler')

    })

    .subscribedEventHandler('triggerSwitchOnHandler', (context, event) => {
        
        console.log('WoL')
        this.sendHubCommand(new physicalgraph.device.HubAction("wake on lan $targetMacAddress", physicalgraph.device.Protocol.LAN, null))
        

	})
