
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('When I arrive...', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Who?');

        });


        page.section('Turn on these lights...', section => {
            section.deviceSetting('lights').capability(['switch']).name('');
            section.numberSetting('lightDuration').name('Stay on for how many minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunriseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence.present', 'presenceHandler')

    })

    .subscribedEventHandler('sunriseHandler', (context, event) => {
        
        console.log("Sunrise evt: $evt, ${event.value}")
        let sunriseTime = new Date()
        log.info("Sunrise at $sunriseTime")
        state.afterDark = false
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("Presence evt: $evt, ${event.value}")
        if (state.afterDark) {
        switches.on()
        if (lightDuration) {
        let delayInSeconds = lightsDuration * 60
        this.runIn(delayInSeconds, lightsOffHandler)
        }
        }
        

	})

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
        console.log("Sunset evt: $evt, ${event.value}")
        let sunsetTime = new Date()
        log.info("Sunset at $sunsetTime")
        state.afterDark = true
        

	})
        console.log("{{interesting}}")


