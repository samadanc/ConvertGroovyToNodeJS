
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is toggled on and off...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Where?');

        });


        page.section('Turn on/off this light with doubletap', section => {
            section.deviceSetting('switch2').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'Switch', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("${event.value}")
        if (event.value == 'on') {
        if (this.now() - state.onTime <= 8000) {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', on)
    
        }
        state.onTime = this.now()
        } else {
        if (event.value == 'off') {
        if (this.now() - state.offTime <= 8000) {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', off)
    
        }
        state.offTime = this.now()
        console.log(state.offTime)
        }
        }
        

	})
