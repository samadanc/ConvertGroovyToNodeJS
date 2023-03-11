
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Contact and Switch', section => {
            section.deviceSetting('myContact').capability(['contactSensor']).name('Choose your contact sensor');
            section.deviceSetting('mySwitch').capability(['switch']).name('Choose your switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.myContact, 'contactSensor', 'contact', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        if (event.value == 'open') {
        if (mySwitch.currentSwitch == 'off') {
        
        context.api.devices.sendCommands(context.config.mySwitch, 'switch', on)
    
        } else {
        
        context.api.devices.sendCommands(context.config.mySwitch, 'switch', off)
    
        }
        }
        

	})
