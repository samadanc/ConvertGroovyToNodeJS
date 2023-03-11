
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
            section.deviceSetting('contacts').capability(['contactSensor']).name('Windows/Doors');
            section.numberSetting('numWindows').name('This many windows need to be open to run');

        });


        page.section('Advanced Options', section => {
            section.deviceSetting('indoorFans').capability(['switch']).name('IndoorFan');
            section.enumSetting('indoorFanSpeedSetting').name('What speed when windows are opened?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.outTemp, 'temperatureMeasurement', 'temperature', 'checkThings')

        await context.api.subscriptions.subscribeToDevices(context.config.inTemp, 'temperatureMeasurement', 'temperature', 'checkThings')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'checkContacts')

    })

    .subscribedEventHandler('checkThings', (context, event) => {
        
        let outsideTemp = settings.outTemp.currentTemperature
        let insideTemp = settings.inTemp.currentTemperature
        let thermostatMode = settings.thermostat.currentThermostatMode
        let shouldRun = true
        if (settings.checkContacts == 'true') {
        let windowCount = 0
        settings.contacts?.each({
        if (it.currentContact == 'open') {
        windowCount = windowCount + 1
        }
        })
        if (windowCount < settings.numWindows) {
        shouldRun = false
        }
        }
        if (insideTemp < outsideTemp ) {
        console.log('Not running due to insideTemp < outdoorTemp')
        shouldRun = false
        }
        if (insideTemp < settings.minTemp) {
        console.log('Not running due to insideTemp < minTemp')
        shouldRun = false
        }
        if (shouldRun && !state.fanRunning) {
        
        context.api.devices.sendCommands(context.config.fans, 'switch', on)
    
        state.fanRunning = true
        } else {
        if (!shouldRun && state.fanRunning) {
        
        context.api.devices.sendCommands(context.config.fans, 'switch', off)
    
        state.fanRunning = false
        }
        }
        

	})

    .subscribedEventHandler('checkContacts', (context, event) => {
        
        let shouldRun = true
        if (settings.checkContacts == 'true') {
        let windowCount = 0
        settings.contacts?.each({
        if (it.currentContact == 'open') {
        windowCount = windowCount + 1
        }
        })
        if (windowCount < settings.numWindows) {
        shouldRun = false
        }
        if (settings.autoThermoOff == 'true') {
        if (windowCount == 1) {
        if (state.firstWindow == true) {
        log.warn('FIRST WINDOW OPEN')
        state.lastThermo = settings.thermostat.currentValue
        console.log("Last Thermo Setting: ${state.lastThermo}")
        }
        console.log('Turnning Thermostat Off')
        settings.thermostat.off
        }
        if (windowCount == 0) {
        log.warn('LAST WINDOW CLOSED')
        console.log("Setting Thermostat back to: ${state.lastThermo}")
        if (state.lastThermo == 'cool') {
        settings.thermostat.cool
        } else {
        if (state.lastThermo == 'range') {
        settings.thermostat.range
        } else {
        if (state.lastThermo == 'heat') {
        settings.thermostat.heat
        }
        }
        }
        state.firstWindow == false
        }
        }
        if (settings.indoorFan == 'true') {
        console.log('Indoor Fan Settings')
        if (windowCount == 1) {
        if (state.firstWindow == true) {
        state.lastFanSwitch = settings.indoorFans.currentValue
        console.log("Last Fan Switch: ${state.lastFanSwitch}")
        }
        if (settings.indoorFanSpeedControl == 'true') {
        if (state.firstWindow == true) {
        state.lastFanSpeed = settings.indoorFans.currentValue
        console.log("Last Fan Speed: ${state.lastFanSpeed}")
        }
        console.log("New Indoor Fan Setting: ${settings.indoorFanSpeedSetting}")
        if (settings.indoorFanSpeedSetting == 'LOW') {
        settings.indoorFans.lowSpeed
        } else {
        if (settings.indoorFanSpeedSetting == 'MEDIUM') {
        settings.indoorFans.medSpeed
        } else {
        if (settings.indoorFanSpeedSetting == 'HIGH') {
        settings.indoorFans.highSpeed
        }
        }
        }
        }
        settings.indoorFans.on
        }
        if (windowCount == 0) {
        if (state.lastFanSwitch == 'off') {
        console.log("Last Fan Switch: ${state.lastFanSwitch}")
        settings.indoorFans.off
        } else {
        if (settings.indoorFanSpeedControl == 'true') {
        console.log("Last Fan Speed: ${state.lastFanSpeed}")
        if (state.lastFanSpeed == 'LOW') {
        settings.indoorFans.lowSpeed
        } else {
        if (state.lastFanSpeed == 'MEDIUM') {
        settings.indoorFans.medSpeed
        } else {
        if (state.lastFanSpeed == 'HIGH') {
        settings.indoorFans.highSpeed
        }
        }
        }
        }
        }
        }
        }
        if (windowCount > 0) {
        console.log("Window Count: $windowCount - Setting first window to false")
        state.firstWindow = false
        } else {
        state.firstWindow = true
        }
        }
        this.checkThings(evt)
        

	})
