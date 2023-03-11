
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

        await context.api.subscriptions.subscribeToDevices(context.config.fanSwitch, 'switch', 'switch.on', 'fanSwitchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'lightSwitchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'lightSwitchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.fanSwitch, 'switch', 'switch.off', 'fanSwitchOffHandler')

    })

    .subscribedEventHandler('fanSwitchOffHandler', (context, event) => {
        
        console.log('fanSwitchOffHandler')
        state.fanOn = false
        

	})

    .subscribedEventHandler('lightSwitchOnHandler', (context, event) => {
        
        console.log('lightSwitchOnHandler')
        state.lightOn = true
        if (minutesOn > 0) {
        this.runIn(minutesOn * 60, fanOn)
        } else {
        this.fanOn()
        }
        

	})

    .subscribedEventHandler('fanSwitchOnHandler', (context, event) => {
        
        console.log('fanSwitchOnHandler')
        state.fanOn = true
        if (!state.lightOn) {
        console.log('timing fan off')
        if (minutesOff > 0) {
        this.runIn(minutesOff * 60, fanOff)
        } else {
        this.fanOff()
        }
        }
        

	})

    .subscribedEventHandler('lightSwitchOffHandler', (context, event) => {
        
        console.log('lightSwitchOffHandler')
        state.lightOn = false
        if (state.fanOn) {
        console.log('timing fan off')
        if (minutesOff > 0) {
        this.runIn(minutesOff * 60, fanOff)
        } else {
        this.fanOff()
        }
        }
        

	})
