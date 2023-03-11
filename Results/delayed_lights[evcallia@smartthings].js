
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select a motion sensor', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Which Motion Sensor?');

        });


        page.section('Select light delay', section => {
            section.numberSetting('delay').name('Seconds');

        });


        page.section('Select how long after motion stops to turn lights off', section => {
            section.numberSetting('minutes').name('Minutes');

        });


        page.section('Select the number of lights you want to control', section => {
            section.numberSetting('numLights').name('Number of Lights');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("motionHandler called: $evt")
        let shouldRun = true
        if (noRunModes && location.mode in noRunModes ) {
        log.info("Hub mode set to ${location.mode} and no run modes are $noRunModes . Not running")
        shouldRun = false
        }
        if (sunNoRun && shouldRun ) {
        let sunriestAndSunset = this.getSunriseAndSunset()
        
        context.api.devices.sendCommands(context.config.motionSensor, 'motionSensor', currentState)
    
        let isAfterSunrise = motionState.date > sunriestAndSunset.sunrise && motionState.date < sunriestAndSunset.sunset
        if ('sunrise' in sunNoRun && isAfterSunrise ) {
        log.info('App set not to run after sunrise. Will not run')
        shouldRun = false
        }
        if ('sunset' in sunNoRun && !isAfterSunrise) {
        log.info('App set not to run after sunset. Will not run')
        shouldRun = false
        }
        }
        if (shouldRun) {
        if (event.value == 'active') {
        LinkedHashSet lights = settings.keySet().findAll({
        it.contains('light')
        })
        for (java.lang.Integer i = 0; i < lights.size(); i++) {
        console.log("turring on light$i")
        settings["light$i"].on()
        this.pause(1000 * delay )
        }
        } else {
        if (event.value == 'inactive') {
        this.runIn(60 * minutes , checkMotion)
        }
        }
        }
        

	})
