
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switches to turn on', section => {
            section.deviceSetting('switches').capability(['switch']).name('Choose Switches');

        });


        page.section('How many minutes to leave on?', section => {
            section.numberSetting('activeMins').name('Turn back off after');

        });


        page.section('Turn on when there is presence', section => {
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Choose presence sensors');

        });


        page.section('After I\'ve been gone at least this many minutes', section => {
            section.numberSetting('delayMins').name('I have to be gone at least');

        });


        page.section('Zip code (optional, defaults to location coordinates when location services are enabled)...', section => {
            section.textSetting('zipCode').name('Zip code');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensors, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseSunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'position', 'locationPositionChange')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunriseSunsetTimeHandler')

    })

    .subscribedEventHandler('sunriseSunsetTimeHandler', (context, event) => {
        
        this.findSunriseSunset()
        

	})

    .subscribedEventHandler('locationPositionChange', (context, event) => {
        
        this.findSunriseSunset()
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        if (event.value == 'present' && this.hasBeenGoneLongEnough(event.getDevice()) && this.isDark()) {
        console.log('Welcome Back!')
        let offSwitches = this.findOffSwitchIds()
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        this.startTimer(offSwitches)
        }
        

	})
