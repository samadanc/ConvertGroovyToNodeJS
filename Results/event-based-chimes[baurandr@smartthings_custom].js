
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Chime when this button is pressed', section => {
            section.deviceSetting('button1').capability(['button']).name('Which button?');

        });


        page.section('Which Chime', section => {
            section.deviceSetting('chime').capability(['tone']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.button1, 'button', 'button', 'buttonHandler')

    })

    .subscribedEventHandler('buttonHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'pushed') {
        
        context.api.devices.sendCommands(context.config.chime, 'tone', bell1)
    
        }
        

	})
