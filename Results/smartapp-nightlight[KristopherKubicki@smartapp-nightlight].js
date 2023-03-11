
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these indicator lights...', section => {
            section.deviceSetting('lights').capability(['indicator']).name('');

        });


        page.section('Turning on when there\'s movement...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Where?');

        });


        page.section('And then off when it\'s light or there\'s been no movement for...', section => {
            section.numberSetting('delayMinutes').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'inactive') {
        return this.noMotionHandler(evt)
        }
        state.lastStatus = 'on'
        for (let light : lights ) {
        if (light.currentValue('switch') == 'on') {
        light.indicatorWhenOn()
        } else {
        light.indicatorWhenOff()
        }
        }
        this.runIn(5, 'blinkOff', ['overwrite': true])
        

	})
