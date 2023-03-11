
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor mode of which thermostat of...', section => {
            section.deviceSetting('temperatureSensor').capability(['thermostat']).name('');

        });


        page.section('Minimum time', section => {
            section.numberSetting('minTime').name('Minimum time');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Turn on things...', section => {
            section.deviceSetting('conSwitches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor, 'thermostat', 'temprature', 'tempratureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor, 'thermostat', 'thermostatMode', 'thermostatModeHandler')

    })

    .subscribedEventHandler('tempratureHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.minTime, 'number', toInteger)
    
        let difTime = new Date().time - state.lastModeChange
        console.log("$minTime $difTime $msMinTime ${state.lastTempChange}")
        log.trace("${tempratureSensor.currentvalue(thermostatMode)}")
        if (!state.lastTempChange || difTime > msMinTime ) {
        console.log("${event.displayName} temp changed to ${event.value}")
        this.checkMode(evt)
        state.lastTempChange = new Date().time
        } else {
        console.log("${event.displayName} temp changed but don't to do anything yet")
        }
        

	})

    .subscribedEventHandler('thermostatModeHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.minTime, 'number', toInteger)
    
        let difTime = new Date().time - state.lastModeChange
        console.log("$minTime $difTime $msMinTime ${state.lastModeChange} ${(difTime > msMinTime)}")
        if (!state.lastModeChange || difTime > msMinTime ) {
        console.log("${event.displayName} mode changed to ${event.value}")
        this.checkMode(evt)
        state.lastModeChange = new Date().time
        } else {
        console.log("${event.displayName} mode changed but don't to do anything yet")
        }
        

	})
