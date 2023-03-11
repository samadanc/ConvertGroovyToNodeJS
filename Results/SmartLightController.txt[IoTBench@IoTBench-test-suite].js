
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when there\'s movement...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Where?');

        });


        page.section('And it\'s dark...', section => {
            section.deviceSetting('illuminanceSensor').capability(['illuminanceMeasurement']).name('Where?');

        });


        page.section('How dark (recommended value: 30)...', section => {
            section.numberSetting('numLuxNight').name('Night Time Illuminance?');

        });


        page.section('Then turn off when there\'s been no movement for...', section => {
            section.numberSetting('numMinutes').name('Minutes?');

        });


        page.section('Or it has become light (recommended value: 100+)...', section => {
            section.numberSetting('numLuxDay').name('Day Time Illuminance?');

        });


        page.section('Turn on/off light(s)...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.illuminanceSensor, 'illuminanceMeasurement', 'illuminance', 'illuminanceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        let numLux = event.integerValue
        console.log("current illuminance value=$numLux")
        this.checkSwitches('lux')
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'active') {
        this.checkSwitches('on')
        } else {
        if (event.value == 'inactive') {
        if (!state.inactiveAt) {
        state.inactiveAt = this.now()
        }
        }
        }
        

	})

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        if (state.inactiveAt == null) {
        console.log('schedule check, timer not active')
        } else {
        console.log("schedule check, timer inactiveAt=${state.inactiveAt}")
        }
        if (state.inactiveAt) {
        let elapsed = this.now() - state.inactiveAt
        let threshold = 1000 * 60 * numMinutes
        if (elapsed >= threshold ) {
        this.checkSwitches('inactivity')
        } else {
        console.log("${(elapsed / 1000)} sec since motion stopped")
        }
        }
        

	})
