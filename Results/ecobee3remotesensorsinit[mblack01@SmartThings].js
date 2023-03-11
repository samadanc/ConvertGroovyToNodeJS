
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Select the ecobee thermostat', section => {

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

        context.api.schedules.runIn('sendNotifDelayNotInRange', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.ecobee, 'device.myEcobeeDevice', 'remoteSensorOccData', 'updateMotionSensors')

        context.api.schedules.schedule('takeAction', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.ecobee, 'device.myEcobeeDevice', 'remoteSensorHumData', 'updateHumiditySensors')

        await context.api.subscriptions.subscribeToDevices(context.config.ecobee, 'device.myEcobeeDevice', 'remoteSensorTmpData', 'updateTempSensors')

    })
