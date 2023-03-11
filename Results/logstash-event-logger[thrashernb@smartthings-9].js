
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log these Things:', section => {
            section.deviceSetting('accelerations').capability(['accelerationSensor']).name('Accelerometers');
            section.deviceSetting('alarms').capability(['alarm']).name('Alarms');
            section.deviceSetting('batteries').capability(['battery']).name('Batteries');
            section.deviceSetting('beacons').capability(['beacon']).name('Beacons');
            section.deviceSetting('codetectors').capability(['carbonMonoxideDetector']).name('Carbon  Monoxide Detectors');
            section.deviceSetting('colors').capability(['colorControl']).name('Color Controllers');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contact Sensors');
            section.deviceSetting('doorsControllers').capability(['doorControl']).name('Door Controllers');
            section.deviceSetting('energymeters').capability(['energyMeter']).name('Energy Meters');
            section.deviceSetting('indicators').capability(['indicator']).name('Indicators');
            section.deviceSetting('illuminances').capability(['illuminanceMeasurement']).name('Illuminance Meters');
            section.deviceSetting('locks').capability(['lock']).name('Locks');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('musicPlayers').capability(['musicPlayer']).name('Music Players');
            section.deviceSetting('powerMeters').capability(['powerMeter']).name('Power Meters');
            section.deviceSetting('presences').capability(['presenceSensor']).name('Presence Sensors');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Humidity Meters');
            section.deviceSetting('relaySwitches').capability(['relaySwitch']).name('Relay Switches');
            section.deviceSetting('sleepSensors').capability(['sleepSensor']).name('Sleep Sensors');
            section.deviceSetting('smokeDetectors').capability(['smokeDetector']).name('Smoke Detectors');
            section.deviceSetting('peds').capability(['stepSensor']).name('Pedometers');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('levels').capability(['switchLevel']).name('Switch Levels');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperature Sensors');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Thermostats');
            section.deviceSetting('valves').capability(['valve']).name('Valves');
            section.deviceSetting('waterdetectors').capability(['waterSensor']).name('Water Sensors');

        });


        page.section('Logstash Server', section => {
            section.textSetting('logstash_host').name('Logstash Hostname/IP');
            section.numberSetting('logstash_port').name('Logstash Port');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('sendEvents', delay);

    })

    .scheduledEventHandler('sendEvents', (context, event) => {
        
        let eventBuffer = atomicState.eventBuffer ? atomicState.eventBuffer : []
        if (eventBuffer.size() >= 1) {
        atomicState.eventBuffer = []
        try {
        let data = new groovy.json.JsonOutput().toJson(eventBuffer)
        let hubAction = new physicalgraph.device.HubAction(['method': 'PUT', 'path': '/smartthings', 'body': eventBuffer , 'headers': ['Host': "$logstash_host:$logstash_port", 'Content-Type': 'application/json']])
        this.sendHubCommand(hubAction)
        }
        catch (let e) {
        console.log("Trying to sendhubcmd post the data for ${event.name} threw an exception: $e")
        }
        }
        

	})
