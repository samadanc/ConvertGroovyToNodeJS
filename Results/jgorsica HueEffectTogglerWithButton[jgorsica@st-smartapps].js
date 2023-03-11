
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this button is pressed:', section => {
            section.deviceSetting('button').capability(['button']).name('');

        });


        page.section('Turn on this switch:', section => {
            section.deviceSetting('onLight').capability(['switch']).name('');

        });


        page.section('And cycle colors on these Hue Bulbs:', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Hue Bulbs?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.button, 'button', 'button', 'pushHandler')

    })

    .subscribedEventHandler('pushHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'released' || event.value == 'off') {
        let lightSwitchOn = true
        if (onLight) {
        if (onLight.currentSwitch == 'off') {
        console.log(onLight.currentSwitch)
        lightSwitchOn = false
        console.log("turning on light switches: $onLight")
        
        context.api.devices.sendCommands(context.config.onLight, 'switch', on)
    
        }
        }
        if (lightSwitchOn) {
        this.hueNext()
        }
        let newValue = ['hue': state.hue, 'saturation': 100, 'level': 100]
        console.log("new value = $newValue")
        hues*.setColor(newValue)
        }
        

	})
