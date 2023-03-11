
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Enable / Disable the following functionality:', section => {
            section.booleanSetting('app_enabled').name('Auto Humidity Vent');
            section.booleanSetting('fan_control_enabled').name('Vent Fan Control');

        });


        page.section('Choose a humidity sensor...', section => {
            section.deviceSetting('humidity_sensor').capability(['relativeHumidityMeasurement']).name('Humidity Sensor');

        });


        page.section('Enter the relative humudity level (%) above which the vent fans will activate:', section => {
            section.numberSetting('humidity_a').name('Humidity Activation Level');

        });


        page.section('Enter the relative humudity level (%) below which the vent fans will deactivate:', section => {
            section.numberSetting('humidity_d').name('Humidity Deactivation Level');

        });


        page.section('Select the vent fans to control...', section => {
            section.deviceSetting('fans').capability(['switch']).name('Vent Fans');

        });


        page.section('Select the vent fan energy meters to monitor...', section => {
            section.deviceSetting('emeters').capability(['energyMeter']).name('Energy Meters');

        });


        page.section('Set notification options:', section => {
            section.booleanSetting('sendPushMessage').name('Push notifications');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humidity_sensor, 'relativeHumidityMeasurement', 'humidity', 'handleThings')

    })

    .subscribedEventHandler('handleThings', (context, event) => {
        
        console.log('handleThings()')
        if (evt) {
        console.log("${event.descriptionText}")
        }
        let h = ((0.0) as BigDecimal)
        if (settings.app_enabled) {
        h = settings.humidity_sensor.currentValue
        }
        console.log("Humidity: $h%, Activate: $humidity_a%, Deactivate: $humidity_d%")
        let activateFans = false
        let deactivateFans = false
        if (settings.app_enabled) {
        if (state.fansOn) {
        if (h > humidity_d ) {
        console.log("Humidity not sufficient to deactivate vent fans: $h > $humidity_d")
        } else {
        console.log("Humidity sufficient to deactivate vent fans: $h <= $humidity_d")
        deactivateFans = true
        }
        } else {
        if (h < humidity_a ) {
        console.log("Humidity not sufficient to activate vent fans: $h < $humidity_a")
        } else {
        console.log("Humidity sufficient to activate vent fans: $h >= $humidity_a")
        activateFans = true
        }
        }
        }
        if (activateFans) {
        this.set_fans(true)
        }
        if (deactivateFans) {
        this.set_fans(false)
        }
        

	})
