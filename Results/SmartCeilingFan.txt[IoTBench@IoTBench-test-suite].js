
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('There is motion here');
            section.deviceSetting('contact1').capability(['contactSensor']).name('Or this door opens');
            section.numberSetting('minutes1').name('Off after (minutes)?');

        });


        page.section('Control which fan...', section => {
            section.deviceSetting('theFan').capability(['switchLevel']).name('Fan dimmer');
            section.numberSetting('fanSlow').name('Slow speed?');
            section.numberSetting('fanMedium').name('Medium speed?');
            section.numberSetting('fanFast').name('Fast speed?');

        });


        page.section('Use these sensors... ', section => {
            section.deviceSetting('tempSensor').capability(['temperatureMeasurement']).name('Temperature Sensor');
            section.deviceSetting('humidSensor').capability(['relativeHumidityMeasurement']).name('Humidity Sensor');
            section.booleanSetting('humidBoost').name('Use Heat Index?');

        });


        page.section('Use these temp settings...', section => {
            section.numberSetting('tempSlow').name('Temp Slow?');
            section.numberSetting('tempMedium').name('Temp Medium?');
            section.numberSetting('tempFast').name('Temp Fast?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theFan, 'switchLevel', 'switch', 'fanHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'motionHandler')

        context.api.schedules.schedule('scheduleCheck', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (state.turnedOff) {
        return null
        }
        if (event.value == 'active' || event.value == 'open' || event.value == 'justChecking') {
        
        context.api.devices.sendCommands(context.config.tempSensor, 'temperatureMeasurement', round)
    
        
        context.api.devices.sendCommands(context.config.humidSensor, 'relativeHumidityMeasurement', latestValue)
    
        if (nowTemp == state.lastTemp && humidBoost && nowHumid == state.lastHumid) {
        return null
        }
        state.lastTemp = nowTemp
        state.lastHumid = nowHumid
        if (humidBoost && nowTemp > 73) {
        let heatIndex = Math.round(-42.379 + 2.04901523 * nowTemp + 10.14333127 * nowHumid - 0.22475541 * nowTemp * nowHumid - 0.00683783 * nowTemp ** 2 - 0.05481717 * nowHumid * nowHumid + 0.00122874 * nowTemp ** 2 * nowHumid + 0.00085282 * nowTemp * nowHumid ** 2 - 0.00000199 * nowTemp * nowHumid ** 2)
        console.log("Temp: $nowTemp, Humid: $nowHumid, HeatIndex: $heatIndex")
        if (heatIndex > nowTemp ) {
        nowTemp = heatIndex
        }
        }
        
        context.api.devices.sendCommands(context.config.theFan, 'switchLevel', latestValue)
    
        if (nowTemp < tempSlow && fanSpeed != 0) {
        console.log('It has cooled down, turning off the fan')
        
        context.api.devices.sendCommands(context.config.theFan, 'switchLevel', off)
    
        state.inactiveAt = null
        state.turnedOff = true
        } else {
        if (nowTemp < tempMedium && fanSpeed != fanSlow ) {
        console.log('Turning fan on Slow')
        
        context.api.devices.sendCommands(context.config.theFan, 'switchLevel', setLevel)
    
        } else {
        if (nowTemp < tempFast && fanSpeed != fanMedium ) {
        console.log('Turning fan on Medium')
        
        context.api.devices.sendCommands(context.config.theFan, 'switchLevel', setLevel)
    
        } else {
        if (fanSpeed != fanFast ) {
        console.log('Turning fan on Fast')
        
        context.api.devices.sendCommands(context.config.theFan, 'switchLevel', setLevel)
    
        }
        }
        }
        }
        if (event.value != 'justChecking') {
        state.inactiveAt = null
        }
        } else {
        if (event.value == 'closed') {
        console.log('Turning off the fan (door closed)')
        
        context.api.devices.sendCommands(context.config.theFan, 'switchLevel', off)
    
        state.lastTemp = 0
        state.lastHumid = 0
        state.inactiveAt = null
        state.turnedOff = true
        } else {
        if (event.value == 'inactive') {
        if (!state.inactiveAt) {
        state.inactiveAt = this.now()
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('fanHandler', (context, event) => {
        
        if (event.value == 'off') {
        console.log('Somebody turned off the fan')
        state.lastTemp = 0
        state.lastHumid = 0
        state.inactiveAt = this.now()
        state.turnedOff = true
        } else {
        if (event.value == 'on') {
        console.log('Somebody turned the fan back on')
        state.turnedOff = false
        state.inactiveAt = null
        state.lastTemp = 0
        state.lastHumid = 0
        }
        }
        

	})

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        console.log("schedule check, ts = ${state.inactiveAt}")
        if (state.inactiveAt) {
        let elapsed = this.now() - state.inactiveAt
        let threshold = 1000 * 60 * minutes1
        if (elapsed >= threshold ) {
        console.log('Turning off the fan (idle)')
        
        context.api.devices.sendCommands(context.config.theFan, 'switchLevel', off)
    
        state.lastTemp = 0
        state.lastHumid = 0
        state.inactiveAt = null
        state.turnedOff = false
        } else {
        console.log("${(elapsed / 60000)} minutes since motion stopped")
        let evt = ['name': 'hack', 'value': 'justChecking']
        this.motionHandler(evt)
        }
        }
        

	})
