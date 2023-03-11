
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Light', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');
            section.numberSetting('delay').name('After how many seconds?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'offHandler')

    })

    .subscribedEventHandler('offHandler', (context, event) => {
        
        let seconds = delay ? delay : 60
        this.runIn(seconds, scheduledTurnOn)
        

	})
