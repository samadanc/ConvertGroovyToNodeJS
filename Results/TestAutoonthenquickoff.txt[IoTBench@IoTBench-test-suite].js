
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when there\'s movement...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('And off when there\'s been no movement for...', section => {
            section.numberSetting('seconds1').name('Seconds?');

        });


        page.section('Turn on/off light(s)...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'active') {
        console.log('turning on light')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        } else {
        if (event.value == 'inactive') {
        console.log('turning off shortly ...')
        this.runIn(seconds1, scheduleCheck)
        }
        }
        

	})
