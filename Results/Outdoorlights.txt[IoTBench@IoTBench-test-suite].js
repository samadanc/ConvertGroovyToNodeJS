
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this door opens...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('Turn on this light(s)...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Turn off after how many minutes?', section => {
            section.numberSetting('time').name('Enter 0 to not auto-off');

        });


        page.section('Using either on this light sensor (optional) or the local sunrise and sunset', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('');

        });


        page.section('Sunrise offset (optional)...', section => {
            section.textSetting('sunriseOffsetValue').name('HH:MM');
            section.enumSetting('sunriseOffsetDir').name('Before or After');

        });


        page.section('Sunset offset (optional)...', section => {
            section.textSetting('sunsetOffsetValue').name('HH:MM');
            section.enumSetting('sunsetOffsetDir').name('Before or After');

        });


        page.section('Zip code (optional, defaults to location coordinates when location services are enabled)...', section => {
            section.textSetting('zipCode').name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contactOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lightSensor, 'illuminanceMeasurement', 'illuminance', 'illuminanceHandler')

        context.api.schedules.schedule('astroCheck', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.openening', 'contactOpenHandler')

    })

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}, lastStatus: ${state.lastStatus}, motionStopTime: ${state.motionStopTime}")
        let lastStatus = state.lastStatus
        if (lastStatus != 'off' && event.integerValue > 50) {
        lights.off()
        state.lastStatus = 'off'
        } else {
        if (state.motionStopTime) {
        if (lastStatus != 'off') {
        let elapsed = this.now() - state.motionStopTime
        if (elapsed >= delayMinutes ? delayMinutes : 0 * 60000) {
        lights.off()
        state.lastStatus = 'off'
        }
        }
        } else {
        if (lastStatus != 'on' && event.value < 30) {
        lights.on()
        state.lastStatus = 'on'
        }
        }
        }
        

	})

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        if (this.enabled()) {
        log.trace("Turning on switches: $switches")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        } else {
        console.log('Too much light, not turning on')
        }
        if (time == 0) {
        console.log('Not gonna turn you off')
        } else {
        log.trace('Turning off soon...')
        let delay = time * 60
        this.runIn(delay, switchOff)
        }
        

	})

    .scheduledEventHandler('astroCheck', (context, event) => {
        
        let s = this.getSunriseAndSunset(['zipCode': zipCode , 'sunriseOffset': sunriseOffset , 'sunsetOffset': sunsetOffset ])
        state.riseTime = s.sunrise.time
        state.setTime = s.sunset.time
        console.log("rise: ${new Date(state.riseTime)}(${state.riseTime}), set: ${new Date(state.setTime)}(${state.setTime})")
        

	})
