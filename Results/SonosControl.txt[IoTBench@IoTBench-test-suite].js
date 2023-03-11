
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


        page.section('', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Where?');
            section.numberSetting('minutesLater').name('Minutes?');

        });


        page.section('', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Where?');

        });


        page.section('', section => {
            section.deviceSetting('contactOpened').capability(['contactSensor']).name('Where?');

        });


        page.section('', section => {
            section.deviceSetting('contactClosed').capability(['contactSensor']).name('Where?');

        });


        page.section('', section => {
            section.deviceSetting('acceleration').capability(['accelerationSensor']).name('Where?');

        });


        page.section('', section => {
            section.deviceSetting('switchOn').capability(['switch']).name('Where?');

        });


        page.section('', section => {
            section.deviceSetting('switchOff').capability(['switch']).name('Where?');

        });


        page.section('', section => {
            section.deviceSetting('arrivalPresence').capability(['presenceSensor']).name('Who?');

        });


        page.section('', section => {
            section.deviceSetting('departurePresence').capability(['presenceSensor']).name('Who?');

        });


        page.section('', section => {
            section.deviceSetting('smoke').capability(['smokeDetector']).name('Where?');

        });


        page.section('', section => {
            section.deviceSetting('water').capability(['waterSensor']).name('Where?');

        });


        page.section('', section => {
            section.deviceSetting('button').capability(['button']).name('Where?');

        });


        page.section('', section => {

        });


        page.section('', section => {
            section.timeSetting('timeOfDay').name('When?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('takeAction', delay);

    })

    .scheduledEventHandler('takeAction', (context, event) => {
        
        console.log("Take action ($actionType).")
        let options = [:]
        if (volume) {
        sonos?.each({
        it.setLevel((volume as Integer))
        options.delay = 1000
        })
        }
        switch ( actionType ) {
        case 'Play':
        sonos?.each({
        options ? it.on(options) : it.on()
        })
        break
        case 'Stop Playing':
        sonos?.each({
        options ? it.off(options) : it.off()
        })
        break
        case 'Toggle Play/Pause':
        let currentStatus = sonos.currentValue('status')
        if (currentStatus == 'playing') {
        sonos?.each({
        options ? it.pause(options) : it.pause()
        })
        } else {
        sonos?.each({
        options ? it.play(options) : it.play()
        })
        }
        break
        case 'Skip to Next Track':
        sonos?.each({
        options ? it.nextTrack(options) : it.nextTrack()
        })
        break
        case 'Play Previous Track':
        sonos?.each({
        options ? it.previousTrack(options) : it.previousTrack()
        })
        break
        case 'Mute':
        sonos?.each({
        options ? it.mute(options) : it.mute()
        })
        break
        case 'Unmute':
        sonos?.each({
        options ? it.unmute(options) : it.unmute()
        })
        break
        default:
        log.error("Action type '$actionType' not defined")
        }
        if (frequency) {
        state.lastActionTimeStamp = this.now()
        }
        this.initialize()
        

	})
