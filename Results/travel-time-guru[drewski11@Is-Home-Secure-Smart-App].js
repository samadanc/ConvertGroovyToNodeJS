
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('trafficCheck', (context, event) => {
        
        if (allOk) {
        if (state.travelTimeTraffic) {
        java.lang.Integer timeLeft = this.getTimeLeft()
        if (timeLeft <= 0) {
        if (state.notifyNow != 'true') {
        let timeLeftFixed = -1 * timeLeft
        let msg = "Attention: With current traffic conditions you will be $timeLeftFixed minutes late for work."
        if (sonos) {
        if (resumePlaying) {
        this.loadText(msg)
        sonos.playTrackAndResume(state.sound.uri, state.sound.duration, volume)
        } else {
        sonos.playText(msg)
        }
        }
        if (sendPushMessage == 'Yes') {
        this.sendPush(msg)
        }
        state.check = null
        state.notify = null
        state.notifyWarn = null
        state.notifyEmergency = null
        state.notifyNow = 'true'
        if (hues) {
        this.sendcolor(colorEmergency)
        }
        if (state.trafficCheck != true) {
        this.runEvery5Minutes(trafficCheck)
        state.trafficCheck = true
        }
        }
        } else {
        if (timeLeft <= notifyLeadEmergency ) {
        let msg = "You have $timeLeft minutes until you need to leave for work"
        if (state.notifyEmergency != 'true') {
        if (sonos) {
        if (resumePlaying) {
        this.loadText(msg)
        sonos.playTrackAndResume(state.sound.uri, state.sound.duration, volume)
        } else {
        sonos.playText(msg)
        }
        }
        if (sendPushMessage == 'Yes') {
        this.sendPush(msg)
        }
        state.check = null
        state.notify = null
        state.notifyWarn = null
        state.notifyNow = null
        state.notifyEmergency = 'true'
        if (hues) {
        this.sendcolor(colorEmergency)
        }
        if (state.trafficCheck != true) {
        this.runEvery5Minutes(trafficCheck)
        state.trafficCheck = true
        }
        }
        } else {
        if (timeLeft <= notifyLeadWarn ) {
        let msg = "You have $timeLeft minutes until you need to leave for work"
        if (state.notifyWarn != 'true') {
        if (sonos) {
        if (resumePlaying) {
        this.loadText(msg)
        sonos.playTrackAndResume(state.sound.uri, state.sound.duration, volume)
        } else {
        sonos.playText(msg)
        }
        }
        if (sendPushMessage == 'Yes') {
        this.sendPush(msg)
        }
        state.check = null
        state.notify = null
        state.notifyNow = null
        state.notifyWarn = 'true'
        state.notifyEmergency = null
        if (hues) {
        this.sendcolor(colorWarn)
        }
        if (state.trafficCheck != true) {
        this.runEvery5Minutes(trafficCheck)
        state.trafficCheck = true
        }
        }
        } else {
        if (timeLeft <= notifyLead ) {
        let msg = "You have $timeLeft minutes until you need to leave for work"
        if (state.notify != 'true') {
        if (sonos) {
        if (resumePlaying) {
        this.loadText(msg)
        sonos.playTrackAndResume(state.sound.uri, state.sound.duration, volume)
        } else {
        sonos.playText(msg)
        }
        }
        if (sendPushMessage == 'Yes') {
        this.sendPush(msg)
        }
        state.check = null
        state.notify = 'true'
        state.notifyWarn = null
        state.notifyNow = null
        state.notifyEmergency = null
        if (hues) {
        this.sendcolor(colorNotify)
        }
        if (state.trafficCheck != true) {
        this.runEvery5Minutes(trafficCheck)
        state.trafficCheck = true
        }
        }
        } else {
        if (state.notify == 'true' || state.notifyWarn == 'true' || state.notifyEmergency == 'true' && state.check != 'true') {
        let msg = "Traffic conditions seem to have improved.  You now have $timeLeft minutes to leave for work."
        if (sonos) {
        if (resumePlaying) {
        this.loadText(msg)
        sonos.playTrackAndResume(state.sound.uri, state.sound.duration, volume)
        } else {
        sonos.playText(msg)
        }
        }
        if (sendPushMessage == 'Yes') {
        this.sendPush(msg)
        }
        state.check = 'true'
        state.notify = null
        state.notifyWarn = null
        state.notifyNow = null
        state.notifyEmergency = null
        this.sendcolor(colorNormal)
        if (hues) {
        hues.off(['delay': 5000])
        }
        if (state.trafficCheck != true) {
        this.runEvery5Minutes(trafficCheck)
        state.trafficCheck = true
        }
        } else {
        if (state.check != 'greeting') {
        let msg = "Good morning.  You have $timeLeft minutes to leave for work."
        if (sonos) {
        if (resumePlaying) {
        this.loadText(msg)
        sonos.playTrackAndResume(state.sound.uri, state.sound.duration, volume)
        } else {
        sonos.playText(msg)
        }
        }
        if (sendPushMessage == 'Yes') {
        this.sendPush(msg)
        }
        state.check = 'greeting'
        state.notify = null
        state.notifyWarn = null
        state.notifyEmergency = null
        state.notifyNow = null
        if (state.trafficCheck != true) {
        this.runEvery5Minutes(trafficCheck)
        state.trafficCheck = true
        }
        }
        }
        }
        }
        }
        }
        } else {
        console.log('I do not have a travel time so I will check again in 5 minutes.')
        if (state.trafficCheck != true) {
        this.runEvery5Minutes(trafficCheck)
        state.trafficCheck = true
        }
        }
        } else {
        this.unschedule(trafficCheck)
        state.clear()
        }
        

	})
