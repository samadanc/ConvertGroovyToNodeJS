
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the temperature...', section => {
            section.deviceSetting('temperatureSensor1').capability(['temperatureMeasurement']).name('');

        });


        page.section('When the temperature drops below...', section => {
            section.numberSetting('belowTemperature').name('Below Temperature?');

        });


        page.section('When the temperature goes above...', section => {
            section.numberSetting('aboveTemperature').name('Above Temperature?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Seasonal Pause', section => {
            section.enumSetting('pauseForSummer').name('Pause Automation');

        });


        page.section('Turn on a heater...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Signal light - Turns on to let you know mats are on', section => {
            section.deviceSetting('signalLight').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor1, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        log.trace("temperature: ${event.value}, $evt")
        let tooCold = belowTemperature
        let tooWarm = aboveTemperature
        let mySwitch = settings.switch1
        let myState = switch1.currentSwitch
        console.log("Mat Switch is [$myState]")
        if (event.doubleValue <= tooCold ) {
        console.log('To Cold, checking to see if we already turned on switch')
        if (myState == 'off') {
        switch1?.on()
        signalLight?.on()
        console.log("Turned on [${switch1.displayName}]")
        this.send("${temperatureSensor1.displayName} is too cold, reporting a temperature of ${event.value} Turned on [${switch1.displayName}]")
        } else {
        console.log('Already turned them on')
        }
        } else {
        if (event.doubleValue >= tooWarm ) {
        console.log('To Warm, checking to see if we already turned of switch')
        if (myState == 'on') {
        switch1?.off()
        signalLight?.off()
        console.log("Turned off [${switch1.displayName}]")
        this.send("${temperatureSensor1.displayName} is too warm, reporting a temperature of ${event.value} Turned off [${switch1.displayName}]")
        } else {
        console.log('Already turned them off')
        }
        }
        }
        

	})
