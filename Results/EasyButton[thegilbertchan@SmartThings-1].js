
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is pushed', section => {
            section.deviceSetting('easyButton').capability(['momentary']).name('Which Switch?');

        });


        page.section('Speak this phrase', section => {
            section.textSetting('message').name('Notification message');

        });


        page.section('Output Device', section => {
            section.deviceSetting('speechOut').capability(['speechSynthesis']).name('Speak message via: ');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.easyButton, 'momentary', 'momentary.pushed', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.speechOut, 'speechSynthesis', speak)
    
        

	})
