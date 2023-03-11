
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('The Presence Sensor', section => {
            section.deviceSetting('simulatedPresence').capability(['presenceSensor']).name('Select the simulated presence sensor that will be monitored');
            section.deviceSetting('simulatedSwitch').capability(['switch']).name('Select the simulated switch that will monitor and control the presence sensor.');

        });


        page.section('Notifications', section => {
            section.booleanSetting('notifyPush').name('Send notifications to all logged in devices for all users of location: ${location.name}?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.simulatedPresence, 'presenceSensor', 'presence', 'simulatedPresenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.simulatedSwitch, 'switch', 'switch', 'simulatedSwitchHandler')

    })
