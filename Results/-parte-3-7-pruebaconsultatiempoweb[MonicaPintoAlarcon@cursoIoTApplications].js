
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('aire').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery30Minutes('consultarTiempoJSON', delay);

    })

    .scheduledEventHandler('consultarTiempoJSON', (context, event) => {
        
        let params = ['uri': 'http://api.openweathermap.org/data/2.5/', 'path': 'weather', 'contentType': 'application/json', 'query': ['q': 'Málaga', 'units': 'metric', 'APPID': 'b811614ad352ec866712a6e9439e3462']]
        let temp
        try {
        this.httpGet(params, { let resp ->
        console.log("resp data: ${resp.data}")
        temp = resp.data.main.temp
        console.log("temp: $temp")
        })
        console.log("aire: ${aire.currentSwitch}")
        console.log("aire: ${aire.switchState?.getValue()}")
        if (temp > 17) {
        
        context.api.devices.sendCommands(context.config.aire, 'switch', on)
    
        }
        }
        catch (let e) {
        log.error("error: $e")
        }
        

	})
