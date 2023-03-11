
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Motion sensor bulbs', section => {
            section.deviceSetting('bulbs').capability(['switch']).name('');

        });


        page.section('Motion sensor switch', section => {
            section.deviceSetting('motionSwitch').capability(['sensor']).name('Switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.bulbs, 'switch', 'switch.on', 'bulbsHandler')

    })

    .subscribedEventHandler('bulbsHandler', (context, event) => {
        
        console.log('one of the configured switches changed states')
        
        context.api.devices.sendCommands(context.config.motionSwitch, 'sensor', on)
    
        

	})
