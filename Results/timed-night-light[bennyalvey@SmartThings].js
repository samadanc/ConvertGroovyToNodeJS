
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sensor', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Select your motion sensor');

        });


        page.section('Choose the outlets of your light(s)', section => {
            section.deviceSetting('lights').capability(['switch']).name('Light Outlet(s)');

        });


        page.section('Choose the time window during which the lights will be activated.', section => {
            section.timeSetting('startTime').name('Beginning Time');
            section.timeSetting('endTime').name('Ending Time');
            section.numberSetting('freq').name('Inactive period before lights are switched off (in minutes)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lights, 'switch', 'switch.off', 'switchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion.active', 'motionActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion.inactive', 'motionInactiveHandler')

    })
