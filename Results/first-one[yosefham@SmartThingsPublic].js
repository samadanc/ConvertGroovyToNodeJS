
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('elsensor').capability(['motionSensor']).name('hay movimiento??');
            section.deviceSetting('elswitch').capability(['switch']).name('cambiamos??');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('movimiento1', (context, event) => {
        
        if ('active' == event.value) {
        elswitch[1].on()
        } else {
        if ('inactive' == event.value) {
        elswitch[1].off()
        }
        }
        

	})

    .subscribedEventHandler('movimiento0', (context, event) => {
        
        if ('active' == event.value) {
        elswitch[0].on()
        } else {
        if ('inactive' == event.value) {
        elswitch[0].off()
        }
        }
        

	})

    .subscribedEventHandler('movimiento2', (context, event) => {
        
        if ('active' == event.value) {
        elswitch[2].on()
        } else {
        if ('inactive' == event.value) {
        elswitch[2].off()
        }
        }
        

	})
