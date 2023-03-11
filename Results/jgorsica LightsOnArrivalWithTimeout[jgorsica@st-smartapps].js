
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When one of these persons arrives', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Turn on these lights...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Where?');

        });


        page.section('And then off when it\'s light or there\'s been no movement for...', section => {
            section.numberSetting('delayMinutes').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presenseHandler')

    })

    .subscribedEventHandler('presenseHandler', (context, event) => {
        
        if (event.value == 'present') {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        if (delayMinutes) {
        this.runIn(delayMinutes * 60, turnOffMotionAfterDelay, ['overwrite': false])
        }
        }
        

	})
