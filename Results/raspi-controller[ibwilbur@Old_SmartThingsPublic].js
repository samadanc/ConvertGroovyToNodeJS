
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control things', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Dimmers');
            section.deviceSetting('doors').capability(['doorControl']).name('Doors');
            section.deviceSetting('music').capability(['musicPlayer']).name('Music Players');

        });


        page.section('View things', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Presence Sensors');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contact Sensors');
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('temperature').capability(['temperatureMeasurement']).name('Temperature');
            section.deviceSetting('battery').capability(['battery']).name('Battery Status');

        });


        page.section('Raspberry Pi setup', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.battery, 'battery', 'battery', 'internalEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'internalEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'internalEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.music, 'musicPlayer', 'level', 'internalEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'internalEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'level', 'internalEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperature, 'temperatureMeasurement', 'temperature', 'internalEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.music, 'musicPlayer', 'mute', 'internalEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.doors, 'doorControl', 'door', 'internalEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.music, 'musicPlayer', 'trackDescription', 'internalEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.music, 'musicPlayer', 'trackData', 'internalEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.music, 'musicPlayer', 'status', 'internalEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'internalEventHandler')

    })

    .subscribedEventHandler('internalEventHandler', (context, event) => {
        
        console.log("Internal event: Name: ${e.displayName}, Type: ${e.name}, Value: ${e.value}")
        let data = ['name': e.displayName, 'type': e.name, 'value': e.value]
        this.sendCommand('PUT', '/push', data)
        

	})
