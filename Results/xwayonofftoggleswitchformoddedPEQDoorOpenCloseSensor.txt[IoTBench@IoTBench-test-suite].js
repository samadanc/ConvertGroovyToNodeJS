
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('PEQ sensor switches', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Which Switches?');

        });


        page.section('Turn on/off a GE Link Light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Which Light and Level');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        if ('open' == event.value && 'on' == switch1.currentSwitch) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        } else {
        if ('open' == event.value && 'off' == switch1.currentSwitch) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        } else {
        if ('closed' == event.value && 'on' == switch1.currentSwitch) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        } else {
        if ('closed' == event.value && 'off' == switch1.currentSwitch) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        } else {
        if (null == event.value && 'on' == switch1.currentSwitch) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        } else {
        if (null == event.value && 'off' == switch1.currentSwitch) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        }
        }
        }
        }
        }
        }
        let cname = "${contact1.displayName}"
        let lname = "${switch1.displayName}"
        log.info("PEQ switch $cname is now ${event.value} and $lname is now ${switch1.currentSwitch}")
        

	})
