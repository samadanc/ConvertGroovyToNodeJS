
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Set these thermostats', section => {
            section.deviceSetting('thermostat').capability(['thermostatMode']).name('Which?');

        });


        page.section('Using these temperature sources', section => {
            section.deviceSetting('temperatureMeasurements').capability(['temperatureMeasurement']).name('Which?');

        });


        page.section('Emergency heat', section => {
            section.deviceSetting('emergencyHeatButtons').capability(['momentary']).name('Emergency heat buttons');
            section.numberSetting('emergencyHeatMinutes').name('Emergency heat minutes');

        });


        page.section('Configuration', section => {

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('updateThermostatMode', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.emergencyHeatButtons, 'momentary', 'momentary.pushed', 'triggerEmergencyHeat')

    })

    .subscribedEventHandler('triggerEmergencyHeat', (context, event) => {
        
        Calendar localCalendar = Calendar.getInstance()
        localCalendar.setTimeZone(this.getTimeZone())
        state.emergencyHeatStart = localCalendar.getTime()
        
        context.api.devices.sendCommands(context.config.emergencyHeatMinutes, 'number', add)
    
        state.emergencyHeatEnd = localCalendar.getTime()
        this.updateThermostatMode()
        

	})

    .scheduledEventHandler('updateThermostatMode', (context, event) => {
        
        let inEmergencyHeat = state.emergencyHeatStart != null && this.timeOfDayIsBetween(state.emergencyHeatStart, state.emergencyHeatEnd, new Date(), this.getTimeZone())
        let heatingSetpoint = inEmergencyHeat ? new BigDecimal(emergencyHeatSetpoint) : this.getCurrentHeatingSetpoint()
        let temperature = this.getFusedTemperatureMeasurements()
        
        context.api.devices.sendCommands(context.config.modes, 'mode', size)
    
        let mode = temperature < heatingSetpoint && inValidMode ? 'heat' : 'off'
        if (thermostat.currentThermostatMode != mode ) {
        let debugString = "Thermostat: Temperature = $temperature, Setpoint = $heatingSetpoint. Current mode ${thermostat.currentThermostatMode}. Setting mode to $mode. In valid mode = $inValidMode. In emergency heat = $inEmergencyHeat"
        console.log(debugString)
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostatMode', setThermostatMode)
    
        if (sendPushMessage) {
        this.sendPush(debugString)
        }
        }
        

	})
