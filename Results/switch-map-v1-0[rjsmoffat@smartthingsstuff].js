
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select switches to marry', section => {
            section.deviceSetting('switches').capability(['switch']).name('Select');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch.on', 'switchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch.off', 'switchOffHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        console.log('Sending switches off.')
        switches*.off()
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log('Sending switches on.')
        switches*.on()
        

	})
