
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Give this app a name?'', section => {

        });


        page.section('Humidity measurement supplied by:', section => {
            section.deviceSetting('humidityInput').capability(['relativeHumidityMeasurement']).name('');

        });


        page.section('Which unit to turn on or off?', section => {
            section.deviceSetting('switch2').capability(['switch']).name('');

        });


        page.section('Humidity offset modifier', section => {
            section.numberSetting('humoffset1').name('Desired humidity setting offset.  By default the humidity at 40 degrees F outdoor temperature will be 45% the humidity at -20 degrees F outdoor temperature will be 15%.  This setting moves the range linearly by the number input here.');

        });


        page.section('Humidity On/Off range', section => {
            section.numberSetting('humrange').name('Desired humidifier on/off range above and below the setpoint.  Default is 1%.');

        });


        page.section('Max allowed humidity', section => {
            section.numberSetting('humMax').name('Desired maxiumum humidity.  Default is 45%.');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humidityInput, 'relativeHumidityMeasurement', 'humidity', 'humidityActivate')

    })

    .subscribedEventHandler('humidityActivate', (context, event) => {
        
        if (settings.humoffset1) {
        } else {
        settings.humoffset1 = 0
        }
        if (settings.humrange) {
        } else {
        settings.humrange = 1
        }
        if (settings.humMax) {
        } else {
        settings.humMax = 45.toDouble()
        }
        let currentHumidity = settings.humidityInput?.latestValue('humidity')
        if (currentHumidity) {
        } else {
        currentHumidity = 100
        }
        let currentTemp = -30
        if (tempSupply == 'WeatherUnderground') {
        currentTemp = this.getWeatherFeature('conditions', (settings.zip as String))?.current_observation.temp_f
        } else {
        currentTemp = settings.temperatureInput?.latestValue('temperature')
        }
        if (currentTemp) {
        } else {
        if (currentTemp == 0) {
        } else {
        currentTemp = -30
        }
        }
        let humidityHigh = currentTemp * 0.4785714286 + 24.64285714 + settings.humrange + settings.humoffset1.toDouble
        let humidityHigh2 = humidityHigh.round()
        let humidityLow = currentTemp * 0.4785714286 + 24.64285714 - settings.humrange + settings.humoffset1.toDouble
        let humidityLow2 = humidityLow.round()
        if (humidityHigh2 > humMax ) {
        humidityLow2 = humMax - settings.humrange.toDouble
        humidityHigh2 = humMax + settings.humrange.toDouble
        } else {
        }
        if (currentHumidity >= humidityHigh2 && 'on' == switch2.currentSwitch) {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', off)
    
        console.log("Humidity is currently $currentHumidity and has risen above the current high humidity setpoint of $humidityHigh2, the humidifier is off.")
        } else {
        if (currentHumidity <= humidityLow2 && 'off' == switch2.currentSwitch) {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', on)
    
        console.log("Humidity is currently $currentHumidity and has dropped below the current low humidity setpoint of $humidityLow2, the humidifier is on.")
        }
        }
        

	})
