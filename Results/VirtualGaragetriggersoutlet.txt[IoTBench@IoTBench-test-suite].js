
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When a Virtual Garage Door is tapped...', section => {
            section.deviceSetting('GarageSensor1').capability(['contactSensor']).name('Which?');

        });


        page.section('Trigger which outlet?', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.GarageSensor1, 'contactSensor', 'buttonpress.true', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        console.log("${event.value}: $evt, $settings")
        log.trace("Turning on switches: $switches")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        log.trace("Turning off switches: $switches")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        

	})
