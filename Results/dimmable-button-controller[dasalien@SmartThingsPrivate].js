
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
        
        console.log("buttonEvent: $evt")
        if (allOk) {
        let buttonNumber = event.data
        let value = event.value
        console.log("buttonEvent: ${event.name} = ${event.value} (${event.data})")
        console.log("button: $buttonNumber, value: $value")
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
        }
        }
        

	})
