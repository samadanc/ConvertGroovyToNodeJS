
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.booleanSetting('alertRefreshed').name('Alert when refreshed?');

        });


        page.section('Presence 1', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Life360 Presence');
            section.deviceSetting('otherPresence1').capability(['presenceSensor']).name('Other Presence Sensors');
            section.booleanSetting('alertInconsistent1').name('Alert when inconsistent?');

        });


        page.section('Presence 2', section => {
            section.deviceSetting('presence2').capability(['presenceSensor']).name('Life360 Presence');
            section.deviceSetting('otherPresence2').capability(['presenceSensor']).name('Other Presence Sensors');
            section.booleanSetting('alertInconsistent2').name('Alert when inconsistent?');

        });


        page.section('', section => {
            section.booleanSetting('logEnable').name('Enable debug logging?');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('presenceHandler_Presence1', (context, event) => {
        
        this.logDebug("presenceHandler_Presence1: ${event.device} changed to ${event.value}")
        this.runIn(30, refresh_Presence1)
        

	})

    .subscribedEventHandler('presenceHandler_Presence2', (context, event) => {
        
        this.logDebug("presenceHandler_Presence2: ${event.device} changed to ${event.value}")
        this.runIn(30, refresh_Presence2)
        

	})
