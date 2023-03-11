
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChanged')

    })

    .subscribedEventHandler('doorOpened', (context, event) => {
        
                let cdt = new Date(this.now())
                let sunsetSunrise = this.getSunriseAndSunset()
                let isNight = cdt >= sunsetSunrise.sunset || cdt <= sunsetSunrise.sunrise
                if (state.isSleeping) {
                    if (isNight) {
                        led.red()
                        led.setLevel(10)
                    } else {
                        led.police()
                    }
                }
            

	})

    .subscribedEventHandler('doorClosed', (context, event) => {
        
                if (state.isSleeping) {
                    led.off()
                }
            

	})

    .subscribedEventHandler('modeChanged', (context, event) => {
        
                if (event.value == sleep ) {
                    state.isSleeping = true
                } else {
                    if (event.value != sleep ) {
                        if (state.isSleeping) {
                            led.off()
                        }
                        state.isSleeping = false
                    }
                }
            

	})
