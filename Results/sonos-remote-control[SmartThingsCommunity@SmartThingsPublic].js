
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select your devices', section => {
            section.deviceSetting('buttonDevice').capability(['button']).name('Minimote');
            section.deviceSetting('sonos').capability(['musicPlayer']).name('Sonos');

        });


        page.section('Options', section => {
            section.numberSetting('volumeOffset').name('Adjust Volume by this amount');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.buttonDevice, 'button', 'button', 'buttonEvent')

    })

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
        let buttonNumber = event.data
        let value = event.value
        console.log("buttonEvent: ${event.name} = ${event.value} (${event.data})")
        console.log("button: $buttonNumber, value: $value")
        
        context.api.devices.sendCommands(context.config.buttonDevice, 'button', eventsSince)
    
        it.value == event.value && it.data == event.data
        })
        console.log("Found ${(recentEvents.size()) ? recentEvents.size() : 0} events in past 2 seconds")
        if (recentEvents.size <= 1) {
        this.handleButton(this.extractButtonNumber(buttonNumber), value)
        } else {
        console.log("Found recent button press events for $buttonNumber with value $value")
        }
        

	})
