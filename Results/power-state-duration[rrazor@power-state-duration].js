
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Record from power meter:', section => {
            section.deviceSetting('d_meter').capability(['powerMeter']).name('Power Meter');

        });


        page.section('Consider ON above threshold:', section => {
            section.numberSetting('c_threshold').name('ON Threshold (Watts)');

        });


        page.section('API information:', section => {
            section.textSetting('apiUrl').name('POST URL');
            section.textSetting('apiAuthHeader').name('HTTP x-api-key: header value');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.d_meter, 'powerMeter', 'power', 'onDeviceEvent')

    })

    .subscribedEventHandler('onDeviceEvent', (context, event) => {
        
        let eventJson = this.eventToJson(evt)
        if (!eventJson.power) {
        return null
        }
        let deviceId = eventJson.device
        let deviceOn = eventJson.power > c_threshold
        let unixTime = eventJson.unixTime
        if (!(state.lastChange.containsKey(deviceId))) {
        state.lastChange[ deviceId ] = ['deviceOn': deviceOn , 'unixTime': unixTime ]
        return null
        }
        let lastChange = state.lastChange[ deviceId ]
        let unixTimeElapsed = unixTime - lastChange.unixTime
        if (unixTimeElapsed < 0) {
        return null
        } else {
        if (lastChange.deviceOn == deviceOn ) {
        return null
        }
        }
        log.trace("onDeviceEvent: ${event.device.label}.deviceOn changed from ${lastChange.deviceOn} to $deviceOn, elapsed: $unixTimeElapsed")
        if (deviceOn) {
        eventJson.type = 'off'
        } else {
        eventJson.type = 'on'
        }
        eventJson.unixTimeElapsed = unixTimeElapsed
        this.publishEvent(eventJson)
        state.lastChange[ deviceId ] = ['deviceOn': deviceOn , 'unixTime': unixTime ]
        

	})
