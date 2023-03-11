
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Schedule Name', section => {
            section.textSetting('zoneName').name('Name of this Zone:');

        });


        page.section('Temperature Sensors', section => {
            section.deviceSetting('inTemp').capability(['temperatureMeasurement']).name('Indoor Thermometer');

        });


        page.section('Smart Vents...', section => {
            section.deviceSetting('vents').capability(['switch']).name('Vents');
            section.numberSetting('ventClosedLevel').name('Closed Level?');

        });


        page.section('Zone Temperature Adjustments...', section => {
            section.numberSetting('zoneAdjust').name('Temperature Adjustment:');

        });


        page.section('Room Occupancy...', section => {
            section.numberSetting('inactiveAdjust').name('Temperature Adjustment:');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Presence Devices');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Motion Sensors');
            section.numberSetting('inactiveDelay').name('No Motion delay:');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('poll', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion.active', 'activeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.inTemp, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion.inactive', 'inactiveHandler')

    })

    .subscribedEventHandler('zoneVentModeHandler', (context, event) => {
        
        state.ventMode = event.value
        console.log("Vent Mode Event: ${event.name}, ${state.ventMode}")
        this.processVents()
        

	})

    .subscribedEventHandler('zoneSetpointHandler', (context, event) => {
        
        state.setPoint = (event.value as Double)
        let zoneAdj = this.getZoneAdjustment()
        state.tempOffset = state.setPoint - state.zoneBase + zoneAdj
        console.log("Setpoint Event: ${event.name}, ${event.value} - new Offset ${state.tempOffset}")
        parent.zonePoll('poll')
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        let sum = 0
        let count = 0
        let average = 0
        let temp = 0
        if (settings.inTemp) {
        for (let sensor : settings.inTemp) {
        temp = sensor.currentTemperature
        if (temp) {
        count += 1
        sum += temp
        } else {
        console.log('got Null temp')
        }
        }
        average = Math.round(sum / count * 10.0) / 10.0
        } else {
        console.log('No temp Sensors available set average to 60')
        average = 60.0
        }
        state.temperature = average
        console.log("average: $average")
        let zoneTile = this.getChildDevice("${app.id}")
        if (zoneTile) {
        console.log("Set Tile Temp to: $average")
        zoneTile.setTemperature(average)
        }
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("presence event tHandler: ${event.value}")
        this.roomOccupancyHandler()
        this.processVents()
        

	})

    .subscribedEventHandler('zoneActiveHandler', (context, event) => {
        
        console.log("Zone Control Mode Event: ${event.name}, ${event.value}")
        state.zoneControlMode = event.value
        this.setThermostatMode(state.mode)
        this.setOperatingState(state.opState)
        this.processVents()
        

	})

    .subscribedEventHandler('activeHandler', (context, event) => {
        
        log.trace("active handler fired via [${event.displayName}] UTC: ${event.date.format(yyyy-MM-dd HH:mm:ss)}")
        if (state.lastMotion == null) {
        state.lastMotion = this.now()
        this.roomOccupancyHandler()
        this.processVents()
        } else {
        state.lastMotion = this.now()
        }
        

	})

    .subscribedEventHandler('inactiveHandler', (context, event) => {
        
        

	})

    .scheduledEventHandler('poll', (context, event) => {
        
        this.temperatureHandler()
        this.roomOccupancyHandler()
        this.processVents()
        

	})
