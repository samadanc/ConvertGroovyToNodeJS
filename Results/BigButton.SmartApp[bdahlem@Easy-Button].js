
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this button is pressed:', section => {
            section.deviceSetting('button').capability(['button']).name('');

        });


        page.section('Toggle this light:', section => {
            section.deviceSetting('light').capability(['switch']).name('');

        });


        page.section('And toggle these lights as well (Optional):', section => {
            section.deviceSetting('togglelights').capability(['switch']).name('');

        });


        page.section('And only turn on these lights:', section => {
            section.deviceSetting('onlights').capability(['switch']).name('');

        });


        page.section('And only turn off these lights:', section => {
            section.deviceSetting('offlights').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.button, 'button', 'button', 'pushHandler')

    })

    .subscribedEventHandler('pushHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'released' || event.value == 'off') {
        if (light.currentSwitch == 'off') {
        console.log('Turn on the lights!')
        this.turnLightsOn()
        } else {
        console.log('Turn off the lights!')
        this.turnLightsOff()
        }
        }
        

	})
