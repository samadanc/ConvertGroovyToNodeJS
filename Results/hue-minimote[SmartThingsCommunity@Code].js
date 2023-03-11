
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control which hue lamps?', section => {
            section.deviceSetting('hueLamps').capability(['colorControl']).name('');

        });


        page.section('Control which TV lights?', section => {
            section.deviceSetting('tvLights').capability(['colorControl']).name('');

        });


        page.section('Control other (non-hue) lamps?', section => {
            section.deviceSetting('otherLights').capability(['switch']).name('');

        });


        page.section('Which button controller?', section => {
            section.deviceSetting('buttonDevice').capability(['button']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.buttonDevice, 'button', 'button', 'buttonEvent')

    })

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
        let buttonState = event.value
        let buttonNumber = this.parseJson(event.data)?.buttonNumber
        console.log("buttonState:  $buttonState")
        console.log("buttonNumber: $buttonNumber")
        if (!((1..4).contains(buttonNumber))) {
        log.error("This app only supports four buttons. Invalid buttonNumber: $buttonNumber")
        } else {
        if (!(buttonState == 'pushed' || buttonState == 'held')) {
        log.error("This app only supports button pushed and held values. Invalid button state: $buttonState")
        } else {
        let meth = 'handleButton' + buttonNumber + buttonState.capitalize()
        console.log("meth: $meth")
        this."$meth"()
        }
        }
        

	})
