
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Motion Sensors', section => {
            section.deviceSetting('motions_1').capability(['motionSensor']).name('Motion Sensor(s) in Zone 1');
            section.deviceSetting('motions_2').capability(['motionSensor']).name('Motion Sensor(s) in Zone 2');

        });


        page.section('Lights', section => {
            section.deviceSetting('switches_1').capability(['switch']).name('Light(s) in Zone 1');
            section.deviceSetting('switches_2').capability(['switch']).name('Light(s) in Zone 2');

        });


        page.section('Door(s)', section => {
            section.deviceSetting('contactSensors_1').capability(['contactSensor']).name('Door(s) in Zone 1');
            section.deviceSetting('contactSensors_2').capability(['contactSensor']).name('Door(s) in Zone 2');

        });


        page.section('Not Present debounce timer [default=5 minutes]', section => {
            section.numberSetting('notPresentThreshold').name('Time in minutes after door closes/motion no longer detected to turn off');

        });


        page.section('Zone Control Method', section => {
            section.enumSetting('controlMode_1').name('Zone 1: 0 = Time, 1 = Time+Motion, 2 = Time+Door, 3 = Time+Door+Motion');
            section.enumSetting('controlMode_2').name('Zone 2: 0 = Time, 1 = Time+Motion, 2 = Time+Door, 3 = Time+Door+Motion');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Would you like push notifications');

        });


        page.section('want to turn on mega-debugging?', section => {
            section.booleanSetting('debugMode').name('Debug Mode?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motions_2, 'motionSensor', 'motion', 'motion2EvtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensors_2, 'contactSensor', 'contact', 'contact2EvtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motions_1, 'motionSensor', 'motion', 'motion1EvtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensors_1, 'contactSensor', 'contact', 'contact1EvtHandler')

    })
