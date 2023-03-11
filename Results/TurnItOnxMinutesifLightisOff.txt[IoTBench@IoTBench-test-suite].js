
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When it turns off...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Turn off a switch...', section => {
            section.deviceSetting('switch2').capability(['switch']).name('');

        });


        page.section('For how many minutes after if still off?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'switchOffHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        let delay = 60 * waitMinutes
        this.runIn(delay, turnOffSwitch)
        

	})
