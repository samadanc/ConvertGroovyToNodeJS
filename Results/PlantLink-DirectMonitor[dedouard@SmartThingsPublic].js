
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('sendStatus', delay);

    })

    .scheduledEventHandler('sendStatus', (context, event) => {
        
                log.trace('Checking Plants')
                this.sendEvent(['linkText': app.label, 'name': 'sendStatus', 'value': 'Checking Plants', 'descriptionText': 'Checking Plants', 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                settings.senors.each({ 
                    try {
                        log.trace("${it.displayName} is ${it.currentStatus}")
                        this.sendEvent(['linkText': app.label, 'name': "${it.displayName}", 'value': "${it.currentStatus} at ${it.currentHumidity}%", 'descriptionText': "${it.displayName} is ${it.currentStatus} at ${it.currentHumidity}", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                        if (it.currentStatus == 'Too Wet' && settings.sendTooWet == true) {
                            this.send("${it.displayName} is ${it.currentStatus}")
                        }
                        if (it.currentStatus == 'Too Dry' && settings.sendTooDry == true) {
                            this.send("${it.displayName} is ${it.currentStatus}")
                        }
                    } 
                    catch (let e) {
                        log.trace('Error checking status')
                        log.trace(e)
                    } 
                })
            

	})
