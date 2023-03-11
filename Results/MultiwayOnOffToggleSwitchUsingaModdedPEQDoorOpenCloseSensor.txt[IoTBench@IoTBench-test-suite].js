
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select sensor switch or switches', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Which Switch or Switches?');

        });


        page.section('Turn on/off a GE Link Light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Which Light');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        let cname = "${contact1.displayName}"
        let lname = "${switch1.displayName}"
        if ('on' == switch1.currentSwitch) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        } else {
        if ('off' == switch1.currentSwitch) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        }
        }
        

	})
