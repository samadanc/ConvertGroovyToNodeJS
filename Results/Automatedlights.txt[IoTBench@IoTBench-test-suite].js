
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Motions sensor?');

        });


        page.section('', section => {
            section.deviceSetting('luxSensor').capability(['illuminanceMeasurement']).name('Light sensor?');
            section.numberSetting('luxLevel').name('Darkness Lux level?');
            section.numberSetting('luxGoalLevel').name('Lux goal level?');
            section.numberSetting('luxDelta').name('Lux delta error?');
            section.numberSetting('timer').name('How long leave light on? (Min.)');

        });


        page.section('Turn on these lights', section => {
            section.deviceSetting('switches').capability(['switch']).name('Normal switch?');
            section.deviceSetting('dimmer').capability(['switchLevel']).name('Dimmer switch?');
            section.numberSetting('dimmerMinLevel').name('Minimal light dimmer pourcentage?');
            section.numberSetting('dimmerMaxLevel').name('Maximum light dimmer pourcentage?');
            section.numberSetting('dimmerstartLevel').name('Starting level pourcentage?');
            section.numberSetting('dimmerStepLevel').name('Pourcentage step increment?');

        });


        page.section('When someone at home', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Who?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.luxSensor, 'illuminanceMeasurement', 'illuminance', 'lumixHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion', 'MotionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('lumixHandler', (context, event) => {
        
        console.log("New lumix event ${event.value}")
        if (state.lightIsOn) {
        this.updateDimmerLevel(event.value.toInteger())
        }
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("New presence event ${event.value}")
        

	})

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        console.log("current mode ${location.mode.value}")
        

	})

    .subscribedEventHandler('MotionHandler', (context, event) => {
        
        if (event.value == 'active') {
        let someoneAtHome = location.mode == 'Home' ? true : false
        if (!someoneAtHome && state.usePresence) {
        presence.each({
        let pres = it.currentState('presence')
        if (pres.stringValue == 'present') {
        someoneAtHome = true
        }
        })
        }
        if (someoneAtHome) {
        if
        if (!state.lightIsOn) {
        state.lightIsOn = true
        this.triggerSwitches(true)
        }
        this.unschedule('stopLight')
        }
        } else {
        console.log('Motion detected but nobody at home... !??!?!? alert?')
        }
        } else {
        if (event.value == 'inactive') {
        if (state.lightIsOn) {
        console.log('Inactive')
        console.log("call stopLight in ${settings.timer} minutes")
        this.runIn(settings.timer * 60, stopLight, ['overwrite': true])
        }
        } else {
        log.error("State Undefined ${event.value}!!!!")
        }
        }
        

	})
