
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('ERV Switches', section => {
            section.deviceSetting('erv').capability(['switch']).name('Which ERV On/Off switch?');
            section.deviceSetting('hilo').capability(['switch']).name('Which ERV Low/High switch?');

        });


        page.section('Routine Timer Duration', section => {
            section.numberSetting('minutes').name('How Long (minutes)?');

        });


        page.section('Periodic Timer Duration', section => {
            section.numberSetting('pminutes').name('How Long (minutes < 60)?');

        });


        page.section('Outdoor Conditions', section => {
            section.deviceSetting('outdoor').capability(['relativeHumidityMeasurement']).name('Which Outdoor temp/humidity sensor?');
            section.numberSetting('dewpoint').name('Dew Point Threshold (default 70)?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.outdoor, 'relativeHumidityMeasurement', 'temperature', 'outdoorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.outdoor, 'relativeHumidityMeasurement', 'humidity', 'outdoorHandler')

        context.api.schedules.runEvery1Hour('periodicVentilation', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'routineChanged')

    })

    .subscribedEventHandler('routineChanged', (context, event) => {
        
        if (event.displayName == 'ERV Ventilation') {
        console.log("${event.descriptionText}")
        let operationTime = minutes * 60
        this.runIn(operationTime, turnOffERV)
        }
        

	})

    .subscribedEventHandler('outdoorHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.outdoor, 'relativeHumidityMeasurement', currentValue)
    
        
        context.api.devices.sendCommands(context.config.outdoor, 'relativeHumidityMeasurement', currentValue)
    
        let DP = T - 9 / 25 * 100 - RH
        console.log("Current outdoor Dew Point is $DP")
        state.dewpoint = DP
        state.outtemp = T
        state.outrh = RH
        state.lastForecast = this.now() / 1000
        state.forecastSource = 'Sensor'
        

	})

    .scheduledEventHandler('periodicVentilation', (context, event) => {
        
        let DP = this.getCurrentDewPoint()
        if (DP < this.getDewPointThreshold()) {
        this.lowSpeedERV()
        this.runIn(60 * this.findRunTime(), turnOffERV)
        } else {
        console.log('Dew Point is too high for ventilation.')
        if (erv.currentSwitch == 'on') {
        this.turnOffERV()
        }
        return false
        }
        

	})
