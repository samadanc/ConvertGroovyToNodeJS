
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the thermostat to read values from and the humidifier switch to control.', section => {
            section.deviceSetting('humidifier').capability(['switch']).name('Select the humidifier switch.');
            section.enumSetting('humidifier_runtime').name('Select how long to run the humidifier (in minutes) during each call for heat.');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('humidifierRunTimeReset', delay);

        context.api.schedules.runEvery5Minutes('humidifierSwitchHandler', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'device.myEcobeeDevice', 'thermostatOperatingState', 'thermostatOperatingHandler')

    })

    .subscribedEventHandler('thermostatOperatingHandler', (context, event) => {
        
        let humidity_map = [:]
        humidity_map = ['40': '45', '30': '40', '20': '35', '10': '30', '0': '25', '-10': '20', '-20': '15']
        if (event.value.toString() == 'heating') {
        
        context.api.devices.sendCommands(context.config.thermostat, 'device.myEcobeeDevice', currentValue)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'device.myEcobeeDevice', currentValue)
    
        this.sendNotificationEvent("[HUMIDIFIER] The furnace has called for heat. Outdoor temperature: $current_temperature. Indoor humidity: $current_humidity%.")
        let target_humidity = null
        humidity_map.any({ let temperature, let humidity ->
        if (current_temperature <= temperature.toInteger()) {
        target_humidity = humidity.toInteger()
        } else {
        return true
        }
        })
        if (target_humidity == null) {
        this.sendNotificationEvent("[HUMIDIFIER] staying off. The current outdoor temperature of $current_temperature is too high to run the humidifier.")
        } else {
        if (current_humidity <= target_humidity ) {
        try {
        if
        state.humidifier_on = new Date().getTime() / 1000
        
        context.api.devices.sendCommands(context.config.humidifier, 'switch', on)
    
        let now = new Date()
        let runTime = new Date
        this.runOnce(runTime, humidifierSwitchHandler, ['data': ['failsafe': false]])
        this.sendNotificationEvent("[HUMIDIFIER] turning ON for $humidifier_runtime minutes.")
        }
        }
        catch (let e) {
        this.sendNotificationEvent("[HUMIDIFIER] thermostatOperatingHandler ERROR: $e")
        }
        } else {
        this.sendNotificationEvent("[HUMIDIFIER] staying off. The current humidity of $current_humidity exceeds the target of $target_humidity at outdoor temperature $current_temperature.")
        }
        }
        } else {
        if (event.value.toString() == 'idle') {
        
        context.api.devices.sendCommands(context.config.humidifier, 'switch', off)
    
        }
        }
        

	})

    .scheduledEventHandler('humidifierSwitchHandler', (context, event) => {
        
        try {
        if (state.humidifier_on != null) {
        let now = new Date()
        let lastRunTime = now.getTime() / 1000 - state.humidifier_on
        if
        if (data.failsafe) {
        if 
        return false
        }
        }
        let total_runtime = state.humidifier_total_runtime == null ? 0 : state.humidifier_total_runtime.toInteger() + new Date().getTime() / 1000 - state.humidifier_on
        state.humidifier_total_runtime = total_runtime
        let msg = 'turning OFF'
        if (data.failsafe) {
        msg = msg + ' due to failsafe'
        }
        this.sendNotificationEvent("[HUMIDIFIER] $msg. Total runtime today: ${(state.humidifier_total_runtime / 60)} minutes.")
        
        context.api.devices.sendCommands(context.config.humidifier, 'switch', off)
    
        }
        }
        }
        catch (let e) {
        this.sendNotificationEvent("[HUMIDIFIER] humidifierSwitchHandler ERROR: $e")
        }
        

	})

    .scheduledEventHandler('humidifierRunTimeReset', (context, event) => {
        
        state.humidifier_total_runtime = 0
        

	})
