
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log these presence sensors:', section => {
            section.deviceSetting('presences').capability(['presenceSensor']).name('');

        });


        page.section('Log these switches:', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Log these locks:', section => {
            section.deviceSetting('locks').capability(['lock']).name('');

        });


        page.section('Log these switch levels:', section => {
            section.deviceSetting('levels').capability(['switchLevel']).name('');

        });


        page.section('Log these motion sensors:', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('');

        });


        page.section('Log these garage doors:', section => {
            section.deviceSetting('garages').capability(['garageDoorControl']).name('');

        });


        page.section('Log these temperature sensors:', section => {
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('');

        });


        page.section('Log these thermostats:', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('');

        });


        page.section('Log these humidity sensors:', section => {
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('');

        });


        page.section('Log these contact sensors:', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('');

        });


        page.section('Log these alarms:', section => {
            section.deviceSetting('alarms').capability(['alarm']).name('');

        });


        page.section('Log these indicators:', section => {
            section.deviceSetting('indicators').capability(['indicator']).name('');

        });


        page.section('Log these CO detectors:', section => {
            section.deviceSetting('codetectors').capability(['carbonMonoxideDetector']).name('');

        });


        page.section('Log these smoke detectors:', section => {
            section.deviceSetting('smokedetectors').capability(['smokeDetector']).name('');

        });


        page.section('Log these water detectors:', section => {
            section.deviceSetting('waterdetectors').capability(['waterSensor']).name('');

        });


        page.section('Log these acceleration sensors:', section => {
            section.deviceSetting('accelerations').capability(['accelerationSensor']).name('');

        });


        page.section('Log these power meters:', section => {
            section.deviceSetting('powermeters').capability(['powerMeter']).name('');

        });


        page.section('Log these energy meters:', section => {
            section.deviceSetting('energymeters').capability(['energyMeter']).name('');

        });


        page.section('HTTP Server', section => {
            section.textSetting('httpUrl').name('HTTP URL');
            section.textSetting('xApiKey').name('\');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery15Minutes('metricPollingHandler', delay);

    })

    .scheduledEventHandler('metricPollingHandler', (context, event) => {
        
        let mDevice = [:]
        settings.thermostats.eachWithIndex({ let dev, let i ->
        mDevice = [:]
        mDevice['device'] = dev.displayName
        mDevice['deviceId'] = dev.id
        mDevice['location'] = dev.currentValue('location')
        mDevice['temperature'] = dev.currentValue('temperature')
        mDevice['humidity'] = dev.currentValue('humidity')
        mDevice['thermostatSetpoint'] = dev.currentValue('thermostatSetpoint')
        mDevice['thermostatMode'] = dev.currentValue('thermostatMode')
        mDevice['thermostatFanMOde'] = dev.currentValue('thermostatFanMode')
        mDevice['thermostatOperatingState'] = dev.currentValue('thermostatOperatingState')
        this.logMetric(this.metricJSONBuilder(mDevice))
        })
        settings.temperatures.eachWithIndex({ let dev, let i ->
        if (!(dev.hasCapability('Thermostat'))) {
        mDevice = [:]
        mDevice['device'] = dev.displayName
        mDevice['deviceId'] = dev.id
        mDevice['temperature'] = dev.currentValue('temperature')
        this.logMetric(this.metricJSONBuilder(mDevice))
        }
        })
        

	})
