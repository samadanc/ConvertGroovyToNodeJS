
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section('Select Weather Source', section => {
            section.deviceSetting('temperatureValue').capability(['temperatureMeasurement']).name('Temperature / Wind Source:');

        });


        page.section('Pool Pump Settings', section => {
            section.deviceSetting('pumpSwitch').capability(['switch']).name('Choose the pump switch to control:');
            section.numberSetting('pumpHighTempThres').name('Turn off the pump if temperature goes above:');
            section.numberSetting('pumpLowTempThres').name('Turn off the pump if the temperature drops below:');
            section.deviceSetting('pumpHoldSwitch').capability(['switch']).name('Choose the pool pump virtual hold switch:');

        });


        page.section('Pool Sprayer Settings', section => {
            section.deviceSetting('sprayerSwitch').capability(['switch']).name('Choose the sprayer switch to control:');
            section.numberSetting('sprayerHighWindThres').name('Turn off the sprayer if windspeed goes above:');
            section.numberSetting('sprayerLowTempThres').name('Turn off the sprayer if the temperature drops below:');
            section.deviceSetting('sprayerHoldSwitch').capability(['switch']).name('Choose the sprayer virtual hold switch:');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureValue, 'temperatureMeasurement', 'temperatureMeasurement', 'pwsHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureValue, 'temperatureMeasurement', 'windSpeed', 'pwsHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureValue, 'temperatureMeasurement', 'windGust', 'pwsHandler')

    })

    .subscribedEventHandler('pwsHandler', (context, event) => {
        
        this.logger('trace', 'pwsHandler', "PWS ${event.name} changed to ${event.value}")
        this.poll()
        

	})
