
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Temperature Sensor to Monitor:', section => {
            section.deviceSetting('temperatureSensor1').capability(['temperatureMeasurement']).name('Sensor?');

        });


        page.section('Adafruit IO Information', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor1, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        log.trace("temperature: ${event.value}, $evt")
        let user = Username
        let key = AIOKey
        let feed = FeedName
        let temp = event.value
        if (event.doubleValue) {
        console.log("Received temperature update: ${event.value}")
        let params = ['uri': "https://io.adafruit.com/api/feeds/$feed/data.json", 'headers': ['X-AIO-Key': key , 'Content-Type': 'application/json'], 'body': ['value': temp ]]
        try {
        this.httpPostJson(params, { let resp ->
        resp.headers.each({
        console.log("${it.name} : ${it.value}")
        })
        console.log("response contentType: ${resp.contentType}")
        })
        }
        catch (let e) {
        console.log("something went wrong: $e")
        }
        }
        

	})
