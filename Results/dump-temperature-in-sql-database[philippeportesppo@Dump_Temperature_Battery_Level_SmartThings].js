
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select sensors', section => {
            section.deviceSetting('temp').capability(['temperatureMeasurement']).name('Temperature');

        });


        page.section('Configure your NAS MySQL server and credentials', section => {
            section.textSetting('serverURL').name('Server URL');
            section.textSetting('serverPort').name('Server port');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery3Hours('updateCurrentInformation', delay);

    })

    .scheduledEventHandler('updateCurrentInformation', (context, event) => {
        
        temp.each({ let eswitch ->
        console.log(eswitch.currentTemperature)
        let params = ['uri': "$serverURL:$serverPort", 'path': '/add_smartthing_record.php', 'query': ['sensorID': eswitch.displayName, 'temp': eswitch.currentTemperature, 'batt': eswitch.currentBattery]]
        console.log(params)
        try {
        this.httpGet(params, { let resp ->
        console.log("response data: ${resp.data}")
        })
        }
        catch (let e) {
        log.error("something went wrong: $e")
        }
        })
        

	})
