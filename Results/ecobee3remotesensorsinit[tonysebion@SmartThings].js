
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Select the ecobee thermostat', section => {
            section.deviceSetting('ecobee').capability(['thermostat']).name('Which ecobee thermostat?');

        });


        page.section('Polling ecobee3\'s remote3 sensor(s) at which interval in minutes (range=[15..59],default =30 min.)?', section => {
            section.numberSetting('givenInterval').name('Interval');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.ecobee, 'thermostat', 'remoteSensorOccData', 'updateMotionSensors')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobee, 'thermostat', 'remoteSensorTmpData', 'updateTempSensors')

        context.api.schedules.runIn('sendNotifDelayNotInRange', delay);

        context.api.schedules.schedule('takeAction', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.ecobee, 'thermostat', 'remoteSensorHumData', 'updateHumiditySensors')

    })
