
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Selecciona los sensores que quieres usar para crear el informe', section => {
            section.deviceSetting('alarma').capability(['alarm']).name('Selecciona la alarma');
            section.deviceSetting('agua').capability(['waterSensor']).name('Selecciona el sensor de humedad');
            section.deviceSetting('humedad').capability(['relativeHumidityMeasurement']).name('Humedad');
            section.deviceSetting('temperatura').capability(['temperatureMeasurement']).name('Temperatura');

        });


        page.section('Selecciona la hora a la que quieres que se genere el informe', section => {
            section.timeSetting('hora').name('Hora Informe');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runOnce('avisarInforme', delay);

    })

    .scheduledEventHandler('avisarInforme', (context, event) => {
        
        if (location.mode == 'Holiday') {
        let params = ['uri': 'http://150.214.108.144:8080/web/InformeVacaciones', 'query': ['nombre': 'Monica Pinto', 'informe': this.datosInforme()]]
        try {
        this.httpGet(params, { let resp ->
        console.log("${resp.data}")
        })
        }
        catch (let e) {
        log.error("something went wrong: $e")
        }
        }
        

	})
