
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is pushed', section => {
            section.deviceSetting('master').capability(['momentary']).name('Where?');

        });


        page.section('Turn off all of these switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'momentary', 'momentary.pushed', 'offHandler')

    })

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log('Turning off: ' + switches )
        switches?.off()
        

	})
