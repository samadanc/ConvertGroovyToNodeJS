
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Bus-NG details', section => {
            section.textSetting('agency').name('Agency');
            section.textSetting('route').name('Route');
            section.textSetting('direction').name('Direction');
            section.textSetting('stop').name('Stop');

        });


        page.section('Virtual switch to monitor', section => {
            section.deviceSetting('contact').capability(['momentary']).name('Sensor to monitor');

        });


        page.section('', section => {
            section.deviceSetting('sonos').capability(['musicPlayer']).name('On this Sonos player');

        });


        page.section('['hideable': true, 'hidden': true], 'More options', section => {
            section.booleanSetting('resumePlaying').name('Resume currently playing music after notification');
            section.numberSetting('volume').name('Temporarily change volume');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'momentary', 'switch.on', 'refresh')

    })

    .subscribedEventHandler('refresh', (context, event) => {
        
        log.trace("Refresh called with $evt")
        let url = "http://bus-ng.10ur.org/agencies/$agency/routes/$route/directions/$direction/stops/$stop/predictions/"
        try {
        this.httpGet(url, { let resp ->
        if (resp.status == 200 && resp.data) {
        console.log("Agency: ${resp.data.estimations.agency_title}")
        console.log("Route: ${resp.data.estimations.route_title}")
        console.log("Stop: ${resp.data.estimations.stop_title}")
        let msg = ''
        if (resp.data.estimations.predictions.size() == 0) {
        msg = "Master, looks like there is no bus scheduled for ${resp.data.estimations.route_title}."
        }
        if (resp.data.estimations.predictions.size() > 0) {
        console.log("Predictions: ${resp.data.estimations.predictions}")
        msg = "Master, your bus is ${resp.data.estimations.predictions[0].minutes} minutes away. Your bus is ${resp.data.estimations.route_title}, it goes ${resp.data.estimations.predictions[0].dir_title} and your stop is at ${resp.data.estimations.stop_title} ."
        }
        if (resp.data.estimations.predictions.size() == 1) {
        msg = msg + 'Unfortunately that is the last bus for today .'
        }
        if (resp.data.estimations.predictions.size() > 1) {
        msg = msg + "If you can not catch this one then you can catch the next bus. The next one is in ${resp.data.estimations.predictions[1].minutes} minutes ."
        }
        let sound = this.textToSpeech(msg)
        if (resumePlaying) {
        
        context.api.devices.sendCommands(context.config.sonos, 'musicPlayer', playTrackAndResume)
    
        } else {
        
        context.api.devices.sendCommands(context.config.sonos, 'musicPlayer', playTrackAndRestore)
    
        }
        } else {
        log.error("HTTP Get failed with ${resp.status}")
        }
        })
        }
        catch (let e) {
        log.error("Soomething went wrong: $e")
        }
        

	})
