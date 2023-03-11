
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Segment Write Key', section => {
            section.textSetting('segmentWriteKey').name('Segment Write Key');

        });


        page.section('Log Switches:', section => {
            section.deviceSetting('switches').capability(['switch']).name('Forward it Segment for switches');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        let evtId = "${event.id}"
        let payload = ['userId': event.deviceId, 'event': 'SmartThings Event', 'context': ['app': ['name': 'SmartThingsSegmentLogger', 'version': '0.1.0']], 'properties': ['date': event.date, 'isoDate': event.isoDate, 'id': event.id, 'eventId': evtId , 'name': event.name, 'displayName': event.displayName, 'hub': event.hubId, 'locationName': event.location.name, 'value': event.value]]
        let params = ['uri': 'https://api.segment.io', 'path': '/v1/track', 'headers': ['Authorization': " Basic $segmentWriteKey"], 'body': payload ]
        try {
        this.httpPostJson(params, { let resp ->
        console.log("Logged event to Segment (${resp.status})
        $params")
        })
        }
        catch (let e) {
        log.error("Failed to log event to Segment: $e")
        }
        

	})
