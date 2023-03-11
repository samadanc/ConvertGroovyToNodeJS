
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Event trigger', section => {
            section.deviceSetting('button').capability(['button']).name('Which Devices?');

        });


        page.section('Blink folllwing lights', section => {
            section.deviceSetting('lights').capability(['switch']).name('Which Lights?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.button, 'button', 'button.pushed', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        console.log("eventHandler called: $evt")
        this.flashLights()
        

	})
