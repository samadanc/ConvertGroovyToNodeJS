
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
            section.deviceSetting('thermostats').capability(['thermostat']).name('Select thermostat');

        });


        page.section('Xively Info', section => {
            section.textSetting('xi_apikey').name('Xively API Key');
            section.numberSetting('xi_feed').name('Xively Feed ID');

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
        }
        for (let t : settings.humidities) {
        logitems.add([t.displayName, 'humidity', Double.parseDouble(t.latestValue('humidity').toString())])
        state[t.displayName + '.humidity'] = t.latestValue('humidity')
        }
        for (let t : settings.batteries) {
        logitems.add([t.displayName, 'battery', Double.parseDouble(t.latestValue('battery').toString())])
        state[t.displayName + '.battery'] = t.latestValue('battery')
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
        console.log(t.displayName)
        let x = new BigDecimal(t.latestValue('illuminance'))
        console.log(x)
        logitems.add([t.displayName, 'illuminance', x ])
        state[t.displayName + '.illuminance'] = x
        }
        for (let t : settings.switches) {
        logitems.add([t.displayName, 'switch', t.latestValue('switch')])
        state[t.displayName + '.switch'] = t.latestValue('switch')
        }
        for (let t : settings.thermostats) {
        logitems.add([t.displayName, 'thermostat.coolingSetpoint', t.latestValue('coolingSetpoint')])
        state[t.displayName + '.coolingSetpoint'] = t.latestValue('coolingSetpoint')
        }
        this.logField2(logitems)
        

	})
