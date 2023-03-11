
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose dryer switches to montior on and off... ', section => {
            section.deviceSetting('myswitch').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.myswitch, 'switch', 'greeting', 'greetings')

        await context.api.subscriptions.subscribeToDevices(context.config.myswitch, 'switch', 'switch.on', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.myswitch, 'switch', 'switch.off', 'handler')

    })

    .subscribedEventHandler('greetings', (context, event) => {
        
        console.log("dryer switch warning app: ${event.name}, ${event.value}, $settings")
        let level = event.value.substring(0, event.value.length() - 2).toInteger()
        console.log("level is '$level'")
        if (level < 120) {
        console.log("dryer switch $level : power reset?")
        this.sendPush("dryer switch $level : power reset?")
        }
        

	})

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("dryer switch warning app: ${event.name}, ${event.value}, $settings")
        let level = event.value
        console.log("current level is $level")
        if (level == 'on') {
        console.log("switch on and warned = ${state.warned}")
        if (state.warned == 0) {
        this.sendPush("dryer switch is : $level")
        }
        state.warned = 1
        } else {
        if (level == 'off') {
        console.log('switch off')
        if (state.warned == 1) {
        this.sendPush("dryer switch is now : $level")
        }
        state.warned = 0
        } else {
        console.log("switch unknown: $level ")
        if (state.warned == 0) {
        this.sendPush("dryer switch is now : $level")
        }
        state.warned = 1
        }
        }
        

	})
