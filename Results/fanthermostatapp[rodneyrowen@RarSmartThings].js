
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Fan Thermostat', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Fan Thermostat');

        });


        page.section('Outdoor', section => {
            section.deviceSetting('outTemp').capability(['temperatureMeasurement']).name('Outdoor Thermometer');

        });


        page.section('Indoor', section => {
            section.deviceSetting('inTemp').capability(['temperatureMeasurement']).name('Indoor Thermometer');
            section.numberSetting('coolingTemp').name('Minimum Indoor Temperature');
            section.deviceSetting('fans').capability(['switch']).name('Vent Fan');

        });


        page.section('Thermostat', section => {
            section.deviceSetting('houseThermostat').capability(['thermostat']).name('House Thermostat');

        });


        page.section('Window Contants', section => {
            section.deviceSetting('windows').capability(['contactSensor']).name('Contact Sensors');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatFanMode', 'fanModeHandler')

        context.api.schedules.runEvery5Minutes('poll', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.inTemp, 'temperatureMeasurement', 'temparture', 'temperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatSetpoint', 'setpointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.outTemp, 'temperatureMeasurement', 'temparture', 'outdoorTempHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.houseThermostat, 'thermostat', 'thermostatMode', 'thermostatHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'coolingSetpoint', 'delayTimeHandler')

    })

    .subscribedEventHandler('outdoorTempHandler', (context, event) => {
        
        let outdoorTemp = outTemp.currentTemperature
        log.trace("Outdoor Temp $outdoorTemp")
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setOutdoorTemp)
    
        

	})

    .subscribedEventHandler('thermostatHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.houseThermostat, 'thermostat', currentValue)
    
        log.trace("Got House Mode $houseMode")
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setThermostatMode)
    
        

	})

    .subscribedEventHandler('fanModeHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', currentValue)
    
        log.trace("Got Fan State $fanMode")
        if (fanMode == FAN_MODE.CIRCULATE) {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', currentValue)
    
        log.trace("Set Delay Hours: $delayHours")
        state.delayTime = this.now()
        state.delayTimeout = delayHours * DELAY_ONE_HOUR + 15000
        }
        this.processFanModeChange(fanMode)
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        let average = this.getTemparture()
        console.log("temp average: $average")
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setTemperature)
    
        

	})

    .subscribedEventHandler('setpointHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', currentValue)
    
        log.trace("Setpoint Changed $setpoint")
        this.processAutoMode()
        

	})

    .subscribedEventHandler('delayTimeHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', currentValue)
    
        log.trace("Got Timer change Hours: $delayHours")
        state.delayTime = this.now()
        state.delayTimeout = delayHours * DELAY_ONE_HOUR + 15000
        this.processFanModeChange(fanMode)
        

	})

    .scheduledEventHandler('poll', (context, event) => {
        
        this.processAutoMode()
        

	})
