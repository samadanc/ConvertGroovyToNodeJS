
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
        let buttonNumber = event.jsonData.buttonNumber
        let firstEventId = 0
        let value = event.value
        console.log("button: $buttonNumber, value: $value")
        if (value == 'held') {
        buttonNumber = buttonNumber + numberOfButtons.toInteger() / 2
        }
        if (value == 'double') {
        buttonNumber = buttonNumber + numberOfButtons.toInteger()
        }
        if (debounce != null && debounce != '' && debounce > 0) {
        let recentEvents = buttonDevice.eventsSince(new Date(this.now() - debounce )).findAll({
        it.value == event.value && it.data == event.data
        })
        console.log("Found ${(recentEvents.size()) ? recentEvents.size() : 0} events in past ${(debounce / 1000)} seconds")
        if (recentEvents.size() != 0) {
        console.log("First Event ID: ${recentEvents[0].id}")
        firstEventId = recentEvents[0].id
        } else {
        firstEventId = 0
        }
        } else {
        firstEventId = event.id
        }
        console.log("This Event ID: ${event.id}")
        if (firstEventId == event.id) {
        this.executeHandlers(buttonNumber)
        } else {
        if (firstEventId == 0) {
        console.log('No events found. Possible SmartThings latency')
        } else {
        console.log('Duplicate button press found. Not executing handlers')
        }
        }
        }
        

	})
