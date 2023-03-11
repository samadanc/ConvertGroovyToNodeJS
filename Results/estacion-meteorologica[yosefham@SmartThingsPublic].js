
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
        
        let params = ['uri': 'http://weatherstation.wunderground.com', 'path': '/weatherstation/updateweatherstation.php', 'query': ['ID': 'IANDALUC230', 'PASSWORD': 'csnkm3d9', 'dateutc': 'now', 'tempf': '39', 'action': 'updateraw', 'softwaretype': 'SmartThings']]
        let temp = 0
        try {
        this.httpGet(params, { let resp ->
        console.log("resp data: ${resp.data}")
        })
        }
        catch (let e) {
        log.error("error: $e")
        }
        

	})
