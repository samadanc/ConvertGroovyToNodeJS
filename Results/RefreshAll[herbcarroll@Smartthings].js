
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Optional control button to tie to other actions...', section => {
            section.deviceSetting('button').capability(['momentary']).name('');

        });


        page.section('Devices to refresh...', section => {
            section.deviceSetting('devices').capability(['refresh']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.button, 'momentary', 'momentary.pushed', 'buttonHandler')

    })

    .subscribedEventHandler('buttonHandler', (context, event) => {
        
        this.refresh()
        

	})
