
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Collect Metrics', section => {
            section.deviceSetting('co2_devices').capability(['carbonDioxideMeasurement']).name('Carbon Dioxide');
            section.deviceSetting('i_devices').capability(['illuminanceMeasurement']).name('Illuminance');
            section.deviceSetting('ph_devices').capability(['pHMeasurement']).name('pH');
            section.deviceSetting('rh_devices').capability(['relativeHumidityMeasurement']).name('Relative Humidity');
            section.deviceSetting('t_devices').capability(['temperatureMeasurement']).name('Temperature');
            section.deviceSetting('v_devices').capability(['voltageMeasurement']).name('Voltage');

        });


        page.section('Publish Metrics', section => {
            section.textSetting('datadrop_bin').name('Wolfram Data Drop Bin ID');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('publishMetrics', delay);

    })

    .scheduledEventHandler('publishMetrics', (context, event) => {
        
        console.log("[metrics] publishMetrics binid: $datadrop_bin")
        if (datadrop_bin == '') {
        log.error('[metrics] error: datadrop bin not set')
        return null
        }
        let query = ['bin': datadrop_bin ]
        co2_devices.each({ let d ->
        this.updateParams(query, d, 'carbonDioxide')
        })
        i_devices.each({ let d ->
        this.updateParams(query, d, 'illuminance')
        })
        ph_devices.each({ let d ->
        this.updateParams(query, d, 'pH')
        })
        rh_devices.each({ let d ->
        this.updateParams(query, d, 'humidity')
        })
        t_devices.each({ let d ->
        this.updateParams(query, d, 'temperature')
        })
        v_devices.each({ let d ->
        this.updateParams(query, d, 'voltage')
        })
        query['bin'] = datadrop_bin
        let params = ['uri': 'https://datadrop.wolframcloud.com/api/v1.0/Add', 'query': query ]
        console.log("[metrics] publishing $params")
        try {
        this.httpGet(params, { let resp ->
        console.log("[metrics] response status: ${resp.status}")
        })
        }
        catch (let e) {
        log.error("[metrics] exception: $e")
        }
        

	})
