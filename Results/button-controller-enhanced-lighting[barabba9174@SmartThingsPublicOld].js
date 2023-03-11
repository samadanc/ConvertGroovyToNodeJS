
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
        switch ( buttonNumber ) {
        case ~('.*1.*') :
        this.executeHandlers(1)
        break
        case ~('.*2.*') :
        this.executeHandlers(2)
        break
        case ~('.*3.*') :
        this.executeHandlers(3)
        break
        case ~('.*4.*') :
        this.executeHandlers(4)
        break
        case ~('.*5.*') :
        this.executeHandlers(5)
        break
        case ~('.*6.*') :
        this.executeHandlers(6)
        break
        case ~('.*7.*') :
        this.executeHandlers(7)
        break
        case ~('.*8.*') :
        this.executeHandlers(8)
        break
        }
        } else {
        if (firstEventId == 0) {
        console.log('No events found. Possible SmartThings latency')
        } else {
        console.log('Duplicate button press found. Not executing handlers')
        }
        }
        }
        

	})
