
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When any of these people arrive home:', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Turn on these lights:', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('Until one of these doors opens and closes:', section => {
            section.deviceSetting('doors').capability(['contactSensor']).name('');

        });


        page.section('Or for this many minutes (default 3):', section => {
            section.numberSetting('delay').name('minutes');

        });


        page.section('Based either on this light sensor (optional) or the local sunrise and sunset', section => {
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

        await context.api.subscriptions.subscribeToDevices(context.config.doors, 'contactSensor', 'contact', 'doorHandler')

        context.api.schedules.schedule('astroCheck', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        if (state.litUp == true) {
        console.log('lights are on')
        if (this.now() < state.offTime) {
        if (event.value == 'closed') {
        console.log('Door closed, turning off the lights')
        state.litUp = false
        this.turnOffLights()
        }
        } else {
        console.log('Door closure timed out, lights should already be off')
        state.litUp = false
        }
        }
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'present' && this.isDark()) {
        console.log("${event.displayName} has arrived after dark")
        let offDelay = delay != null ? delay * 60000 : 3 * 60000
        state.offTime = this.now() + offDelay
        this.turnOnLights()
        this.unschedule(turnOffLights)
        this.runIn(delay != null ? delay * 60 : 3 * 60, turnOffLights)
        }
        

	})

    .scheduledEventHandler('astroCheck', (context, event) => {
        
        let s = this.getSunriseAndSunset(['zipCode': zipCode , 'sunriseOffset': sunriseOffset , 'sunsetOffset': sunsetOffset ])
        state.riseTime = s.sunrise.time
        state.setTime = s.sunset.time
        console.log("rise: ${new Date(state.riseTime)}(${state.riseTime}), set: ${new Date(state.setTime)}(${state.setTime})")
        

	})
