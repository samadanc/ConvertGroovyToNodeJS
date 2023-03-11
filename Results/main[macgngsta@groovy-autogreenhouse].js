
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('What Time', section => {
            section.timeSetting('myTime').name('Time to execute');

        });


        page.section('On Which Days', section => {
            section.enumSetting('days').name('Select Days of the Week');

        });


        page.section('Select a humidity sensor', section => {
            section.deviceSetting('humiditySensor').capability(['relativeHumidityMeasurement']).name('Humidity Sensor');

        });


        page.section('Select the water pump outlet', section => {
            section.deviceSetting('waterSwitch').capability(['switch']).name('Water Pump Outlet');

        });


        page.section('Watering Threshold', section => {
            section.numberSetting('waterPeriodInSeconds').name('Water Period in Seconds:');

        });


        page.section('Humidity Thresholds', section => {
            section.numberSetting('lowHumidityThreshold').name('Enter Low Humidity:');
            section.numberSetting('highHumidityThreshold').name('Enter High Humidity:');

        });


        page.section('Select a temperature sensor', section => {
            section.deviceSetting('tempSensor').capability(['temperatureMeasurement']).name('Temperature Sensor');

        });


        page.section('Select the heater outlet', section => {
            section.deviceSetting('heaterSwitch').capability(['switch']).name('Heater Outlet');

        });


        page.section('Heating Threshold', section => {
            section.numberSetting('heatPeriodInSeconds').name('Heat Period in Seconds:');

        });


        page.section('Temperature Thresholds', section => {
            section.numberSetting('lowTempThreshold').name('Enter Low Temperature:');
            section.numberSetting('highTempThreshold').name('Enter High Temperature:');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.tempSensor, 'temperatureMeasurement', 'temperature', 'tempHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensor, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

        context.api.schedules.schedule('timeHandler', delay);

    })

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        console.log("humidityController called: $evt")
        
        context.api.devices.sendCommands(context.config.humiditySensor, 'relativeHumidityMeasurement', currentState)
    
        console.log("humidity value: ${humidityState.value}")
        if (humidityState.value <= lowHumidityThreshold ) {
        this.runWaterCycle()
        } else {
        if (humidityState.value > highHumidityTreshold ) {
        this.turnOffWater()
        }
        }
        

	})

    .subscribedEventHandler('tempHandler', (context, event) => {
        
        console.log("temperatureController called: $evt")
        
        context.api.devices.sendCommands(context.config.tempSensor, 'temperatureMeasurement', currentState)
    
        console.log("temperature value: ${tempState.value}")
        if (tempState.value <= lowTempThreshold ) {
        this.runHeaterCycle()
        } else {
        if (tempState.value > highTempTreshold ) {
        this.turnOffHeater()
        }
        }
        

	})

    .scheduledEventHandler('timeHandler', (context, event) => {
        
        let df = new java.text.SimpleDateFormat('EEEE')
        df.setTimeZone(location.timeZone)
        let day = df.format(new Date())
        
        context.api.devices.sendCommands(context.config.days, 'enum', contains)
    
        if (dayCheck) {
        console.log('running scheduled water')
        this.runWaterCycle()
        }
        

	})
