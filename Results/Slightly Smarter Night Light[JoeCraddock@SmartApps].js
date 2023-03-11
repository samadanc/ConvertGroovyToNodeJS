
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which dimmers to turn on', section => {
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Which Dimmers?');
            section.numberSetting('level').name('How bright?, 0-99');

        });


        page.section('And then off when it\'s light or there\'s been no movement for...', section => {
            section.numberSetting('delayMinutes').name('Minutes?');

        });


        page.section('Which motion sensors', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Which Motion Sensors?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'active') {
        for (let dimmer : dimmers ) {
        if (dimmer.currentSwitch == 'off') {
        dimmer.setLevel(level)
        state.lastStatus = 'active'
        console.log('motion detected, light is off, turning light on')
        } else {
        console.log('motion detected, light is on, doing nothing')
        }
        }
        } else {
        state.lastStatus = 'inactive'
        this.runIn(60 * delayMinutes ? 60 * delayMinutes : 0, inactiveHandler)
        }
        

	})
