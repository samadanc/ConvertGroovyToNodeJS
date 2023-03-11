
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('sensors').capability(['sensor']).name('Sensors');
            section.deviceSetting('cameras').capability(['imageCapture']).name('Cameras');
            section.deviceSetting('webPresence').capability(['presenceSensor']).name('Web Presence');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('deviceChanged', (context, event) => {
        
        let PUSH_HOSTNAME = appSettings.httpUrl
        let url = PUSH_HOSTNAME + 'handler/smartthings'
        console.log("Pushing to $url")
        let data = [:]
        data['name'] = event.name
        data['deviceId'] = event.deviceId
        data['description'] = event.description
        data['descriptionText'] = event.descriptionText
        data['displayName'] = event.displayName
        data['date'] = event.isoDate
        data['values[name]'] = event.name
        data['values[value'] = event.value
        data['values[unit'] = event.unit
        log.trace("temperatureChagne, evt: $evt ---, settings: ||$data||")
        let successClosure = { let response ->
        console.log("Request was successful, ${response.getData()}")
        }
        let params = ['uri': url , 'success': successClosure , 'body': data ]
        this.httpPost(params)
        

	})
