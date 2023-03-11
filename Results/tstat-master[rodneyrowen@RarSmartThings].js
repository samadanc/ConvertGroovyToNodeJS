
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('poll', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
                this.debugLog(LOG.DEBUG, "Location Mode Change ${location.mode}")
                this.evaluateState()
            

	})

    .subscribedEventHandler('coolingSetpointHandler', (context, event) => {
        
                let tstatThermostat = this.getChildDevice("${app.id}")
                let setpoint = tstatThermostat.currentValue('coolingSetpoint')
                this.debugLog(LOG.DEBUG, "Cooling Setpoint Changed $setpoint")
                this.evaluateState()
            

	})

    .subscribedEventHandler('modeHandler', (context, event) => {
        
                let tstatThermostat = this.getChildDevice("${app.id}")
                let mode = tstatThermostat.currentValue('thermostatMode')
                this.debugLog(LOG.DEBUG, "Got Mode $mode")
                this.evaluateMode(mode)
            

	})

    .subscribedEventHandler('setpointHandler', (context, event) => {
        
                let tstatThermostat = this.getChildDevice("${app.id}")
                let setpoint = tstatThermostat.currentValue('thermostatSetpoint')
                this.updateSetpoint(setpoint)
            

	})

    .subscribedEventHandler('heatingSetpointHandler', (context, event) => {
        
                let tstatThermostat = this.getChildDevice("${app.id}")
                let setpoint = tstatThermostat.currentValue('heatingSetpoint')
                this.debugLog(LOG.DEBUG, "Heating Setpoint Changed $setpoint")
                this.evaluateState()
            

	})

    .scheduledEventHandler('poll', (context, event) => {
        
                this.evaluateState()
            

	})
