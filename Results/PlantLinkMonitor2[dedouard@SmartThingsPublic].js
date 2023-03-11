
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'updated')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'updated')

        context.api.schedules.schedule('sendStatus', delay);

    })

    .subscribedEventHandler('updated', (context, event) => {
        
                log.trace("Updated with settings: $settings")
                this.unschedule()
                this.unsubscribe()
                this.initialize()
            

	})

    .scheduledEventHandler('sendStatus', (context, event) => {
        
                log.trace('Checking Plants')
                let verb = ''
                this.sendEvent(['linkText': app.label, 'name': 'sendStatus', 'value': 'Checking Plants', 'descriptionText': 'Checking Plants', 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                settings.senors.each({ 
                    try {
                        if (it.currentPlantStatus.contains('Needs')) {
                            verb = ' '
                        } else {
                            verb = ' is '
                        }
                        log.trace("${it.displayName}$verb${it.currentPlantStatus.toLowerCase()}")
                        this.sendEvent(['linkText': app.label, 'name': "${it.displayName}", 'value': "${it.currentPlantStatus}", 'descriptionText': "${it.displayName}$verb${it.currentPlantStatus.toLowerCase()}", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                        if (it.currentPlantStatus == 'Too Wet' && settings.sendTooWet == true) {
                            this.send("${it.displayName}$verb${it.currentPlantStatus.toLowerCase()}")
                        }
                        if (it.currentPlantStatus == 'Too Dry' || it.currentPlantStatus == 'Needs Water' && settings.sendTooDry == true) {
                            this.send("${it.displayName}$verb${it.currentPlantStatus.toLowerCase()}")
                        }
                    } 
                    catch (let e) {
                        log.trace('Error checking status')
                        log.trace(e)
                    } 
                })
            

	})
