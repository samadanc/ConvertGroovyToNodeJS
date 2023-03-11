
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose thermostat ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Choose Motion Sensor(s)', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('');

        });


        page.section('Switch HVAC mode (auto to cool/heat) based on the outside temperature (optional)', section => {
            section.deviceSetting('temperatureSensor').capability(['temperatureMeasurement']).name('');
            section.numberSetting('temperatureH').name('Switch to heating temperature');
            section.numberSetting('temperatureC').name('Switch to cooling temperature');

        });


        page.section('Set operating mode temperatures', section => {

        });


        page.section('Set idle mode temperatures', section => {

        });


        page.section('Set delay while switching from operating to idle mode (no motion detected)', section => {
            section.numberSetting('idleTimeout').name('Time in Minutes (0 for immediate)');

        });


        page.section('Select the operating mode time and days (optional)', section => {
            section.timeSetting('startTime').name('Start Time');
            section.timeSetting('endTime').name('End Time');
            section.enumSetting('dayOfWeek').name('Which day of the week?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.inactive', 'inactiveMotionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.active', 'activeMotionHandler')

    })

    .subscribedEventHandler('activeMotionHandler', (context, event) => {
        
        this.unschedule()
        console.log('Active motion detected, initiating operating temperature set')
        let doChange = false
        Calendar localCalendar = Calendar.getInstance(location.timeZone)
        java.lang.Integer currentDayOfWeek = localCalendar.get(Calendar.DAY_OF_WEEK)
        let currentTime = this.now()
        console.log("Current time: ${new Date(currentTime).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        if (startTime != null && endTime != null) {
        let scheduledStart = this.timeToday(startTime, location.timeZone).time
        let scheduledEnd = this.timeToday(endTime, location.timeZone).time
        console.log("Operating StartTime ${new Date(scheduledStart).format(HH:mm z, location.timeZone)}, endTime ${new Date(scheduledEnd).format(HH:mm z, location.timeZone)}")
        if (currentTime < scheduledStart || currentTime > scheduledEnd ) {
        log.info('Outside operating temperature schedule')
        return null
        }
        }
        console.log("Operating DOW(s): $dayOfWeek")
        if 
        doChange = true
        } else {
        if 
        doChange = true
        } else {
        if 
        doChange = true
        } else {
        if 
        doChange = true
        } else {
        if 
        doChange = true
        } else {
        if 
        doChange = true
        } else {
        if 
        doChange = true
        } else {
        if 
        doChange = true
        }
        }
        }
        }
        }
        }
        }
        }
        if (doChange == true) {
        log.info("Setting the operating temperature to $opHeatSet and $opCoolSet")
        this.setTemperature(opHeatSet, opCoolSet)
        } else {
        log.info('Outside operating day of week')
        }
        

	})

    .subscribedEventHandler('inactiveMotionHandler', (context, event) => {
        
        if (idleTimeout != 0) {
        log.info("No motion detected, scheduling switch to idle mode in $idleTimeout minutes")
        let schTime = new Date(this.now() + idleTimeout * 60 * 1000)
        this.schedule(schTime, idleSwitchMode)
        console.log("Scheduled idle mode switch at ${schTime.format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        log.info("Setting the idle temperatures to $idHeatSet and $idCoolSet")
        this.setTemperature(idHeatSet, idCoolSet)
        }
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        console.log("Heat mode switch temperature $temperatureH, cool mode switch temperature $temperatureC")
        if (temperatureH == null || temperatureC == null) {
        return null
        }
        let extTemp = temperatureSensor.currentTemperature
        console.log("External temperature is: $extTemp")
        let thermostatState = thermostat.currentThermostatMode
        let thermostatFan = thermostat.currentThermostatFanMode
        console.log("HVAC current mode $thermostatState")
        console.log("HVAC Fan current mode $thermostatFan")
        if (extTemp < temperatureH ) {
        if (thermostatState == 'cool') {
        let hvacmode = 'heat'
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setThermostatMode)
    
        console.log("HVAC mode set to $hvacmode")
        }
        } else {
        if (extTemp > temperatureC ) {
        if (thermostatState == 'heat') {
        let hvacmode = 'cool'
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setThermostatMode)
    
        console.log("HVAC mode set to $hvacmode")
        }
        }
        }
        if (thermostatFan != 'fanAuto') {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setThermostatFanMode)
    
        console.log('HVAC fan mode set to auto')
        }
        

	})
