
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunriseSunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseSunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'position', 'locationPositionChange')

    })

    .subscribedEventHandler('lightsHandler', (context, event) => {
        
        console.log("Lights Handler ${event.name}: ${event.value}")
        if (event.value == 'on') {
        console.log("Lights: $lights now ON.")
        this.unschedule(turnOffLights)
        state.lightsState = 'on'
        } else {
        if (event.value == 'off') {
        console.log("Lights: $lights now OFF.")
        this.unschedule(turnOffLights)
        state.lightsState = 'off'
        }
        }
        

	})

    .subscribedEventHandler('locationPositionChange', (context, event) => {
        
        log.trace('locationChange()')
        this.astroCheck()
        

	})

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}, lastStatus lights: ${state.lightsState}, lastStatus dimmers: ${state.dimmersState}, motionStopTime: ${state.motionStopTime}")
        this.unschedule(turnOffLights)
        this.unschedule(turnOffDimmers)
        if (event.integerValue > 999) {
        console.log('Lights and dimmers will turn OFF because illuminance is superior to 999 lux...')
        if (lights != null && lights != '') {
        console.log("Lights: $lights will turn OFF...")
        this.turnOffLights()
        }
        if (dimmers != null && dimmers != '') {
        console.log("Dimmers: $dimmers will turn OFF...")
        this.turnOffDimmers()
        }
        } else {
        if (event.integerValue > luxLevel != null && luxLevel != '' ? luxLevel : 50) {
        console.log("Lights and dimmers will turn OFF because illuminance is superior to $luxLevel lux...")
        if (lights != null && lights != '') {
        console.log("Lights: $lights will turn OFF...")
        this.turnOffLights()
        }
        if (dimmers != null && dimmers != '') {
        console.log("Dimmers: $dimmers will turn OFF...")
        this.turnOffDimmers()
        }
        }
        }
        

	})

    .subscribedEventHandler('dimmersHandler', (context, event) => {
        
        console.log("Dimmer Handler ${event.name}: ${event.value}")
        if (event.value == 'on') {
        console.log("Dimmers: $dimmers now ON.")
        this.unschedule(turnOffDimmers)
        state.dimmersState = 'on'
        } else {
        if (event.value == 'off') {
        console.log("Dimmers: $dimmers now OFF.")
        this.unschedule(turnOffDimmers)
        state.dimmersState = 'off'
        }
        }
        

	})

    .subscribedEventHandler('sunriseSunsetTimeHandler', (context, event) => {
        
        state.lastSunriseSunsetEvent = this.now()
        console.log("SmartNightlight.sunriseSunsetTimeHandler(${app.id})")
        this.astroCheck()
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'active') {
        this.unschedule(turnOffLights)
        this.unschedule(turnOffDimmers)
        if (dark == true && sun == true) {
        if (darkOk == true && sunOk == true) {
        console.log("Lights and Dimmers will turn ON because $motionSensor detected motion and $lightSensor was dark or because $motionSensor detected motion between sunset and sunrise...")
        if (lights != null && lights != '') {
        console.log("Lights: $lights will turn ON...")
        this.turnOnLights()
        }
        if (dimmers != null && dimmers != '') {
        console.log("Dimmers: $dimmers will turn ON...")
        this.turnOnDimmers()
        }
        } else {
        if (darkOk == true && sunOk != true) {
        console.log("Lights and Dimmers will turn ON because $motionSensor detected motion and $lightSensor was dark...")
        if (lights != null && lights != '') {
        console.log("Lights: $lights will turn ON...")
        this.turnOnLights()
        }
        if (dimmers != null && dimmers != '') {
        console.log("Dimmers: $dimmers will turn ON...")
        this.turnOnDimmers()
        }
        } else {
        if (darkOk != true && sunOk == true) {
        console.log("Lights and dimmers will turn ON because $motionSensor detected motion between sunset and sunrise...")
        if (lights != null && lights != '') {
        console.log("Lights: $lights will turn ON...")
        this.turnOnLights()
        }
        if (dimmers != null && dimmers != '') {
        console.log("Dimmers: $dimmers will turn ON...")
        this.turnOnDimmers()
        }
        } else {
        console.log("Lights and dimmers will not turn ON because $lightSensor is too bright or because time not between sunset and surise.")
        }
        }
        }
        } else {
        if (dark == true && sun != true) {
        if (darkOk == true) {
        console.log("Lights and dimmers will turn ON because $motionSensor detected motion and $lightSensor was dark...")
        if (lights != null && lights != '') {
        console.log("Lights: $lights will turn ON...")
        this.turnOnLights()
        }
        if (dimmers != null && dimmers != '') {
        console.log("Dimmers: $dimmers will turn ON...")
        this.turnOnDimmers()
        }
        } else {
        console.log("Lights and dimmers will not turn ON because $lightSensor is too bright.")
        }
        } else {
        if (dark != true && sun == true) {
        if (sunOk == true) {
        console.log("Lights and dimmers will turn ON because $motionSensor detected motion between sunset and sunrise...")
        if (lights != null && lights != '') {
        console.log("Lights: $lights will turn ON...")
        this.turnOnLights()
        }
        if (dimmers != null && dimmers != '') {
        console.log("Dimmers: $dimmers will turn ON...")
        this.turnOnDimmers()
        }
        } else {
        console.log('Lights and dimmers will not turn ON because time not between sunset and surise.')
        }
        } else {
        if (dark != true && sun != true) {
        console.log("Lights and dimmers will turn ON because $motionSensor detected motion...")
        if (lights != null && lights != '') {
        console.log("Lights: $lights will turn ON...")
        this.turnOnLights()
        }
        if (dimmers != null && dimmers != '') {
        console.log("Dimmers: $dimmers will turn ON...")
        this.turnOnDimmers()
        }
        }
        }
        }
        }
        } else {
        if (event.value == 'inactive') {
        this.unschedule(turnOffLights)
        this.unschedule(turnOffDimmers)
        if (state.lightsState != 'off' || state.dimmersState != 'off') {
        console.log('Lights and/or dimmers are not OFF.')
        if (delayMinutes) {
        let delay = delayMinutes * 60
        if (dark == true && sun == true) {
        console.log("Lights and dimmers will turn OFF in $delayMinutes minute(s) after turning ON when dark or between sunset and sunrise...")
        if (lights != null && lights != '') {
        console.log("Lights: $lights will turn OFF in $delayMinutes minute(s)...")
        this.runIn(delay, turnOffLights)
        }
        if (dimmers != null && dimmers != '') {
        console.log("Dimmers: $dimmers will turn OFF in $delayMinutes minute(s)...")
        this.runIn(delay, turnOffDimmers)
        }
        } else {
        if (dark == true && sun != true) {
        console.log("Lights and dimmers will turn OFF in $delayMinutes minute(s) after turning ON when dark...")
        if (lights != null && lights != '') {
        console.log("Lights: $lights will turn OFF in $delayMinutes minute(s)...")
        this.runIn(delay, turnOffLights)
        }
        if (dimmers != null && dimmers != '') {
        console.log("Dimmers: $dimmers will turn OFF in $delayMinutes minute(s)...")
        this.runIn(delay, turnOffDimmers)
        }
        } else {
        if (dark != true && sun == true) {
        console.log("Lights and dimmers will turn OFF in $delayMinutes minute(s) between sunset and sunrise...")
        if (lights != null && lights != '') {
        console.log("Lights: $lights will turn OFF in $delayMinutes minute(s)...")
        this.runIn(delay, turnOffLights)
        }
        if (dimmers != null && dimmers != '') {
        console.log("Dimmers: $dimmers will turn OFF in $delayMinutes minute(s)...")
        this.runIn(delay, turnOffDimmers)
        }
        } else {
        if (dark != true && sun != true) {
        console.log("Lights and dimmers will turn OFF in $delayMinutes minute(s)...")
        if (lights != null && lights != '') {
        console.log("Lights: $lights will turn OFF in $delayMinutes minute(s)...")
        this.runIn(delay, turnOffLights)
        }
        if (dimmers != null && dimmers != '') {
        console.log("Dimmers: $dimmers will turn OFF in $delayMinutes minute(s)...")
        this.runIn(delay, turnOffDimmers)
        }
        }
        }
        }
        }
        } else {
        console.log('Lights and dimmers will stay ON because no turn OFF delay was set...')
        }
        } else {
        if (state.lightsState == 'off' && state.dimmersState == 'off') {
        console.log("Lights and dimmers are already OFF and will not turn OFF in $delayMinutes minute(s).")
        }
        }
        }
        }
        

	})
