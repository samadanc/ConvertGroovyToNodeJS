
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Things to Control:', section => {
            section.deviceSetting('lsensor').capability(['waterSensor']).name('When water is detected...');
            section.deviceSetting('offswitches').capability(['switch']).name('Turn off...');
            section.deviceSetting('onswitches').capability(['switch']).name('Turn on...');

        });


        page.section('['hidden': this.hideOptionsSection(), 'hideable': true], 'Additionally', section => {
            section.deviceSetting('sonos').capability(['musicPlayer']).name('On this Speaker player');
            section.textSetting('SonosMsg').name('Leak Notification message');

        });


        page.section(''Version 1.0.2'', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lsensor, 'waterSensor', 'water.wet', 'waterHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lsensor, 'waterSensor', 'water.dry', 'waterHandler')

    })

    .subscribedEventHandler('waterHandler', (context, event) => {
        
        let strMessage = ''
        offswitches.each({
        console.log("(0D) ${app.label} - ${it.label} is ${it.latestState(switch).value}")
        if (event.value == 'wet') {
        it.off()
        strMessage = "$SonosMsg - ${lsensor.label}"
        } else {
        it.on()
        }
        })
        onswitches.each({
        console.log("(0E) ${app.label} - ${it.label} is ${it.latestState(switch).value}")
        if (event.value == 'wet') {
        it.on()
        strMessage = "$SonosMsg - ${lsensor.label}"
        }
        })
        if (sonos && strMessage ) {
        log.info("(0F) ${event.value} - ${event.name} - ${lsensor.label}")
        state.sound = this.textToSpeech(strMessage, true)
        
        context.api.devices.sendCommands(context.config.sonos, 'musicPlayer', playTrackAndResume)
    
        }
        

	})
