
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
        console.log("buttonEvent: ${event.name} = ${event.value} (${event.data})")
        console.log("button: $buttonNumber, value: $value")
        let recentEvents = buttonDevice.eventsSince(new Date(this.now() - 3000)).findAll({
        it.value == event.value && it.data == event.data
        })
        console.log("Found ${(recentEvents.size()) ? recentEvents.size() : 0} events in past 3 seconds")
        if (recentEvents.size <= 1) {
        switch ( buttonNumber ) {
        case ~('.*1.*') :
        this.executeHandlers(1, value)
        break
        case ~('.*2.*') :
        this.executeHandlers(2, value)
        break
        case ~('.*3.*') :
        this.executeHandlers(3, value)
        break
        case ~('.*4.*') :
        this.executeHandlers(4, value)
        break
        case ~('.*5.*') :
        this.executeHandlers(5, value)
        break
        case ~('.*6.*') :
        this.executeHandlers(6, value)
        break
        case ~('.*7.*') :
        this.executeHandlers(7, value)
        break
        }
        } else {
        console.log("Found recent button press events for $buttonNumber with value $value")
        }
        }
        

	})
