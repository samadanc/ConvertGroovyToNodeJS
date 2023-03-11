
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Execute HTTP Request attached to switch', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('Which lights?');

        });


        page.section('Network Information', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.value == 'on') {
        this.onSwitches()
        } else {
        if (event.value == 'off') {
        this.offSwitches()
        }
        }
        

	})
