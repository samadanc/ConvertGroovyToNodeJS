
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on this light', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('');

        });


        page.section('SmartThings RPi', section => {
            section.textSetting('proxyAddress').name('Proxy Address');
            section.textSetting('proxyPort').name('Proxy Port');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        console.log('Received event')
        console.log('Event is ' + event.stringValue)
        let map = this.stringToMap(event.stringValue)
        let headers = this.getHttpHeaders(map.headers)
        if (headers?.device == 'RPI Wireless Sensors') {
        console.log('Received event for RPI Wireless Sensors')
        let eventBytes = map.body.decodeBase64()
        let eventText = new String(eventBytes, 'UTF-8')
        this.sendEventToSensors(eventText)
        }
        

	})
