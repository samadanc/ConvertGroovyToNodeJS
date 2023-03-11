
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control switch...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Control button...', section => {
            section.deviceSetting('button').capability(['momentary']).name('');

        });


        page.section('Control these bulbs...', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Hue Bulbs?');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.button, 'momentary', 'momentary.pushed', 'buttonHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("Turning ${event.value}!!!")
        if (event.value == 'on') {
        console.log("${event.isStateChange()}")
        if (state.switch == 1) {
        console.log("$switch1 was already on")
        } else {
        if (state.switch == 0) {
        console.log("$switch1 was off")
        state.switch = 1
        state.cycle = 0
        } else {
        console.log('i dunno!')
        }
        }
        this.cycle()
        state.switch = 1
        } else {
        if (event.value == 'off') {
        state.switch = 0
        }
        }
        

	})

    .subscribedEventHandler('buttonHandler', (context, event) => {
        
        this.cycle()
        

	})
