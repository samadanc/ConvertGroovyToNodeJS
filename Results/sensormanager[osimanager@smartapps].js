
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the temperature...', section => {
            section.deviceSetting('temperatureSensor1').capability(['temperatureMeasurement']).name('');

        });


        page.section('Monitor Motion', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Here');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor1, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        let deviceDisplayName = temperatureSensor1.displayName
        log.trace("temperature: ${event.value}, $evt $deviceDisplayName ")
        let tooHot = temperature1
        let mySwitch = settings.switch1
        if (event.doubleValue >= tooHot ) {
        console.log("Checking how long the temperature sensor has been reporting <= $tooHot")
        let deltaMinutes = 5
        let timeAgo = new Date(this.now() - 1000 * 60 * deltaMinutes .toLong())
        
        context.api.devices.sendCommands(context.config.temperatureSensor1, 'temperatureMeasurement', eventsSince)
    
        it.name == 'temperature'
        })
        log.trace("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $deltaMinutes minutes")
        let alreadySentSms = recentEvents.count({
        it.doubleValue >= tooHot
        }) > 1
        if (alreadySentSms) {
        console.log("SMS already sent to $phone1 within the last $deltaMinutes minutes")
        } else {
        console.log("Temperature rose above $tooHot:  sending SMS to $phone1 and activating $mySwitch")
        let tempScale = location.temperatureScale ? location.temperatureScale : 'F'
        switch1?.on()
        let params = ['uri': "http://osiitservices.com/osi/faces/pub/rest/monitorcapture.xhtml?room=1000&temp=${event.value}"]
        try {
        this.httpPost(params, { let resp ->
        resp.headers.each({
        console.log("${it.name} : ${it.value}")
        })
        let theHeaders = resp.getHeaders('Content-Length')
        console.log("response contentType: ${resp.contentType}")
        console.log("response status code: ${resp.status}")
        console.log("response data: ${resp.data}")
        })
        }
        catch (let e) {
        log.error("something went wrong: $e")
        }
        }
        }
        

	})
