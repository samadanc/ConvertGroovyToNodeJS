
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pick a color changing bulb', section => {
            section.deviceSetting('bulb').capability(['colorControl']).name('Which Bulb?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.bulb, 'colorControl', 'color', 'handleColor')

        await context.api.subscriptions.subscribeToDevices(context.config.bulb, 'colorControl', 'switch', 'handleSwitch')

    })

    .subscribedEventHandler('handleColor', (context, event) => {
        
        console.log("$evt")
        

	})

    .subscribedEventHandler('handleSwitch', (context, event) => {
        
        console.log("$evt")
        

	})
