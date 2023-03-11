
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Trigger:', section => {
            section.deviceSetting('switches').capability(['switch']).name('Export values when these switches are activated...');

        });


        page.section('Sensors:', section => {
            section.deviceSetting('luxMeters').capability(['illuminanceMeasurement']).name('Poll these illuminance sensors:');
            section.deviceSetting('tempMeters').capability(['temperatureMeasurement']).name('Poll these temperature sensors:');
            section.deviceSetting('batMeters').capability(['battery']).name('Poll these battery values:');
            section.deviceSetting('humMeters').capability(['relativeHumidityMeasurement']).name('Poll these humidity sensors:');
            section.deviceSetting('levelMeters').capability(['switchLevel']).name('Poll these dimmer levels:');
            section.deviceSetting('powerMeters').capability(['powerMeter']).name('Poll these power meters:');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Poll these Contact Sensors:');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch.on', 'dump')

    })

    .subscribedEventHandler('dump', (context, event) => {
        
        if (luxMeters) {
        console.log('^^^^^^^^^^^ illuminance ^^^^^^^^^^^')
        luxMeters.each({ let m ->
        log.info("${m.displayName} [${m.name}] lux:${m.currentValue(illuminance)}")
        })
        }
        if (tempMeters) {
        console.log('^^^^^^^^^^^ temperature ^^^^^^^^^^^')
        tempMeters.each({ let m ->
        log.info("${m.displayName} [${m.name}] temp:${m.currentValue(temperature)}")
        })
        }
        if (batMeters) {
        console.log('^^^^^^^^^^^ battery ^^^^^^^^^^^')
        batMeters.each({ let m ->
        log.info("${m.displayName} [${m.name}] charge:${m.currentValue(battery)}%")
        })
        }
        if (humMeters) {
        console.log('^^^^^^^^^^^ humidity ^^^^^^^^^^^')
        humMeters.each({ let m ->
        log.info("${m.displayName} [${m.name}] rh:${m.currentValue(humidity)}%")
        })
        }
        if (levelMeters) {
        console.log('^^^^^^^^^^^ dimmer level ^^^^^^^^^^^')
        levelMeters.each({ let m ->
        log.info("${m.displayName} [${m.name}] level:${m.currentValue(level)}%")
        })
        }
        if (powerMeters) {
        console.log('^^^^^^^^^^^ power ^^^^^^^^^^^')
        powerMeters.each({ let m ->
        log.info("${m.displayName} [${m.name}] watts:${m.currentValue(power)}")
        })
        }
        if (contactSensors) {
        console.log('^^^^^^^^^^^ contact ^^^^^^^^^^^')
        contactSensors.each({ let m ->
        log.info("${m.displayName} [${m.name}] state:${m.currentValue(contact)}")
        })
        }
        

	})
