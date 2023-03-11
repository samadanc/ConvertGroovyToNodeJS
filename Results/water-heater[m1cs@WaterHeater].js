
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('At a Time...', section => {
            section.timeSetting('startTime').name('Turn On Time?');

        });


        page.section('Check the water temperature...', section => {
            section.deviceSetting('temperatureSensor1').capability(['temperatureMeasurement']).name('');

        });


        page.section('If the temperature is below...', section => {
            section.numberSetting('minimumTemperature').name('Minimum Temperature?');

        });


        page.section('And the Boiler is not on...', section => {
            section.deviceSetting('thermostat1').capability(['thermostat']).name('Thermostat?');

        });


        page.section('Turn on the Immersion Heater...', section => {
            section.deviceSetting('immersion1').capability(['switch']).name('');

        });


        page.section('Or turn on the boiler if the house temperature is below...', section => {
            section.numberSetting('roomMinimumTemperature').name('Minimum Temperature?');

        });


        page.section('For a duration of...', section => {
            section.numberSetting('duration').name('Minutes?');

        });


        page.section('Or until the water temperature reaches...', section => {
            section.numberSetting('targetTemperature').name('Target Temperature?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('startTimerCallback', delay);

    })

    .scheduledEventHandler('startTimerCallback', (context, event) => {
        
        let currentTemp = temperatureSensor1.temperatureState.doubleValue
        let minTemp = minimumTemperature
        let myImmersion = settings.immersion1
        let myBoiler = settings.thermostat1
        let tempScale = location.temperatureScale ? location.temperatureScale : 'C'
        state.startTemperature = currentTemp
        if (currentTemp <= minTemp ) {
        console.log("Water Temperature ($currentTemp) is below minimum water temperature ($minTemp)")
        let boilerState = thermostat1?.currentValue('thermostatOperatingState')
        console.log("Boiler is currently: $boilerState")
        let roomTemperature = thermostat1?.temperatureState.doubleValue
        console.log("Room temperature is currently: $roomTemperature")
        if (roomTemperature != null && roomMinimumTemperature != null && roomTemperature <= roomMinimumTemperature ) {
        console.log("Room Temperature ($roomTemperature) is below minimum room temperature ($roomMinimumTemperature)")
        console.log('We want to use the boiler instead of the immersion.')
        this.send("Turning on $myBoiler because ${temperatureSensor1.displayName} is reporting a temperature of $roomTemperature$tempScale")
        this.turnOnBoiler()
        this.subscribe(temperatureSensor1, 'temperature', temperatureHandlerBoiler)
        let MinuteDelay = 60 * duration
        this.runIn(MinuteDelay, boilerTimerExpired)
        this.turnOffImmersion()
        } else {
        if (boilerState == null || boilerState == 'idle') {
        this.send("Turning on $myImmersion because ${temperatureSensor1.displayName} is reporting a temperature of $currentTemp$tempScale")
        this.turnOnImmersion()
        this.subscribe(temperatureSensor1, 'temperature', temperatureHandlerImmersion)
        let MinuteDelay = 60 * duration
        this.runIn(MinuteDelay, immersionTimerExpired)
        } else {
        console.log("$myBoiler is already heating the water - no need for $myImmersion")
        this.send("$myBoiler is already heating the water - no need for $myImmersion")
        }
        }
        } else {
        console.log("Water Temperature is above $minTemp:  no heating required")
        this.send("Water Temperature is above $minTemp:  no heating required ( $currentTemp$tempScale )")
        }
        

	})
