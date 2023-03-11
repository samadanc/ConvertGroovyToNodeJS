
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Speakers', section => {
            section.deviceSetting('door').capability(['contactSensor']).name('Where?');
            section.deviceSetting('sonos').capability(['musicPlayer']).name('On this Speaker player');
            section.numberSetting('volume').name('Temporarily change volume');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.door, 'contactSensor', 'contact.open', 'doorOpenHandler')

    })

    .subscribedEventHandler('doorOpenHandler', (context, event) => {
        
        log.info("DOOR OPEN HANDLER $evt")
        
        context.api.devices.sendCommands(context.config.sonos, 'musicPlayer', playTrack)
    
        

	})
