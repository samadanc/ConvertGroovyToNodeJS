
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('The Exit Delay Message Settings', section => {
            section.deviceSetting('thekeypads').capability(['button']).name('Keypads to monitor');
            section.deviceSetting('theTTS').capability(['speechSynthesis']).name('LanNouncer/DLNA TTS Devices');
            section.deviceSetting('theSpeakers').capability(['audioNotification']).name('Speaker Devices?');
            section.numberSetting('theVolume').name('Speaker Volume Level from 1 to 100');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thekeypads, 'button', 'armMode', 'TalkerHandler')

    })

    .subscribedEventHandler('TalkerHandler', (context, event) => {
        
        if (event.value == 'entryDelay' && theEntryMsg > '') {
        if (theTTS) {
        
        context.api.devices.sendCommands(context.config.theTTS, 'speechSynthesis', speak)
    
        
        context.api.devices.sendCommands(context.config.theTTS, 'speechSynthesis', speak)
    
        
        context.api.devices.sendCommands(context.config.theTTS, 'speechSynthesis', speak)
    
        }
        if (theSpeakers) {
        
        context.api.devices.sendCommands(context.config.theSpeakers, 'audioNotification', playTextAndResume)
    
        }
        } else {
        if (event.value == 'exitDelay') {
        if (theTTS) {
        
        context.api.devices.sendCommands(context.config.theTTS, 'speechSynthesis', speak)
    
        
        context.api.devices.sendCommands(context.config.theTTS, 'speechSynthesis', speak)
    
        
        context.api.devices.sendCommands(context.config.theTTS, 'speechSynthesis', speak)
    
        }
        if (theSpeakers) {
        
        context.api.devices.sendCommands(context.config.theSpeakers, 'audioNotification', playTextAndResume)
    
        }
        }
        }
        

	})
