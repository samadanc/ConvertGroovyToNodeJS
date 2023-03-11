
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


        page.section('Which switch controlls our humidifier?', section => {
            section.deviceSetting('switch2').capability(['switch']).name('');

        });


        page.section('Which switch controlls your dehumidifer or exhast fan?', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Humidity offset modifier', section => {
            section.numberSetting('humoffset1').name('Desired humidity setting offset.  By default the humidity at 40 degrees F outdoor temperature will be 45% the humidity at -20 degrees F outdoor temperature will be 15%.  This setting moves the range linearly by the number input here.');

        });


        page.section('Humidity On/Off range', section => {
            section.numberSetting('humrange').name('Desired humidifier on/off range above and below the setpoint.  Default is 1%.');

        });


        page.section('Min allowed humidity', section => {
            section.numberSetting('humMin').name('Desired minimum humidity.  Default is 45%.');

        });


        page.section('Max allowed humidity', section => {
            section.numberSetting('humMax').name('Desired maxiumum humidity.  Default is 55%.');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'scheduleHumidity')

        await context.api.subscriptions.subscribeToDevices(context.config.humidityInput, 'relativeHumidityMeasurement', 'humidity', 'humidityActivate')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch.on', 'scheduleHumidity')

    })

    .subscribedEventHandler('humidityActivate', (context, event) => {
        
        if (settings.humoffset1) {
        } else {
        settings.humoffset1 = 0
        }
        console.log("Humidity offset value is ${settings.humoffset1}")
        if (settings.humrange) {
        } else {
        settings.humrange = 1
        }
        console.log("Humidity range value is ${settings.humrange}")
        if (settings.humMin) {
        } else {
        settings.humMin = 45.toDouble()
        }
        console.log("Humidity prefered Minimum value is ${settings.humMin}")
        if (settings.humMax) {
        } else {
        settings.humMax = 55.toDouble()
        }
        console.log("Humidity prefered Maximum value is ${settings.humMax}")
        let currentHumidity = settings.humidityInput?.latestValue('humidity')
        console.log("Current Humidity is $currentHumidity")
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
        let humidityMinH = currentTemp * 0.4785714286 + 24.64285714 + settings.humrange + settings.humoffset1.toDouble
        let humidityLow3 = humidityMinH.round()
        let humidityMinL = currentTemp * 0.4785714286 + 24.64285714 - settings.humrange + settings.humoffset1.toDouble
        let humidityLow2 = humidityMinL.round()
        let humidityMaxH = currentTemp * 0.4785714286 + 24.64285714 + settings.humrange + settings.humoffset1.toDouble
        let humidityHigh2 = humidityMaxH.round()
        let humidityMaxL = currentTemp * 0.4785714286 + 24.64285714 - settings.humrange + settings.humoffset1.toDouble
        let humidityHigh3 = humidityMaxL.round()
        console.log("Low humidity range is $humidityLow3 to $humidityLow2. High Humidity range is $humidityHigh3 to $humidityHigh2")
        if (humidityLow2 > humMin ) {
        humidityLow2 = humMin - settings.humrange.toDouble
        humidityLow3 = humMin + settings.humrange.toDouble
        console.log("Low humidity range is $humidityLow2 to $humidityLow3 adjusted")
        }
        if (humidityHigh2 > humMax ) {
        humidityHigh2 = humMax - settings.humrange.toDouble
        humidityHigh3 = humMax + settings.humrange.toDouble
        console.log("High Humidity range is $humidityHigh2 to $humidityHigh3 adjusted")
        }
        if (switch2) {
        if (currentHumidity >= humidityLow3 && 'on' == switch2.currentSwitch) {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', off)
    
        console.log("Humidity is currently $currentHumidity and has risen above the current high humidity setpoint of $humidityLow3, the humidifier is off.")
        }
        if (currentHumidity <= humidityLow2 && 'off' == switch2.currentSwitch) {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', on)
    
        console.log("Humidity is currently $currentHumidity and has dropped below the current low humidity setpoint of $humidityLow2, the humidifier is on.")
        }
        }
        if (switch1) {
        if (currentHumidity >= humidityHigh3 && 'off' == switch1.currentSwitch) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        console.log("Humidity is currently $currentHumidity and has risen above the current high humidity setpoint of $humidityHigh3, the fan/dehumidifier is on.")
        }
        if (currentHumidity <= humidityHigh2 && 'on' == switch1.currentSwitch) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        console.log("Humidity is currently $currentHumidity and has dropped below the current high humidity setpoint of $humidityHigh2, the fan/dehumidifier is Off.")
        }
        }
        if (currentHumidity > humidityLow2 && currentHumidity < humidityHigh2 ) {
        console.log('Humidity is withing prefered comfortable range. Nothing to do.')
        }
        

	})

    .subscribedEventHandler('scheduleHumidity', (context, event) => {
        
        console.log('Starting 5 min refresh cycle')
        this.runEvery5Minutes(humidityActivate)
        

	})
