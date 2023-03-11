
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Master Switch', section => {
            section.deviceSetting('masterSwitch').capability(['switch']).name('');

        });


        page.section('Devices to turn on/off...', section => {
            section.deviceSetting('switchDevice').capability(['switch']).name('Switch?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleSecurityLights', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.masterSwitch, 'switch', 'switch', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        log.trace("$evt?.name: $evt?.value")
        let sunInfo = this.getSunriseAndSunset()
        let currentDate = new Date()
        console.log("Sunrise: ${sunInfo.sunrise}")
        console.log("Sunset: ${sunInfo.sunset}")
        console.log("Current DateTime: ${sunInfo.sunset}")
        if (currentDate.after(sunInfo.sunrise) && currentDate.before(sunInfo.sunset)) {
        switchDevice?.off()
        } else {
        switchDevice?.on()
        }
        

	})

    .scheduledEventHandler('scheduleSecurityLights', (context, event) => {
        
        let sunInfo = this.getSunriseAndSunset()
        log.info("Sunrise: ${sunInfo.sunrise}")
        log.info("Sunset: ${sunInfo.sunset}")
        this.runOnce(sunInfo.sunrise, sunriseEvent)
        this.runOnce(sunInfo.sunset, sunsetEvent)
        

	})
