
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('energymeters').capability(['energyMeter']).name('Energy Meter');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Thermostat');
            section.deviceSetting('weatherstations').capability(['temperatureMeasurement']).name('Outside Temperature');

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
        for (let t : settings.energymeters) {
        logitems.add([t.displayName, 'energymeter.energy', t.latestValue('energy'), 'KilowattHours', 'kWh'])
        state[t.displayName + '.energy'] = t.latestValue('energy')
        }
        for (let t : settings.thermostats) {
        logitems.add([t.displayName, 'inside.temperature', t.latestValue('temperature'), 'Farenheight', '°F'])
        state[t.displayName + '.temperature'] = t.latestValue('temperature')
        }
        for (let t : settings.energymeters) {
        logitems.add([t.displayName, 'energymeter.power', t.latestValue('power'), 'Watts', 'W'])
        state[t.displayName + '.power'] = t.latestValue('power')
        }
        for (let t : settings.energymeters) {
        logitems.add([t.displayName, 'energymeter.volts', t.latestValue('volts'), 'Volts', 'V'])
        state[t.displayName + '.volts'] = t.latestValue('volts')
        }
        for (let t : settings.energymeters) {
        logitems.add([t.displayName, 'energymeter.amps', t.latestValue('amps'), 'Amps', 'A'])
        state[t.displayName + '.amps'] = t.latestValue('amps')
        }
        for (let t : settings.weatherstations) {
        logitems.add([t.displayName, 'outside.temperature', t.latestValue('temperature'), 'Farenheight', '°F'])
        state[t.displayName + '.temperature'] = t.latestValue('temperature')
        }
        this.logField2(logitems)
        

	})
