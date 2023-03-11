
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Temperature sensor(s)... (If multiple sensors are selected, the average value will be used)', section => {
            section.deviceSetting('sensors').capability(['temperatureMeasurement']).name('Sensor');
            section.numberSetting('sensorMinimum').name('Minimum value that the sensor is deemed valid');
            section.numberSetting('sensorMaximum').name('Maximum value that the sensor is deemed valid');

        });


        page.section('Select the heater outlet(s)... ', section => {
            section.deviceSetting('outlets').capability(['switch']).name('Outlets');

        });


        page.section('['hideWhenEmpty': true], 'Only heat when a contact isn\'t open (optional, leave blank to not require contact detection)...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contact');
            section.numberSetting('contactDuration').name('Duration a contact has to be open before heating is turning off (Mins: 1-30)');

        });


        page.section('['hideWhenEmpty': true], 'Only heat when a person is present (optional, leave blank to not require presence detection)...', section => {
            section.deviceSetting('presences').capability(['presenceSensor']).name('Presence');
            section.numberSetting('presenceMinimumDuration').name('Minimum duration a presence stays active for (Mins: 0-30)');

        });


        page.section('['hideWhenEmpty': true], 'Only heat when a movement is detected (optional, leave blank to not require motion detection)...', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion');
            section.numberSetting('motionDuration').name('Duration a motion stays active for (Mins: 1-30)');

        });


        page.section('Never go below this temperature (even if heating is turned off): (optional)', section => {

        });


        page.section('Temperature Threshold (Don\'t allow heating to go above or below this amount from set temperature)', section => {

        });


        page.section('Monday to Friday Schedule', section => {
            section.timeSetting('zone1').name('Zone 1 start time');
            section.timeSetting('zone2').name('Zone 2 start time');
            section.timeSetting('zone3').name('Zone 3 start time');
            section.timeSetting('zone4').name('Zone 4 start time');

        });


        page.section('Saturday and Sunday Schedule', section => {
            section.timeSetting('zone1Weekend').name('Zone 1 start time');
            section.timeSetting('zone2Weekend').name('Zone 2 start time');
            section.timeSetting('zone3Weekend').name('Zone 3 start time');
            section.timeSetting('zone4Weekend').name('Zone 4 start time');

        });


        page.section('Boost', section => {
            section.numberSetting('boostDuration').name('Boost duration (5 - 60 minutes)');

        });


        page.section('Minimum on time', section => {
            section.numberSetting('minOnTime').name('Minimum time the outlets stay on (0-10 minutes)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presences, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion.inactive', 'motionHandler')

        context.api.schedules.runEvery1Hour('updateTimings', delay);

        context.api.schedules.runIn('initialize', delay);

    })

    .subscribedEventHandler('thermostatTemperatureHandler', (context, event) => {
        
        if (state.boost) {
        console.log("ThermostatTemperatureHandler: Restoring zone name from 'Boosted' to previous name: ${state.previousZoneNameBoost}")
        state.boost = false
        this.unschedule(boostOff)
        let thermostat = this.getThermostat()
        thermostat.setZoneName(state.previousZoneNameBoost)
        } else {
        console.log('ThermostatTemperatureHandler: Not in \'boost\' mode, nothing to reset')
        }
        this.evaluateRoutine()
        

	})

    .subscribedEventHandler('thermostatModeHandler', (context, event) => {
        
        let mode = event.value
        console.log("ThermostatModeHandler: Mode Changed to: $mode")
        if (mode == 'heat') {
        if (state.contact && state.presence || presenceAwaySetpoint != null && state.motion || motionAwaySetpoint != null) {
        console.log('ThermostatModeHandler: Contact/Presence is True, performing evaluation')
        this.evaluateRoutine()
        } else {
        console.log('ThermostatModeHandler: Either no presence (or presence temp not set), or Contact open, no motion (or motion temp not set), turning off heating')
        this.heatingOff(mode == 'heat' ? false : true)
        }
        } else {
        console.log('ThermostatModeHandler: Heating off')
        this.heatingOff(mode == 'heat' ? false : true)
        }
        

	})

    .subscribedEventHandler('thermostatBoostHandler', (context, event) => {
        
        console.log("ThermostatBoostHandler: Boost has been requested. Boost value: ${state.boost}")
        let thermostat = this.getThermostat()
        if (state.boost == false) {
        console.log('ThermostatBoostHandler: Not currently boosted, remembering previous values')
        state.previousZoneNameBoost = thermostat.currentValue('zoneName')
        state.previousTemperatureBoost = thermostat.currentValue('thermostatSetpoint')
        let boostTemp = thermostat.currentValue('thermostatSetpoint') + boostTemperature
        let nowtime = this.now()
        let nowtimePlusBoostDuration = nowtime + boostDuration * 60000
        let boostEndTime = new Date(nowtimePlusBoostDuration)
        console.log("ThermostatBoostHandler: Setting zonename to 'Boosted' and thermostat temperature to $boostTemp")
        this.setThermostat('Boosted' + '\n' + '(' + boostEndTime.format('HH:mm', location.timeZone) + ')', boostTemp)
        console.log("ThermostatBoostHandler: Scheduling boost to be removed in $boostDuration minutes")
        this.runIn(boostDuration * 60, boostOff)
        state.boost = true
        } else {
        console.log('ThermostatBoostHandler: Already boosted, not doing anything')
        }
        this.evaluateRoutine()
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        let thermostat = this.getThermostat()
        state.currentTemp = this.getAverageTemperature()
        thermostat.setVirtualTemperature(state.currentTemp)
        if (state.contact && state.motion || motionAwaySetpoint != null && state.presence || presenceAwaySetpoint != null || emergencySetpoint != null) {
        this.evaluateRoutine()
        } else {
        this.heatingOff()
        }
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        let thermostat = this.getThermostat()
        let presenceHere = false
        for (let presenceSensor : presences ) {
        if (presenceSensor.currentPresence == 'present') {
        console.log("PresenceHandler: Presence detected, sensor: $presenceSensor")
        presenceHere = true
        }
        }
        if (state.presence == false && presenceHere ) {
        if (presenceAwaySetpoint != null) {
        console.log('PresenceHandler: We have detected a presence and we had an away temp set, setting zone name and temp back to previous values (temporary until we check what Zone we should be in')
        this.setThermostat(state.previousZoneNamePresence, state.previousZoneTemperaturePresence)
        } else {
        console.log('PresenceHandler: We have detected a presence and but we dont have an away temp set, setting just the zone name back to previous value (temporary until we check what Zone we should be in')
        thermostat.setZoneName(state.previousZoneNamePresence)
        }
        state.presence = true
        state.presenceTime = Math.round(new Date().getTime() / 1000)
        this.unschedule(presenceAway)
        this.evaluateRoutine()
        } else {
        if (state.presence == false && presenceHere == false) {
        console.log('PresenceHandler: Already in away mode and all presence sensors are set as away - Doing nothing')
        } else {
        if (state.presence && presenceHere == false) {
        console.log('PresenceHandler: First occurance of all presence sensors being away, so scheduling/rescheduling presenceAway to run')
        state.previousZoneNamePresence = thermostat.currentValue('zoneName')
        state.previousZoneTemperaturePresence = thermostat.currentValue('thermostatSetpoint')
        if (presenceMinimumDuration > 0) {
        let presenceMinimumDurationSeconds = presenceMinimumDuration * 60
        let time = Math.round(new Date().getTime() / 1000)
        let presenceDuration = time - state.presenceTime
        if (presenceDuration < presenceMinimumDurationSeconds ) {
        console.log("PresenceHandler: Presence duration is below specified minimum - Duration: $presenceDuration Minimum: $presenceMinimumDurationSeconds")
        let presenceExtraDurationSeconds = presenceMinimumDurationSeconds - presenceDuration
        let presenceAwayTime = new Date(this.now() + presenceExtraDurationSeconds * 1000)
        thermostat.setZoneName("Presence: Away at ${presenceAwayTime.format(HH:mm)}")
        if (presenceExtraDurationSeconds > 60) {
        console.log("PresenceHandler: Presence duration is below specified minimum, scheduling for minimum period - Scheduling to run in: $presenceExtraDurationSeconds seconds")
        state.presenceAwayScheduled = true
        this.runIn(presenceExtraDurationSeconds, presenceAway)
        } else {
        console.log('PresenceHandler: Remaining minimum duration is less than 60 seconds, scheduling presenceAway to run in 60 seconds')
        state.presenceAwayScheduled = true
        this.runIn(60, presenceAway)
        }
        } else {
        console.log('PresenceHandler: Presence duration has exceeded minimum specified value, running presenceAway now')
        this.presenceAway()
        }
        } else {
        console.log('PresenceHandler: No minimum duration specified, running presenceAway now')
        this.presenceAway()
        }
        } else {
        if (state.presenceAwayScheduled & presenceHere ) {
        state.presenceAwayScheduled = false
        state.presenceTime = Math.round(new Date().getTime() / 1000)
        this.unschedule(presenceAway)
        console.log('PresenceHandler: We have detected a presence while pending, setting just the zone name back to previous value (temporary until we check what Zone we should be in')
        thermostat.setZoneName(state.previousZoneNamePresence)
        this.evaluateRoutine()
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("ContactHandler: Event occured: ${event.value}")
        let contactOpen = false
        for (let contactSensor : contacts ) {
        if (contactSensor.ContactState == 'open') {
        console.log("ContactHandler: A sensor is showing activity: $contactSensor")
        contactOpen = true
        }
        }
        if (state.contact == false && contactOpen == false) {
        console.log('ContactHandler: Contacts closed detected and we\'re in away mode. Exiting away mode: Resetting zone details and unscheduling contactOff')
        thermostat.setZoneName(state.previousZoneNameContact)
        state.contact = true
        this.unschedule(contactOff)
        this.evaluateRoutine()
        } else {
        if (state.contact == false && contactOpen ) {
        console.log('ContactHandler: Contact open and already in away mode. Doing nothing')
        } else {
        if (state.contact && contactOpen ) {
        console.log('ContactHandler: First occurance of an open contact, so scheduling/rescheduling contactOff to run from now plus duration time')
        this.runIn(contactDuration * 60, contactOff)
        } else {
        if (state.contact && contactOpen == false) {
        console.log('ContactHandler: Detected all contacts closed while in the scheduled \'away\' mode phase, cancelling schedule and returning back to normal')
        this.unschedule(contactOff)
        this.evaluateRoutine()
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("MotionHandler: Event occured: ${event.value}")
        let motionDetected = false
        for (let motionSensor : motions ) {
        if (motionSensor.ActivityStatus == 'active') {
        console.log("MotionHandler: A sensor is showing activity: $motionSensor")
        motionDetected = true
        }
        }
        if (state.motion == false && motionDetected ) {
        console.log('MotionHandler: Activity detected and we\'re in away mode. Exiting away mode: Resetting zone details and unscheduling motionOff')
        if (motionAwaySetpoint != null) {
        console.log('MotionHandler: We have detected motion and we had an away temp set, setting zone name and temperature back to previous values (temporary until we check what Zone we should be in')
        this.setThermostat(state.previousZoneNameMotion, state.previousZoneTemperatureMotion)
        } else {
        console.log('MotionHandler: We have detected motion and but we dont have an away temperature set, setting just the zone name back to previous value (temporary until we check what Zone we should be in')
        thermostat.setZoneName(state.previousZoneNameMotion)
        }
        state.motion = true
        this.unschedule(motionOff)
        this.evaluateRoutine()
        } else {
        if (state.motion == false && motionDetected == false) {
        console.log('MotionHandler: Motion not detected and already in away mode. Doing nothing')
        } else {
        if (state.motion && motionDetected == false) {
        console.log('MotionHandler: First occurance of all motion sensors being away, so scheduling/rescheduling motionOff to run from now plus duration time')
        this.runIn(motionDuration * 60, motionOff)
        } else {
        if (state.motion && motionDetected ) {
        console.log('MotionHandler: Detected motion while in the scheduled \'away\' mode phase, cancelling schedule and returning back to normal')
        this.unschedule(motionOff)
        this.evaluateRoutine()
        }
        }
        }
        }
        

	})

    .scheduledEventHandler('updateTimings', (context, event) => {
        
        let date = new Date().format('dd-MM-yy')
        if (state.current == 'on') {
        java.lang.Integer time = Math.round(new Date().getTime() / 1000) - state.lastOn
        state.todayTime = state.todayTime + time
        state.lastOn = Math.round(new Date().getTime() / 1000)
        }
        if (state.date != date ) {
        state.yesterdayTime = state.todayTime
        state.date = date
        state.todayTime = 0
        }
        thermostat.setTimings(state.todayTime, state.yesterdayTime)
        

	})

    .scheduledEventHandler('initialize', (context, event) => {
        
        this.evaluateRoutine()
        this.runIn(60, initialize)
        

	})
