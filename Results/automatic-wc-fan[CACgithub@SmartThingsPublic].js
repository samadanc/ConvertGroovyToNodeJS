
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is turned on...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Which?');

        });


        page.section('This many minutes later...', section => {
            section.numberSetting('minutesOn').name('How many?');

        });


        page.section('Then turn on this fan switch...', section => {
            section.deviceSetting('fanSwitch').capability(['switch']).name('Which?');

        });


        page.section('And then turn it off this many minutes...', section => {
            section.numberSetting('minutesOff').name('after the switch turns off');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'switchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.fanSwitch, 'switch', 'switch', 'fanHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        console.log("Light Switch turn off. Is fan on? ${state.fanOn}")
        state.runFan = false
        if (minutesOff >= 0) {
        this.runIn(minutesOff * 60, fanOff)
        }
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log("Light Switch turned on. Is fan on? ${state.fanOn}")
        state.runFan = true
        if (minutesOn >= 0) {
        this.runIn(minutesOn * 60, fanOn)
        }
        

	})

    .subscribedEventHandler('fanHandler', (context, event) => {
        
        if (event.value == 'on') {
        state.fanOn = true
        console.log('Fan switch turned on!')
        } else {
        if (event.value == 'off') {
        state.fanOn = false
        console.log('Fan switch turned off!')
        }
        }
        

	})
