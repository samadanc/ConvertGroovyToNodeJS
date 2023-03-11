
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there is movement here:', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Turn ON These Dimmers', section => {
            section.deviceSetting('Dimswitches').capability(['switchLevel']).name('');
            section.numberSetting('BrightLevel').name('Dimmer Level %1-99 (OPTIONAL) Zero for no dimming');

        });


        page.section('Turn ON Switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Unless there has been movement within the past', section => {
            section.numberSetting('minutes1').name('Minutes?');

        });


        page.section('And it is dark (OPTIONAL)', section => {
            section.deviceSetting('LightMeter').capability(['illuminanceMeasurement']).name('Where?');
            section.numberSetting('luminanceLevel').name('1-1000');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.active', 'motionActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.inactive', 'motionInactiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.LightMeter, 'illuminanceMeasurement', 'illuminance', 'handleLuxChange')

    })

    .subscribedEventHandler('handleLuxChange', (context, event) => {
        
        if (LightMeter) {
        let lightSensorState = LightMeter.currentIlluminance
        log.info("handleLuxChange: SENSOR = $lightSensorState")
        } else {
        console.log('handleLuxChange: SENSOR = No Light Meter')
        }
        

	})

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        log.info("${event.name}: ${event.value}")
        this.ActivityClock()
        if (state.elapsed >= state.threshold) {
        console.log("motionActiveHandler: ${state.elapsedMinutes} Minutes >= $minutes1 Minute(s) Check Light Sensor")
        this.checkLuminance()
        } else {
        console.log('motionActiveHandler: Not enough time has elapsed, do nothing')
        }
        

	})

    .subscribedEventHandler('motionInactiveHandler', (context, event) => {
        
        log.info("${event.name}: ${event.value}")
        this.ResetClock()
        

	})
