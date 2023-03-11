
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
        if (allOk) {
        let buttonNumber = event.data
        let value = event.value
        let buttonLabel = buttonDevice.displayName
        console.log("buttonEvent: ${event.name} = ${event.value} (${event.data})")
        console.log("button: $buttonNumber, value: $value")
        let recentEvents = buttonDevice.eventsSince(new Date(this.now() - 3000)).findAll({
        it.value == event.value && it.data == event.data
        })
        console.log("Found ${(recentEvents.size()) ? recentEvents.size() : 0} events in past 3 seconds")
        if (recentEvents.size <= 1) {
        this.executeHandlers(1, buttonLabel, value)
        } else {
        console.log("Found recent button press events for $buttonNumber with value $value")
        }
        }
        

	})
