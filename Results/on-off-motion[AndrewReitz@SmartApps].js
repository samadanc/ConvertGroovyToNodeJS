
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s movement...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Turn on...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('['hideable': true, 'hidden': true], 'Additional settings', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.active', 'motionActiveHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        let delayInMinutes = 60 * this.findturnOffTime()
        console.log("Delay set to $delayInMinutes")
        this.runIn(delayInMinutes, turnOffSwitch)
        

	})
