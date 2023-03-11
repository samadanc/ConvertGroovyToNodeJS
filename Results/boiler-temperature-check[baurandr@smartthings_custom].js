
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Notify if temperatures are below this value.', section => {
            section.numberSetting('temperature1').name('Degrees F');

        });


        page.section('Notify if there hasn\'t been a temperature reading within this many minutes', section => {
            section.numberSetting('minutes1').name('Minutes');

        });


        page.section('Send a text message to this number (optional)', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery15Minutes('checkTemperatures', delay);

    })

    .scheduledEventHandler('checkTemperatures', (context, event) => {
        
        let params = ['uri': 'http://baurfam.com/exportBoilerTemps']
        try {
        this.httpGet(params, { let resp ->
        let maxBoilerOut = resp.data.maxBoilerOut
        let maxBoilerIn = resp.data.maxBoilerIn
        let lastTempReadTime = resp.data.lastTempReadTime
        java.lang.Long lastReadTime = new Date().parse('yyy-MM-dd HH:mm:ss', lastTempReadTime).getTime()
        let curTime = new Date()
        let timeZone = location.getTimeZone()
        let dST = timeZone.inDaylightTime(curTime)
        let dstOffset = 0
        if (dST) {
        dstOffset = 60 * 60 * 1000
        }
        java.lang.Long curTimeMs = curTime.getTime() + location.timeZone.rawOffset + dstOffset
        let elapsed = curTimeMs - lastReadTime
        let threshold = 1000 * 60 * minutes1
        if (elapsed > threshold ) {
        this.sendSms(phone, 'No recent boiler temp readings')
        }
        let dblVal = Math.round(Double.parseDouble(maxBoilerOut))
        let intmaxBoilerOut = dblVal.toInteger()
        dblVal = Math.round(Double.parseDouble(maxBoilerIn))
        let intmaxBoilerIn = dblVal.toInteger()
        if (intmaxBoilerOut < temperature1 && intmaxBoilerIn < temperature1 ) {
        this.sendSms(phone, "Boiler temps low - BoilerOut: $maxBoilerOut BoilerIn: $maxBoilerIn")
        }
        console.log("maxBoilerOut: $maxBoilerOut, maxBoilerIn: $maxBoilerIn, Temp Limit: $temperature1")
        console.log("Time since last reading: $elapsed ms")
        })
        }
        catch (let e) {
        log.error("Something went wrong with boiler HTTP Get: $e")
        this.sendSms(phone, "Something went wrong with boiler HTTP Get: $e")
        }
        

	})
