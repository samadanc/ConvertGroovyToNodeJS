
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkPresence', delay);

    })

    .subscribedEventHandler('presenceChange', (context, event) => {
        
                if (wfhDelay && event.value == 'present') {
                    this.runIn(wfhDelay * 60, checkPresence)
                } else {
                    this.checkPresence()
                }
            

	})

    .scheduledEventHandler('checkPresence', (context, event) => {
        
                if (timeOk && daysOk && othersGone && modeOk ) {
                    if (person.latestValue('presence') == 'present') {
                        console.log("$person is present, triggering WFH action.")
                        location.helloHome.execute(settings.wfhPhrase)
                        let message = "${location.name} executed '${settings.wfhPhrase}' because $person is home."
                        this.send(message)
                        state.wfhMode = location.mode
                    }
                }
            

	})
