
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When one of these people arrive at home', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('Who?');

        });


        page.section('When the door opens...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('', section => {
            section.deviceSetting('sonos').capability(['musicPlayer']).name('Sonos Device');

        });


        page.section('['hideable': false, 'hidden': false], 'More options', section => {
            section.numberSetting('volume').name('Temporarily change volume');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.sonos, 'musicPlayer', on)
    
        let t0 = new Date()
        let t1 = new Date(t0.getTime() - 1000 * 60 * 2)
        let recentNotPresentState
        let message = ''
        let length = 5000
        for (let person : people ) {
        if (person.latestValue == 'present') {
        log.info("Looking for last status of ${person.displayName}")
        }
        let states = person.statesSince('presence', t1)
        console.log("${states?.size()} STATES FOUND, LAST AT ${(states) ? states[0].dateCreated : }")
        recentNotPresentState = states.find({
        it.value == 'present'
        })
        try {
        log.info("user last here at ${recentNotPresentState.date}")
        }
        catch (let ex) {
        }
        if (recentNotPresentState) {
        message = "Welcome home, ${person.displayName}"
        break
        } else {
        console.log("skipping notification of arrival of ${person.displayName} because they have been here for a while")
        }
        }
        if (message.size() > 2) {
        state.sound = this.textToSpeech(message instanceof List ? message : message )
        console.log(message)
        } else {
        console.log('Nobody i know came home')
        state.sound = ['uri': 'http://s3.amazonaws.com/smartapp-media/sonos/a+door+opened.mp3', 'duration': '1']
        }
        this.musicplayer()
        

	})
