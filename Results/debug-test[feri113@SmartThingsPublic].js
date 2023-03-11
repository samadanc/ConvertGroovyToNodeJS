
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'someEventHandler')

    })

    .subscribedEventHandler('someEventHandler', (context, event) => {
        
        let currSwitches = switches.currentSwitch
        let onSwitches = currSwitches.findAll({ let switchVal ->
        switchVal == 'on' ? true : false
        })
        
        context.api.devices.sendCommands(context.config.switches, 'switch', log)
    
        

	})
