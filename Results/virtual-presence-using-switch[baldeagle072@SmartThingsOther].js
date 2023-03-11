
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switch on = present, switch off = not present', section => {
            section.deviceSetting('controlSwitch').capability(['switch']).name('Switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.controlSwitch, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.value == 'on') {
        
        context.api.devices.sendCommands(context.config.slavePresence, 'device.simulatedPresenceSensor', arrived)
    
        } else {
        
        context.api.devices.sendCommands(context.config.slavePresence, 'device.simulatedPresenceSensor', departed)
    
        }
        

	})
