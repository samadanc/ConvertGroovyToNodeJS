
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
            section.enumSetting('DimLevelStr').name('Dimmed or Dusk-to-Dawn Level %');
            section.enumSetting('BrightLevelStr').name('Motion-Sensed Level %');
            section.enumSetting('DelayMinStr').name('Bright Delay After Motion Stops, minutes');

        });


        page.section('Turn on lights to dimmed state based on measured light also (optional)', section => {
            section.deviceSetting('LightMeter').capability(['illuminanceMeasurement']).name('Light Meters');
            section.enumSetting('LuxSetPointStr').name('Lux level set point');

        });


        page.section('Zip code (optional, defaults to location coordinates)...', section => {
            section.textSetting('zipCode').name('Enter 5-digit ZIP code');

        });


        page.section('Sunrise offset (optional)...', section => {
            section.enumSetting('sunriseOffsetStr').name('Offset in minutes (use negative for before)');

        });


        page.section('Sunset offset (optional)...', section => {
            section.enumSetting('sunsetOffsetStr').name('Offset in minutes (use negative for before)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion.active', 'handleMotionEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion.inactive', 'handleEndMotionEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.LightMeter, 'illuminanceMeasurement', 'illuminance', 'handleLuxChange')

    })

    .subscribedEventHandler('handleLuxChange', (context, event) => {
        
        console.log('handleLuxChange()')
        state.luxMeasurement = event.integerValue
        console.log("Current lux is ${state.luxMeasurement}")
        if (state.luxMeasurement < state.LuxSetPoint) {
        if (state.ambient == 'light') {
        this.gotDark()
        }
        } else {
        if (state.ambient == 'dark' && state.sunPosition == 'up') {
        this.gotLight()
        }
        }
        

	})

    .subscribedEventHandler('handleMotionEvent', (context, event) => {
        
        console.log('handleMotionEvent() Motion detected . . . .')
        if (state.ambient == 'dark') {
        switches?.setLevel(state.BrightLevel)
        state.Level = state.BrightLevel
        this.unschedule(modeDim)
        console.log(". . . set the dimmers to level ${state.BrightLevel}")
        } else {
        console.log('. . . but its light, so do nothing')
        }
        

	})

    .subscribedEventHandler('handleEndMotionEvent', (context, event) => {
        
        console.log('handleEndMotionEvent() Motion stopped . . . .')
        if (state.ambient == 'dark') {
        switches?.setLevel(state.BrightLevel)
        state.Level = state.BrightLevel
        console.log(". . . set the dimmers to level ${state.BrightLevel} if not already there")
        this.runIn(state.DelayMin * 60, modeDim)
        } else {
        console.log('. . . but it light, so do nothing')
        }
        

	})
