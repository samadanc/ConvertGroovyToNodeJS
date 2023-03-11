
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Keys', section => {

        });


        page.section('Timing', section => {
            section.numberSetting('pollfreq').name('Frequency (mins)');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('pollWeather', delay);

    })

    .scheduledEventHandler('pollWeather', (context, event) => {
        
        let params = ['uri': "https://api.ambientweather.net/v1/devices?apiKey=$apiKey&applicationKey=$applicationKey"]
        console.log("attempting to retrieve weather from ${params.uri} ...")
        try {
        this.httpGet(params, { let resp ->
        resp.headers.each({
        console.log("response header - ${it.name}: ${it.value}")
        })
        console.log("response contentType: ${resp.contentType}")
        console.log("response data: ${resp.data}")
        resp.data.each({ let dev ->
        console.log("processing device $dev")
        let childDevice = this.getChildDevice(dev.macAddress)
        if (childDevice == null) {
        console.log("Failed to find child device ${dev.macAddress}, creating it ...")
        childDevice = this.addChildDevice('jwoodrich', 'AmbientWeather.net Station', dev.macAddress, null, ['name': dev.macAddress, 'label': dev.info.name + ' outdoor', 'completedSetup': true])
        }
        childDevice.sendEvent(['name': 'temperature', 'value': dev.lastData.tempf, 'unit': 'F'])
        this.sendEventIfFound(childDevice, 'humidity', dev.lastData['humidity'])
        this.sendEventIfFound(childDevice, 'temperatureFeelsLike', dev.lastData['feelsLike'], 'F')
        this.sendEventIfFound(childDevice, 'dewPoint', dev.lastData['dewPoint'], 'F')
        if (dev.lastData['winddir']) {
        childDevice.sendEvent(['name': 'windDirection', 'value': dev.lastData.winddir])
        childDevice.sendEvent(['name': 'windDirectionH', 'value': this.humanWindDirection(dev.lastData.winddir)])
        }
        this.sendEventIfFound(childDevice, 'windSpeed', dev.lastData['windspeedmph'], 'MPH')
        this.sendEventIfFound(childDevice, 'windGust', dev.lastData['windgustmph'], 'MPH')
        this.sendEventIfFound(childDevice, 'maxDailyGust', dev.lastData['maxdailygust'], 'MPH')
        this.sendEventIfFound(childDevice, 'lastRain', dev.lastData['lastRain'])
        this.sendEventIfFound(childDevice, 'hourlyRain', dev.lastData['hourlyrainin'], 'inches')
        this.sendEventIfFound(childDevice, 'dailyRain', dev.lastData['dailyrainin'], 'inches')
        this.sendEventIfFound(childDevice, 'weeklyRain', dev.lastData['weeklyrainin'], 'inches')
        this.sendEventIfFound(childDevice, 'monthlyRain', dev.lastData['monthlyrainin'], 'inches')
        this.sendEventIfFound(childDevice, 'totalRain', dev.lastData['totalrainin'], 'inches')
        this.sendEventIfFound(childDevice, 'barometerRelative', dev.lastData['baromrelin'])
        this.sendEventIfFound(childDevice, 'barometerAbsolute', dev.lastData['baromabsin'])
        this.sendEventIfFound(childDevice, 'ultravioletIndex', dev.lastData['uv'])
        this.sendEventIfFound(childDevice, 'solarRadiation', dev.lastData['solarradiation'])
        if (dev.lastData['tempinf']) {
        let childMac = "${dev.macAddress}in"
        childDevice = this.getChildDevice(childMac)
        if (childDevice == null) {
        console.log("Failed to find child device ${dev.macAddress}in, creating it ...")
        childDevice = this.addChildDevice('jwoodrich', 'AmbientWeather.net Station', childMac, null, ['name': childMac , 'label': dev.info.name + ' indoor', 'completedSetup': true])
        }
        childDevice.sendEvent(['name': 'temperature', 'value': dev.lastData.tempinf, 'unit': 'F'])
        this.sendEventIfFound(childDevice, 'humidity', dev.lastData['humidityin'])
        }
        })
        })
        }
        catch (let e) {
        log.error("something went wrong: $e", e)
        }
        

	})
