
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Temperature Sensors', section => {
            section.deviceSetting('tempsensors').capability(['temperatureMeasurement']).name('');

        });


        page.section('Illuminance Sensors', section => {
            section.deviceSetting('luxsensors').capability(['illuminanceMeasurement']).name('');

        });


        page.section('Relative Humidity Sensors', section => {
            section.deviceSetting('humiditysensors').capability(['relativeHumidityMeasurement']).name('');

        });


        page.section('UV Index Sensors', section => {
            section.deviceSetting('uvsensors').capability(['ultravioletIndex']).name('');

        });


        page.section('Thermostats', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('trapHandler', delay);

    })

    .scheduledEventHandler('trapHandler', (context, event) => {
        
        this.debug('running trap handler')
        if (this.getCirconusTrapUrl() != '' && this.getCirconusTrapUrl() != null) {
        let data = this.buildSensorData()
        let params = ['uri': this.getCirconusTrapUrl(), 'body': data ]
        this.debug("sending data ${params.body} to ${params.uri}")
        try {
        this.httpPostJson(params, { let resp ->
        this.debug("response: ${resp.data}")
        })
        }
        catch (let e) {
        this.debug("Exception $e")
        }
        }
        

	})
