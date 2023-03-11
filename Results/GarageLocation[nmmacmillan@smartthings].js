
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage to Monitor', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Which door?');
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("contact event $evt")
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("presence event ${event.value}")
        if (event.value == 'not present') {
        if
        console.log('User has left with the door open')
        this.sendPush('Whoa! The garage door is still open!')
        } else {
        console.log('User has left with the door closed')
        }
        } else {
        console.log('User has arrived')
        }
        

	})
