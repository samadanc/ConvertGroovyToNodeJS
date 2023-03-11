
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is pushed to off while off...', section => {
            section.deviceSetting('buttonswitch1').capability(['button']).name('Which?');

        });


        page.section('Then toggle this light switch...', section => {
            section.deviceSetting('hallSwitch').capability(['switch']).name('Which?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.buttonswitch1, 'button', 'button', 'toggleButtonSwitchHandler')

    })

    .subscribedEventHandler('toggleButtonSwitchHandler', (context, event) => {
        
        console.log("Event: $evt")
        console.log('toggleButtonSwitchHandler')
        if (state.hallLightOn) {
        
        context.api.devices.sendCommands(context.config.hallSwitch, 'switch', off)
    
        state.hallLightOn = false
        } else {
        
        context.api.devices.sendCommands(context.config.hallSwitch, 'switch', on)
    
        state.hallLightOn = true
        }
        

	})
