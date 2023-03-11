
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('temperature').capability(['temperatureMeasurement']).name('Select temperature sensors');
            section.deviceSetting('lock').capability(['lock']).name('Select locks');
            section.deviceSetting('contact').capability(['contactSensor']).name('Select contacts');
            section.deviceSetting('motion').capability(['motionSensor']).name('Select motions');
            section.deviceSetting('switches').capability(['switch']).name('Select Switches');
            section.deviceSetting('battery').capability(['battery']).name('Select batteries');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Select presence sensors');

        });


        page.section('ThingSpeak Info', section => {
            section.textSetting('channelKey').name('ThingSpeak Channel Key');
            section.numberSetting('channelId').name('ThingSpeak Channel id');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperature, 'temperatureMeasurement', 'temperature', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.lock, 'lock', 'lock', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.battery, 'battery', 'battery', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("event happened ${e.description}")
        

	})
