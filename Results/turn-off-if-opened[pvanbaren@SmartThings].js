
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When something is opened...', section => {
            section.deviceSetting('sensor1').capability(['contactSensor']).name('What?');

        });


        page.section('Turn off a switch...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor1, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        console.log('Welcome home!')
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        

	})
