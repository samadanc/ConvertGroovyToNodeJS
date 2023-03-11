
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose sensor... ', section => {
            section.deviceSetting('sensor').capability(['sensor']).name('');

        });


        page.section('Warning level...', section => {
            section.numberSetting('warnlevel').name('Warning level at least?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'sensor', 'greeting', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("gas level warning app: ${event.name}, ${event.value}, $settings")
        console.log("warnlevel is $warnlevel")
        let level = event.value.substring(5, event.value.length())
        console.log("current level is $level")
        if (level.toInteger() > warnlevel ) {
        console.log("level above warnlevel and warned = ${state.warned}")
        if (state.warned == 0) {
        this.sendPush("gas is large: $level")
        }
        state.warned = 1
        } else {
        console.log('level not above warnlevel')
        if (level.toInteger() < warnlevel - 50) {
        if (state.warned == 1) {
        this.sendPush("gas is good now: $level")
        }
        state.warned = 0
        }
        }
        

	})
