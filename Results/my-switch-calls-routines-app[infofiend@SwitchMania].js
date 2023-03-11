
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
                if (event.value == 'on') {
                    location.helloHome.execute(settings.phrase_on)
                } else {
                    location.helloHome.execute(settings.phrase_off)
                }
            

	})
