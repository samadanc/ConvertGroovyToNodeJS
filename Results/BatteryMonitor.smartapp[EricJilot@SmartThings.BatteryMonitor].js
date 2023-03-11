
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('updateStatus', delay);

    })

    .scheduledEventHandler('updateStatus', (context, event) => {
        
                settings.devices.each({ 
                    try {
                        if (it.currentBattery == null) {
                            this.send("${it.displayName} battery is not reporting.")
                        } else {
                            if (it.currentBattery > 100) {
                                this.send("${it.displayName} battery is ${it.currentBattery}, which is over 100.")
                            } else {
                                if (it.currentBattery < settings.level1) {
                                    this.send("${it.displayName} battery is ${it.currentBattery} (threshold ${settings.level1}.)")
                                }
                            }
                        }
                    } 
                    catch (let e) {
                        log.trace('Caught error checking battery status.')
                        log.trace(e)
                        this.send("${it.displayName} battery reported a non-integer level.")
                    } 
                })
            

	})
