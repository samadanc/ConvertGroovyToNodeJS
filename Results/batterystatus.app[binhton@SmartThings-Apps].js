
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('updateBatteryStatus', delay);

    })

    .subscribedEventHandler('batteryHandler', (context, event) => {
        
                this.updateBatteryStatus()
            

	})

    .scheduledEventHandler('updateBatteryStatus', (context, event) => {
        
                settings.devices.each({ 
                    try {
                        if (it.currentBattery == null) {
                            if (!(state.lowBattNoticeSent.containsKey(it.id))) {
                                this.send("${it.displayName} battery is not reporting.")
                                state.lowBattNoticeSent[it.id] = true
                            }
                        } else {
                            if (it.currentBattery > 100) {
                                if (!(state.lowBattNoticeSent.containsKey(it.id))) {
                                    this.send("${it.displayName} battery is ${it.currentBattery}, which is over 100.")
                                    state.lowBattNoticeSent[it.id] = true
                                }
                            } else {
                                if (it.currentBattery < settings.level1) {
                                    if (!(state.lowBattNoticeSent.containsKey(it.id))) {
                                        this.send("${it.displayName} battery is ${it.currentBattery} (threshold ${settings.level1}.)")
                                        state.lowBattNoticeSent[it.id] = true
                                    }
                                } else {
                                    if (state.lowBattNoticeSent.containsKey(it.id)) {
                                        state.lowBattNoticeSent.remove(it.id)
                                    }
                                }
                            }
                        }
                    } 
                    catch (let e) {
                        log.trace('Caught error checking battery status.')
                        log.trace(e)
                        if (!(state.lowBattNoticeSent.containsKey(it.id))) {
                            this.send("${it.displayName} battery reported a non-integer level.")
                            state.lowBattNoticeSent[it.id] = true
                        }
                    } 
                })
            

	})
