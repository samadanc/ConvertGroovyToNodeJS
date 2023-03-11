
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Outdoor', section => {
            section.deviceSetting('outTemp').capability(['temperatureMeasurement']).name('Outdoor Thermometer');

        });


        page.section('Indoor', section => {
            section.deviceSetting('inTemp').capability(['temperatureMeasurement']).name('Indoor Thermometer');
            section.numberSetting('minTemp').name('Minimum Indoor Temperature');
            section.deviceSetting('fans').capability(['switch']).name('Vent Fan');

        });


        page.section('Thermostat', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Thermostat');

        });


        page.section('Windows/Doors', section => {
            section.enumSetting('checkContacts').name('Check windows/doors');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Windows/Doors');

        });


        page.section('Run Time of Day', section => {
            section.timeSetting('timeBegin').name('Time of Day to start');
            section.timeSetting('timeEnd').name('Time of Day to stop');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.outTemp, 'temperatureMeasurement', 'temperature', 'checkThings')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'checkThings')

        await context.api.subscriptions.subscribeToDevices(context.config.inTemp, 'temperatureMeasurement', 'temperature', 'checkThings')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatMode', 'checkThings')

    })

    .subscribedEventHandler('checkThings', (context, event) => {
        
        let outsideTemp = settings.outTemp.currentTemperature
        let insideTemp = settings.inTemp.currentTemperature
        let thermostatMode = settings.thermostat.currentThermostatMode
        let somethingOpen = settings.checkContacts == 'No' || settings.contacts?.find({
        it.currentContact == 'open'
        })
        console.log("Inside: $insideTemp, Outside: $outsideTemp, Thermostat: $thermostatMode, Something Open: $somethingOpen")
        let now = new Date()
        let startCheck = this.timeToday(timeBegin)
        let stopCheck = this.timeToday(timeEnd)
        console.log("now: $now")
        console.log("startCheck: $startCheck")
        console.log("stopCheck: $stopCheck")
        let between = this.timeOfDayIsBetween(startCheck, stopCheck, now, location.timeZone)
        console.log("between: $between")
        let shouldRun = true
        let minoutsideTemp = outsideTemp + 3
        console.log("minoutsideTemp: $minoutsideTemp")
        if (insideTemp <= minoutsideTemp && !state.fanRunning) {
        console.log("Not running due to insideTemp: $insideTemp <= outsideTemp $outsideTemp+ 3 = $minoutsideTemp")
        shouldRun = false
        }
        if (insideTemp <= outsideTemp && state.fanRunning) {
        console.log("Not running due to insideTemp: $insideTemp <= outdoorTemp: $minoutsideTemp")
        shouldRun = false
        }
        if (insideTemp < settings.minTemp) {
        console.log('Not running due to insideTemp < minTemp')
        shouldRun = false
        }
        if (!somethingOpen) {
        console.log('Not running due to nothing open')
        shouldRun = false
        }
        if (thermostatMode != 'off' && shouldRun ) {
        console.log('Setting thermostat to OFF')
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', off)
    
        }
        if (between && shouldRun && !state.fanRunning) {
        
        context.api.devices.sendCommands(context.config.fans, 'switch', on)
    
        state.fanRunning = true
        } else {
        if (!shouldRun && state.fanRunning) {
        
        context.api.devices.sendCommands(context.config.fans, 'switch', off)
    
        state.fanRunning = false
        }
        }
        

	})
