
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkPresence', delay);

    })

    .scheduledEventHandler('checkPresence', (context, event) => {
        
                if (daysOk && modeOk ) {
                    if (person.latestValue('presence') == 'present') {
                        console.log("$person is present, triggering WFH action.")
                        location.helloHome.execute(settings.wfhPhrase)
                        let message = "${location.name} executed '${settings.wfhPhrase}' because $person is home."
                        this.send(message)
                    }
                }
            

	})
