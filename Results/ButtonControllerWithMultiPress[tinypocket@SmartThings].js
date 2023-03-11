
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
        let btn = 0
        switch ( buttonNumber ) {
        case ~('.*1.*') :
        btn = 1
        break
        case ~('.*2.*') :
        btn = 2
        break
        case ~('.*3.*') :
        btn = 3
        break
        case ~('.*4.*') :
        btn = 4
        break
        }
        state.buttonEvent["$btn_event.value"] = event.value
        state.buttonEvent["$btn_event.data"] = event.data
        state.buttonEvent["$btn_event.datemilliseconds"] = event.date.getTime()
        this.buttonHandler(btn)
        }
        

	})
