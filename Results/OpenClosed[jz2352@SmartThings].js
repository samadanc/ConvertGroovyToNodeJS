
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Info'', section => {

        });


        page.section('When this door opens...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Which Door?');

        });


        page.section('And this door is closed...', section => {
            section.deviceSetting('contact2').capability(['contactSensor']).name('Which Door?');

        });


        page.section('Turn on this light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Which Switch?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact2, 'contactSensor', 'contact', 'contactClosedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'contactOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("switch1 = ${event.value}")
        

	})

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        console.log("contact1 = ${event.value}")
        this.checkOff()
        

	})

    .subscribedEventHandler('contactClosedHandler', (context, event) => {
        
        console.log("contact2 = ${event.value}")
        

	})
