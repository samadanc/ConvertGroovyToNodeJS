
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('Toggle a switch...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('And leave it on for how many minutes (optional)?', section => {
            section.numberSetting('minutesDelay').name('How long?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', currentValue)
    
        console.log("switch = $switchValue")
        if (switchValue == 'off') {
        log.trace('toggling light.on()')
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        } else {
        let runDelay = minutesDelay
        runDelay = runDelay != null && runDelay >= 0 ? runDelay * 60 : 0
        log.trace("toggling light.off() ... in $runDelay seconds")
        this.runIn(runDelay, 'switchOff')
        }
        

	})
