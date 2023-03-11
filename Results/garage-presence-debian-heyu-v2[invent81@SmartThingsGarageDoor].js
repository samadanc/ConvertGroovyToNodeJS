
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When a presence sensor arrives or departs this location..', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which sensor?');

        });


        page.section('Send a text message to...', section => {

        });


        page.section('x10code..', section => {

        });


        page.section('Garage door', section => {
            section.deviceSetting('garage_sensor').capability(['contactSensor']).name('Which sensor?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        if (event.value == 'present') {
        console.log("${(presence.label) ? presence.label : presence.name} has arrived at the $location")
        let deltaSeconds = 3
        let timeAgo = new Date(this.now() - 1000 * deltaSeconds )
        
        context.api.devices.sendCommands(context.config.presence, 'presenceSensor', eventsSince)
    
        console.log("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $deltaSeconds seconds")
        let alreadySentSms = recentEvents.count({
        it.value && it.value == 'present'
        }) > 1
        if (garage_sensor.currentContact == 'open') {
        console.log('Door already open')
        this.sendSms(phone1, 'Door already open')
        } else {
        this.sendSms(phone1, 'opening garage now')
        let params = ['uri': 'http://vpn.milltrek.net:12125', 'path': '/cgi-bin/bluelava/bluelava.cgi', 'contentType': 'application/json', 'query': ['action': 'on', 'device': "$x10code"]]
        try {
        this.httpGet(params, { let resp ->
        resp.headers.each({
        console.log("${it.name} : ${it.value}")
        })
        console.log("response contentType: ${resp.contentType}")
        console.log("response data: ${resp.data}")
        })
        }
        catch (let e) {
        log.error("something went wrong: $e")
        }
        }
        } else {
        if (event.value == 'not present') {
        let deltaSeconds = 3
        let timeAgo = new Date(this.now() - 1000 * deltaSeconds )
        
        context.api.devices.sendCommands(context.config.presence, 'presenceSensor', eventsSince)
    
        console.log("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $deltaSeconds seconds")
        let alreadySentSms = recentEvents.count({
        it.value && it.value == 'not present'
        }) > 1
        if (alreadySentSms) {
        console.log("SMS already sent within the last $deltaSeconds seconds")
        } else {
        console.log("${(presence.label) ? presence.label : presence.name} has left the $location")
        }
        }
        }
        

	})
