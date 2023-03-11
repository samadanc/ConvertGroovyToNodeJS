
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('The following bulbs...', section => {
            section.deviceSetting('bulb').capability(['switch']).name(' ');

        });


        page.section('Turn off all light bulbs after ... minutes when no one is home and the main power supply is restored', section => {
            section.numberSetting('lockTime').name('Auto off time (seconds)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.bulb, 'switch', 'switch', 'bulbHandler')

    })

    .subscribedEventHandler('bulbHandler', (context, event) => {
        
        console.log("${event.value}")
        if (event.value == 'on') {
        let MinuteDelay = lockTime
        this.runIn(MinuteDelay, turnOffSwitch)
        console.log('The lights were turned off!')
        }
        

	})
