
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Contact Sensor', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Pick your sensors');

        });


        page.section('Lights', section => {
            section.deviceSetting('lights').capability(['switch']).name('Pick your swithces');

        });


        page.section('Misc.', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.closed', 'contactClosedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        this.unschedule(turnOff)
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        

	})

    .subscribedEventHandler('contactClosedHandler', (context, event) => {
        
        let threshold = thresh * 60
        console.log("threshold is $threshold seconds")
        this.runIn(threshold, turnOff)
        

	})
