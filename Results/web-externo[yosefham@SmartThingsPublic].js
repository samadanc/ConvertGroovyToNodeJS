
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('termostato').capability(['thermostat']).name('');
            section.deviceSetting('interruptor').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('consultarTiempoJSON', delay);

    })

    .scheduledEventHandler('consultarTiempoJSON', (context, event) => {
        
        let params = ['uri': 'http://api.openweathermap.org/data/2.5/', 'path': 'weather', 'contentType': 'application/json', 'query': ['q': 'Narnia', 'units': 'metric', 'APPID': '5d8f63a4f5a632aaed2ed858d4439385']]
        let temp = 0
        try {
        this.httpGet(params, { let resp ->
        console.log("resp data: ${resp.data}")
        temp = resp.data.main.temp
        console.log("temp: $temp")
        })
        if (temp > 27) {
        
        context.api.devices.sendCommands(context.config.interruptor, 'switch', on)
    
        } else {
        
        context.api.devices.sendCommands(context.config.interruptor, 'switch', off)
    
        }
        }
        catch (let e) {
        log.error("error: $e")
        }
        

	})
