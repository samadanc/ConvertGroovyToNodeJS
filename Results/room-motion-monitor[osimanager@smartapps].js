
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s movement...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Monitor the temperature...', section => {
            section.deviceSetting('temperatureSensor1').capability(['temperatureMeasurement']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.active', 'motionActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor1, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        console.log("${motion1.displayName} detected motion in room ")
        let params = ['uri': "https://osiitservices.com/osiportal/pub/rest/monitorcapture.xhtml?room=${motion1.displayName}&motion=yes"]
        try {
        this.httpPost(params, { let resp ->
        resp.headers.each({
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
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        console.log("door sensor temperature event: ${event.value}, ${temperatureSensor1.displayName}")
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
        let params = ['uri': "https://osiitservices.com/osiportal/pub/rest/monitorcapture.xhtml?room=${temperatureSensor1.displayName}&temp=${event.value}"]
        let params2 = ['uri': "https://osiitservices.com/osiportal/pub/rest/monitorcapture.xhtml?room=${temperatureSensor1.displayName}&battery=${motion1.currentBattery}"]
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
        this.httpPost(params2, { let resp ->
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
