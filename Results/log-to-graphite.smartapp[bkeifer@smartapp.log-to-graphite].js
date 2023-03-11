
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Humidities');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contacts');
            section.deviceSetting('illuminances').capability(['illuminanceMeasurement']).name('Illuminances');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motions');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('batteries').capability(['battery']).name('Batteries');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Thermostat Setpoints');
            section.deviceSetting('energymeters').capability(['energyMeter']).name('Energy Meters');

        });


        page.section('Graphite Server', section => {
            section.textSetting('graphite_host').name('Graphite Hostname/IP');
            section.numberSetting('graphite_port').name('Graphite Port');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkSensors', delay);

    })

    .scheduledEventHandler('checkSensors', (context, event) => {
        
        let logitems = []
        for (let t : settings.temperatures) {
        logitems.add([t.displayName, 'temperature', Double.parseDouble(t.latestValue('temperature').toString())])
        state[t.displayName + '.temp'] = t.latestValue('temperature')
        console.log('[temp]     ' + t.displayName + ': ' + t.latestValue('temperature'))
        }
        for (let t : settings.humidities) {
        logitems.add([t.displayName, 'humidity', Double.parseDouble(t.latestValue('humidity').toString())])
        state[t.displayName + '.humidity'] = t.latestValue('humidity')
        console.log('[humidity] ' + t.displayName + ': ' + t.latestValue('humidity'))
        }
        for (let t : settings.batteries) {
        logitems.add([t.displayName, 'battery', Double.parseDouble(t.latestValue('battery').toString())])
        state[t.displayName + '.battery'] = t.latestValue('battery')
        console.log('[battery]  ' + t.displayName + ': ' + t.latestValue('battery'))
        }
        for (let t : settings.contacts) {
        logitems.add([t.displayName, 'contact', t.latestValue('contact')])
        state[t.displayName + '.contact'] = t.latestValue('contact')
        }
        for (let t : settings.motions) {
        logitems.add([t.displayName, 'motion', t.latestValue('motion')])
        state[t.displayName + '.motion'] = t.latestValue('motion')
        }
        for (let t : settings.illuminances) {
        let x = new BigDecimal(t.latestValue('illuminance'))
        logitems.add([t.displayName, 'illuminance', x ])
        state[t.displayName + '.illuminance'] = x
        console.log('[luminance] ' + t.displayName + ': ' + t.latestValue('illuminance'))
        }
        for (let t : settings.switches) {
        logitems.add([t.displayName, 'switch', t.latestValue('switch') == 'on' ? 1 : 0])
        state[t.displayName + '.switch'] = t.latestValue('switch') == 'on' ? 1 : 0
        console.log('[switch] ' + t.displayName + ': ' + t.latestValue('switch') == 'on' ? 1 : 0)
        }
        for (let t : settings.thermostats) {
        logitems.add([t.displayName, 'thermostat', t.latestValue('setPoint')])
        state[t.displayName + '.setPoint'] = t.latestValue('setPoint')
        console.log('[thermostat] ' + t.displayName + ': ' + t.latestValue('setPoint'))
        }
        for (let t : settings.energymeters) {
        logitems.add([t.displayName + '.power', 'energy', t.latestValue('power')])
        state[t.displayName + '.Watts'] = t.latestValue('power')
        console.log('[energy] ' + t.displayName + ': ' + t.latestValue('power'))
        logitems.add([t.displayName + '.amps', 'energy', t.latestValue('amps')])
        state[t.displayName + '.Amps'] = t.latestValue('amps')
        console.log('[energy] ' + t.displayName + ': ' + t.latestValue('amps'))
        logitems.add([t.displayName + '.volts', 'energy', t.latestValue('volts')])
        state[t.displayName + '.Volts'] = t.latestValue('volts')
        console.log('[energy] ' + t.displayName + ': ' + t.latestValue('volts'))
        }
        this.logField2(logitems)
        

	})
