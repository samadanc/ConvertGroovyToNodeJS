
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Lights that need to be on?', section => {
            section.deviceSetting('lights').capability(['switch']).name('Which Lights?');

        });


        page.section('Which Door?', section => {
            section.deviceSetting('door').capability(['contactSensor']).name('');

        });


        page.section('Delay off for seconds?', section => {
            section.numberSetting('seconds').name('Seconds');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.door, 'contactSensor', 'contact', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("${event.displayName} is ${event.value}")
        if (event.value == 'open') {
        if (seconds) {
        console.log("Delaying off for $seconds seconds")
        this.runIn(seconds, off)
        } else {
        this.off()
        }
        } else {
        this.on()
        }
        

	})
