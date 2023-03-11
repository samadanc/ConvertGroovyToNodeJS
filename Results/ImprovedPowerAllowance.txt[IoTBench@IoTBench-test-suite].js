
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When a switch turns on...', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('Turn it off how many minutes later?', section => {
            section.numberSetting('minutesLater').name('When?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        let delay = minutesLater * 60
        this.runIn(delay, turnOff)
        

	})
