
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door closes...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('Turn on a switch...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Turn it off how many seconds later?', section => {
            section.numberSetting('secondsLater').name('When?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.closed', 'contactClosedHandler')

    })

    .subscribedEventHandler('contactClosedHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        console.log('Switch is on')
        let delay = secondsLater * 1000
        console.log("Delay is $delay ms")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        console.log('Switch is off')
        

	})
