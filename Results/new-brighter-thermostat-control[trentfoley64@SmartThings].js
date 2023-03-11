
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('runThermostatControl', delay);

    })

    .scheduledEventHandler('runThermostatControl', (context, event) => {
        
                let msg = "${app.label}: runThermostatControl at " + new Date(this.now()).format('EEE MMM dd yyyy HH:mm z', location.timeZone)
                console.log(msg)
                this.sendNotificationEvent(msg)
                let passedChecks = this.checkPresences()
                if (passedChecks) {
                    msg = "${parent.thermostats} heat setpoint to '$heatSetpoint' and cool setpoint to '$coolSetpoint'"
                    console.log("${app.label}: $msg")
                    this.sendNotificationEvent("${app.label}: $msg")
                    parent.thermostats.setHeatingSetpoint(heatSetpoint)
                    parent.thermostats.setCoolingSetpoint(coolSetpoint)
                    parent.thermostats.setThermostatMode('auto')
                    parent.thermostats.setThermostatFanMode('auto')
                    this.sendMessage(msg)
                }
            

	})
