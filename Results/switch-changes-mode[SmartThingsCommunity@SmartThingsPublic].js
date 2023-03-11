
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a switch to use...', section => {
            section.deviceSetting('controlSwitch').capability(['switch']).name('Switch');

        });


        page.section('Change to a new mode when...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.controlSwitch, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.value == 'on') {
        this.changeMode(onMode)
        } else {
        this.changeMode(offMode)
        }
        

	})
