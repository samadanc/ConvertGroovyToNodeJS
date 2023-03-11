
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
        
                log.trace('Checking Network')
                this.sendEvent(['linkText': app.label, 'name': 'sendStatus', 'value': 'Checking Network', 'descriptionText': 'Checking Network', 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                settings.senors.each({ 
                    try {
                        log.trace("${it.displayName} is ${it.currentRssi} RSSI and ${it.currentLqi}% Link quality")
                        this.sendEvent(['linkText': app.label, 'name': "${it.displayName}", 'value': "${it.currentRssi} RSSI and ${it.currentLqi}% Link quality", 'descriptionText': "${it.displayName} is ${it.currentRssi} RSSI and ${it.currentLqi}% Link quality", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                    } 
                    catch (let e) {
                        log.trace('Error checking status')
                        log.trace(e)
                    } 
                })
            

	})
