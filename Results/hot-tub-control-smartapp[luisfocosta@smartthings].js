
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the switch/relay that controls the Hot Tub Jets', section => {
            section.deviceSetting('jetsSwitchDevice').capability(['switch']).name('Hot Tub Jets switch?');

        });


        page.section('Choose the switch/relay that controls the Hot Tub heater', section => {
            section.deviceSetting('heaterSwitchDevice').capability(['switch']).name('Hot Tub Heater Switch?');

        });


        page.section('Choose the temperature sensor', section => {
            section.deviceSetting('tempSensorDevice').capability(['temperatureMeasurement']).name('Hot Tub temperature Sensor?');

        });


        page.section('Choose the Virtual Hot Tub Device? ', section => {
            section.deviceSetting('virtualSpaDevice').capability(['thermostat']).name('Hot Tub Virtual device?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.jetsSwitchDevice, 'switch', 'switch', 'JetsHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualSpaDevice, 'thermostat', 'switch', 'virtualSwitchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.heaterSwitchDevice, 'switch', 'switch', 'HeaterHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualSpaDevice, 'thermostat', 'jets', 'virtualJetsHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.tempSensorDevice, 'temperatureMeasurement', 'temperature', 'tempHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualSpaDevice, 'thermostat', 'heater', 'virtualHeaterHandler')

    })
