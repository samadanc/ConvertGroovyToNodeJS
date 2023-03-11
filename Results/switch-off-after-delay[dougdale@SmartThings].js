
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn off a switch...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('After this long...', section => {
            section.numberSetting('delay').name('Delay (minutes)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        this.runIn(60 * delay , offHandler)
        

	})
