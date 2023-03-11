
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Motion Sensor(s) you want to Use', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Detectors (leave blank for just dusk-to-dawn function)');

        });


        page.section('Select Dimmers you want to Use', section => {
            section.deviceSetting('switches').capability(['switchLevel']).name('Dimmer Switches');

        });


        page.section('Set Bright and Dim Levels and Bright Time', section => {
            section.enumSetting('DimLevelStr').name('Dimmed Level %');
            section.enumSetting('BrightLevelStr').name('Bright Level %');
            section.enumSetting('DelayMinStr').name('Bright time, minutes');

        });


        page.section('Zip code (optional, defaults to location coordinates)...', section => {
            section.textSetting('zipCode').name('Enter 5-digit ZIP code');

        });


        page.section('Sunrise offset (optional)...', section => {
            section.textSetting('sunriseOffsetValue').name('Offset amount in the format HH:MM');
            section.enumSetting('sunriseOffsetDir').name('Before or After');

        });


        page.section('Sunset offset (optional)...', section => {
            section.textSetting('sunsetOffsetValue').name('Offset amount in the format HH:MM');
            section.enumSetting('sunsetOffsetDir').name('Before or After');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion.inactive', 'handleEndMotionEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunriseSunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseSunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'position', 'locationPositionChange')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion.active', 'handleMotionEvent')

    })

    .subscribedEventHandler('sunriseSunsetTimeHandler', (context, event) => {
        
        log.trace('sunriseSunsetTimeHandler()')
        this.astroCheck()
        

	})

    .subscribedEventHandler('locationPositionChange', (context, event) => {
        
        log.trace('locationChange()')
        this.astroCheck()
        

	})

    .subscribedEventHandler('handleEndMotionEvent', (context, event) => {
        
        console.log('Motion stopped . . . .')
        if (state.sunPosition == 'down') {
        switches?.setLevel(state.BrightLevel)
        state.Level = state.BrightLevel
        console.log(". . . set the dimmers to level ${state.BrightLevel} if not already there")
        this.runIn(state.DelayMin * 60, dimOrOffafterBright)
        } else {
        console.log('. . . but sun is up, so do nothing')
        console.log(state)
        }
        

	})

    .subscribedEventHandler('handleMotionEvent', (context, event) => {
        
        console.log('Motion detected . . . .')
        if (state.sunPosition == 'down') {
        switches?.setLevel(state.BrightLevel)
        state.Level = state.BrightLevel
        console.log(". . . set the dimmers to level ${state.BrightLevel}")
        } else {
        console.log('. . . but sun is up, so do nothing')
        console.log(state)
        }
        

	})
