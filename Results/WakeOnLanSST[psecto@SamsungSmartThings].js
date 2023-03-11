
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Set Device', section => {
            section.deviceSetting('MyVButton').capability(['momentary']).name('Add button Trigger');
            section.textSetting('macSet').name('Input MAC');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.MyVButton, 'momentary', 'push', 'WakeOnLan')

    })

    .subscribedEventHandler('WakeOnLan', (context, event) => {
        
        this.sendHubCommand(new physicalgraph.device.HubAction("wake on lan $macSet", physicalgraph.device.Protocol.LAN, null, [:]))
        

	})
