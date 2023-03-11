
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Zone configuration', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Motion sensors:');
            section.enumSetting('activateOnAll').name('Activate Zone when:');
            section.enumSetting('activationWindow').name('Activation window time, seconds. (used for All Sensors Option):');
            section.deviceSetting('lights').capability(['switch']).name('Select switch for testing...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        let state
        let states
        let motionOK = true
        let activateOnAll = settings.activateOnAll == '1'
        let window = settings.activationWindow.toInteger
        let crnt = new Date()
        let wStart = new Date(crnt.time - window * 2000)
        let stateMap = [:]
        let wSec
        if (event.value == 'active') {
        if (activateOnAll) {
        motionSensors.each({ let m ->
        stateMap << [m.displayName: settings.activationWindow.toInteger
        states = m.statesSince('motion', wStart)
        states.each({ let s ->
        if (s.value == 'active') {
        wSec = event.date.getTime() - s.date.getTime() / 1000
        if (wSec < stateMap.m.displayName) {
        stateMap.m.displayName = wSec
        }
        }
        })
        })
        motionOK = stateMap.every({ let s ->
        s.value < window
        })
        if (motionOK) {
        this.activateZone()
        } else {
        stateMap.each({ let s ->
        if (s.value < window ) {
        log.warn("${s.key} in motion...")
        }
        })
        }
        } else {
        this.activateZone()
        }
        } else {
        if (activateOnAll || this.allInactive()) {
        this.inactivateZone()
        }
        }
        

	})
