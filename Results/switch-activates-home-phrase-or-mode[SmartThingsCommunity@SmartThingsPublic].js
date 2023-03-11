
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section(''Instructions'', section => {

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
                if (event.value == 'on' && phrase_on || onMode ) {
                    if (phrase_on) {
                        location.helloHome.execute(settings.phrase_on)
                    }
                    if (onMode) {
                        this.changeMode(onMode)
                    }
                } else {
                    if (event.value == 'off' && phrase_off || offMode ) {
                        if (phrase_off) {
                            location.helloHome.execute(settings.phrase_off)
                        }
                        if (offMode) {
                            this.changeMode(offMode)
                        }
                    }
                }
            

	})
