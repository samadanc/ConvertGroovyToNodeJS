
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('['hideWhenEmpty': true], 'Choose Temperature & Humidity sensor(s)\nAvg will be used for multiple sensors', section => {
            section.deviceSetting('sensors').capability(['temperatureMeasurement']).name('Temperature Sensor(s)');
            section.deviceSetting('humidity').capability(['relativeHumidityMeasurement']).name('Humidity Sensor(s)');
            section.deviceSetting('contact').capability(['contactSensor']).name('Must be closed to heat/cool');

        });


        page.section('Select Heating / Cooling outlet(s)\n', section => {
            section.booleanSetting('control').name('Exclusive Control');
            section.deviceSetting('heaters').capability(['switch']).name('Heating Outlet(s)');
            section.deviceSetting('coolers').capability(['switch']).name('Cooling Outlet(s)');

        });


        page.section('Operating Parameters', section => {
            section.enumSetting('units').name('Units (°C / °F)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.coolers, 'switch', 'switch', 'coolerHandler')

        context.api.schedules.schedule('updateTimings', delay);

        context.api.schedules.schedule('dayRollover', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.humidity, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.heaters, 'switch', 'switch', 'heaterHandler')

    })

    .subscribedEventHandler('coolerHandler', (context, event) => {
        
        if (atomicState.lastState == 'cooling' && event.value == 'off' && control ) {
        event.device.on()
        } else {
        if (atomicState.lastState != 'cooling' && event.value == 'on' && control ) {
        event.device.off()
        }
        }
        

	})

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        this.getThermostat().setHumidity(((this.getAverageHumidity()) as Integer))
        

	})

    .subscribedEventHandler('heaterHandler', (context, event) => {
        
        if (atomicState.lastState == 'heating' && event.value == 'off' && control ) {
        event.device.on()
        } else {
        if (atomicState.lastState != 'heating' && event.value == 'on' && control ) {
        event.device.off()
        }
        }
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        this.getThermostat().setTemperature(this.getAverageTemperature())
        

	})

    .subscribedEventHandler('thermostatOperatingStateHandler', (context, event) => {
        
        atomicState.lastState = event.value
        console.log("APP: Operating Mode is : ${atomicState.lastState}")
        if
        this.sendPush("Sensor $contact is still OPEN. You have chosen to continue ${event.value} with $contact:open ")
        }
        switch (event.value) {
        case 'heating':
        this.off(coolers)
        this.on(heaters)
        break
        case 'cooling':
        this.off(heaters)
        this.on(coolers)
        break
        case 'idle':
        this.off(coolers)
        this.off(heaters)
        break
        default:
        break
        }
        

	})

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        event.value == 'closed' ? this.getThermostat().changeState('restore') : this.runIn(60, recheck)
        

	})

    .scheduledEventHandler('dayRollover', (context, event) => {
        
        let date = new Date()
        if (atomicState.date != date.format('dd-MM-yy', location.timeZone)) {
        if (atomicState.current == 'on') {
        if (atomicState.lastOn == 0) {
        atomicState.lastOn = Math.round(date.getTime() / 1000)
        }
        atomicState.todayTime = atomicState.todayTime + Math.round(date.getTime() / 1000) - atomicState.lastOn
        atomicState.lastOn = Math.round(date.getTime() / 1000)
        }
        atomicState.yesterdayTime = atomicState.todayTime
        atomicState.date = date.format('dd-MM-yy', location.timeZone)
        atomicState.todayTime = 0
        this.getThermostat().setTimings(((int) atomicState.todayTime), ((int) atomicState.yesterdayTime))
        }
        

	})

    .scheduledEventHandler('updateTimings', (context, event) => {
        
        let date = new Date()
        if (atomicState.current == 'on') {
        if (atomicState.lastOn == 0) {
        atomicState.lastOn = Math.round(date.getTime() / 1000)
        }
        atomicState.todayTime = atomicState.todayTime + Math.round(date.getTime() / 1000) - atomicState.lastOn
        atomicState.lastOn = Math.round(date.getTime() / 1000)
        this.getThermostat().setTimings(((int) atomicState.todayTime), ((int) atomicState.yesterdayTime))
        }
        

	})
