
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose thermostat... ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('System Variables', section => {
            section.numberSetting('maxHumiditySetpoint').name('Maximum Humidity Setpoint');
            section.numberSetting('minHumiditySetpoint').name('Minimum Humidity Setpoint');
            section.numberSetting('maxOAtoEnable').name('Maximum OA to Enable');
            section.numberSetting('updatePeriod').name('Update Period (minutes: 1-30)');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('updateHumiditySetpoint', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'humidity', 'this.schedule(cron')

    })
