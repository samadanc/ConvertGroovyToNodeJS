
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Settings', section => {
            section.deviceSetting('theSensor').capability(['contactSensor']).name('Which contact or tilt sensor?');
            section.deviceSetting('theSwitch').capability(['switch']).name('Which switch?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSensor, 'contactSensor', 'contact', 'theSensorContactHanlder')

    })

    .subscribedEventHandler('theSensorContactHanlder', (context, event) => {
        
        if (event.value == 'open') {
        console.log('sensor open')
        } else {
        if (event.value == 'closed') {
        console.log('sensor closed')
        }
        }
        
        context.api.devices.sendCommands(context.config.theSwitch, 'switch', off)
    
        

	})
