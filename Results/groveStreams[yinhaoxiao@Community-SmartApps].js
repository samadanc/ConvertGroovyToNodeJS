
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Log devices...', section => {
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Thermostats');
            section.deviceSetting('automatic').capability(['presenceSensor']).name('Automatic Connected Device(s)');
            section.deviceSetting('detectors').capability(['smokeDetector']).name('Smoke/CarbonMonoxide Detectors');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Humidity sensors');
            section.deviceSetting('waters').capability(['waterSensor']).name('Water sensors');
            section.deviceSetting('illuminances').capability(['illuminanceMeasurement']).name('Illuminance sensor');
            section.deviceSetting('locks').capability(['lock']).name('Locks');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Doors open/close');
            section.deviceSetting('accelerations').capability(['accelerationSensor']).name('Accelerations');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motions');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Presence');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('dimmerSwitches').capability(['switchLevel']).name('Dimmer Switches');
            section.deviceSetting('batteries').capability(['battery']).name('Battery-powered devices');
            section.deviceSetting('powers').capability(['powerMeter']).name('Power Meters');
            section.deviceSetting('energys').capability(['energyMeter']).name('Energy Meters');

        });


        page.section('GroveStreams Feed PUT API key...', section => {
            section.textSetting('channelKey').name('API key');

        });


        page.section('Sending data at which interval in minutes (default=5)?', section => {
            section.numberSetting('givenInterval').name('Send Data Interval');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.automatic, 'presenceSensor', 'yesterdayTotalDistanceM', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'fanMinOnTime', 'handleFanMinOnTimeEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'thermostatOperatingState', 'handleThermostatOperatingStateEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'auxHeat1RuntimeDaily', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.batteries, 'battery', 'battery', 'handleBatteryEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'handleLockEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'handleMotionEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'ventilatorRuntimeDaily', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'auxHeat3RuntimeDaily', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'auxHeat2RuntimeDaily', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.automatic, 'presenceSensor', 'yesterdayTripsAvgAverageKmpl', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'dehumidifierMode', 'handleDehumidifierModeEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'humidifierRuntimeDaily', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'ventilatorMinOnTime', 'handleVentilatorMinOnTimeEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'presence', 'handlePresenceEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.automatic, 'presenceSensor', 'yesterdayTotalFuelVolumeL', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'equipmentStatus', 'handleEquipmentStatusEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'humidifierLevel', 'handleHumidifierLevelEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'heatingSetpoint', 'handleHeatingSetpointEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'dehumidifierLevel', 'handleDehumidifierLevelEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'ventilatorMode', 'handleVentilatorModeEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerations, 'accelerationSensor', 'acceleration', 'handleAccelerationEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'compCool2RuntimeDaily', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.humidities, 'relativeHumidityMeasurement', 'humidity', 'handleHumidityEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.energys, 'energyMeter', 'energy', 'handleEnergyEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmerSwitches, 'switchLevel', 'level', 'handleSetLevelEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'dehumidifierRuntimeDaily', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'programScheduleName', 'handleProgramNameEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'handleTemperatureEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.automatic, 'presenceSensor', 'yesterdayTripsAvgScoreSpeeding', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'handlePresenceEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.automatic, 'presenceSensor', 'yesterdayTotalNbTrips', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'compCool1RuntimeDaily', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.automatic, 'presenceSensor', 'yesterdayTotalHardAccels', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handleSwitchEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.detectors, 'smokeDetector', 'carbonMonoxide', 'handleCarbonMonoxideEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'compHeat3RuntimeDaily', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.automatic, 'presenceSensor', 'yesterdayTotalHardBrakes:', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.automatic, 'presenceSensor', 'yesterdayTripsAvgDurationS', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.detectors, 'smokeDetector', 'smoke', 'handleSmokeEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.automatic, 'presenceSensor', 'yesterdayTotalDurationS:', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'coolingSetpoint', 'handleCoolingSetpointEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'fanRuntimeDaily', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.powers, 'powerMeter', 'power', 'handlePowerEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'fanMode', 'handleFanModeEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'thermostatMode', 'handleThermostatModeEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.illuminances, 'illuminanceMeasurement', 'illuminance', 'handleIlluminanceEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmerSwitches, 'switchLevel', 'switch', 'handleSwitchEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handleContactEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.waters, 'waterSensor', 'water', 'handleWaterEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.energys, 'energyMeter', 'cost', 'handleCostEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.automatic, 'presenceSensor', 'yesterdayTripsAvgFuelVolumeL', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'compHeat1RuntimeDaily', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.automatic, 'presenceSensor', 'yesterdayTripsAvgScoreEvents', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'compHeat2RuntimeDaily', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.automatic, 'presenceSensor', 'yesterdayTripsAvgDistanceM', 'handleDailyStats')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobees, 'device.myEcobeeDevice', 'humidifierMode', 'handleHumidifierModeEvent')

    })

    .subscribedEventHandler('handleDehumidifierLevelEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handlePowerEvent', (context, event) => {
        
        if (event.value) {
        this.queueValue(evt, {
        it.toString()
        })
        }
        

	})

    .subscribedEventHandler('handleCarbonMonoxideEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleThermostatOperatingStateEvent', (context, event) => {
        
        this.queueValue(evt, {
        it == 'idle' ? 0 : it == 'fan only' ? 1 : it == 'heating' ? 2 : 3
        })
        

	})

    .subscribedEventHandler('handleSetLevelEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleHeatingSetpointEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleEnergyEvent', (context, event) => {
        
        if (event.value) {
        this.queueValue(evt, {
        it.toString()
        })
        }
        

	})

    .subscribedEventHandler('handleVentilatorModeEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleHumidifierLevelEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleFanMinOnTimeEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleSmokeEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleAccelerationEvent', (context, event) => {
        
        this.queueValue(evt, {
        it == 'active' ? 1 : 0
        })
        

	})

    .subscribedEventHandler('handleDehumidifierModeEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleSwitchEvent', (context, event) => {
        
        this.queueValue(evt, {
        it == 'on' ? 1 : 0
        })
        

	})

    .subscribedEventHandler('handleThermostatModeEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleIlluminanceEvent', (context, event) => {
        
        console.log("handleIlluminanceEvent> ${event.name}= ${event.value}")
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleContactEvent', (context, event) => {
        
        this.queueValue(evt, {
        it == 'open' ? 1 : 0
        })
        

	})

    .subscribedEventHandler('handlePresenceEvent', (context, event) => {
        
        this.queueValue(evt, {
        it == 'present' ? 1 : 0
        })
        

	})

    .subscribedEventHandler('handleTemperatureEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleCostEvent', (context, event) => {
        
        if (event.value) {
        this.queueValue(evt, {
        it.toString()
        })
        }
        

	})

    .subscribedEventHandler('rescheduleIfNeeded', (context, event) => {
        
        if (evt) {
        console.log("rescheduleIfNeeded>${event.name}=${event.value}")
        }
        Integer delay = givenInterval ? givenInterval : 5
        BigDecimal currentTime = this.now()
        BigDecimal lastPollTime = currentTime - atomicState?.poll['last'] ? atomicState?.poll['last'] : 0
        if (lastPollTime != currentTime ) {
        Double lastPollTimeInMinutes = lastPollTime / 60000.toDouble().round(1)
        log.info("rescheduleIfNeeded>last poll was  ${lastPollTimeInMinutes.toString()} minutes ago")
        }
        if (atomicState?.poll['last'] ? atomicState?.poll['last'] : 0 + delay * 60000 < currentTime && this.canSchedule()) {
        log.info("rescheduleIfNeeded>scheduling processQueue in $delay minutes..")
        unschedule
        this.schedule("0 0/$delay * * * ?", processQueue)
        }
        if (!evt) {
        atomicState.poll['rescheduled'] = this.now()
        }
        

	})

    .subscribedEventHandler('handleFanModeEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleCoolingSetpointEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleEquipmentStatusEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleHumidityEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleLockEvent', (context, event) => {
        
        this.queueValue(evt, {
        it == 'locked' ? 1 : 0
        })
        

	})

    .subscribedEventHandler('handleVentilatorMinOnTimeEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleHumidifierModeEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleProgramNameEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleDailyStats', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleMotionEvent', (context, event) => {
        
        this.queueValue(evt, {
        it == 'active' ? 1 : 0
        })
        

	})

    .subscribedEventHandler('handleBatteryEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleWaterEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})
