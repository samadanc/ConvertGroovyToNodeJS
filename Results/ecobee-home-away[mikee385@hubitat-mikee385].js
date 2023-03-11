
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('logsOff', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
                this.logDebug("EHA: ${event.device} current changed to ${event.value}, with pausing when $pauseStatus")
                if (!isPaused) {
                    this.logDebug("EHA: ${event.device} is active, so automations will resume")
                    for (let thermostat : thermostats ) {
                        this.updateThermostat(thermostat, location.mode, false)
                    }
                } else {
                    this.logDebug("EHA: ${event.device} is inactive, so automations will be paused")
                }
            

	})

    .subscribedEventHandler('scheduleHandler', (context, event) => {
        
                this.logDebug("EHA: ${event.device} schedule changed to ${event.value}")
                if (!isPaused) {
                    this.updateThermostat(event.device, location.mode, true)
                } else {
                    this.logDebug('EHA: Automation is paused')
                }
            

	})

    .subscribedEventHandler('currentHandler', (context, event) => {
        
                this.logDebug("EHA: ${event.device} current changed to ${event.value}")
                if (!isPaused) {
                    this.updateThermostat(event.device, location.mode, false)
                } else {
                    this.logDebug('EHA: Automation is paused')
                }
            

	})

    .subscribedEventHandler('modeHandler', (context, event) => {
        
                this.logDebug("EHA: Mode changed to ${event.value}")
                if (!isPaused) {
                    for (let thermostat : thermostats ) {
                        this.updateThermostat(thermostat, event.value, false)
                    }
                } else {
                    this.logDebug('EHA: Automation is paused')
                }
            

	})

    .scheduledEventHandler('logsOff', (context, event) => {
        
                log.warn('Debug logging disabled')
                app.updateSetting('logEnable', ['value': 'false', 'type': 'bool'])
            

	})
