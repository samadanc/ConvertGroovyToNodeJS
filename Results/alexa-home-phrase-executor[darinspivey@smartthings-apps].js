
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

    .subscribedEventHandler('pushHandler', (context, event) => {
        
                if (event.value == 'on' && routine_on ) {
                    if (routine_on) {
                        location.helloHome.execute(settings.routine_on)
                    }
                }
            

	})
