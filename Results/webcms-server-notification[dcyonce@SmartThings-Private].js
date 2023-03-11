
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Server', section => {
            section.textSetting('Server').name('Server');

        });


        page.section('Select Devices', section => {
            section.deviceSetting('AllDevices').capability(['refresh']).name('Select Devices');
            section.deviceSetting('PresenceSensors').capability(['presenceSensor']).name('Select people');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.AllDevices, 'refresh', 'acceleration', 'ChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.AllDevices, 'refresh', 'lock', 'ChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.AllDevices, 'refresh', 'rssi', 'ChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.PresenceSensors, 'presenceSensor', 'presence', 'ChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.AllDevices, 'refresh', 'temperature', 'ChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.AllDevices, 'refresh', 'humidity', 'ChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.AllDevices, 'refresh', 'contact', 'ChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.AllDevices, 'refresh', 'water', 'ChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.AllDevices, 'refresh', 'switch', 'ChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.AllDevices, 'refresh', 'level', 'ChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.AllDevices, 'refresh', 'smoke', 'ChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.AllDevices, 'refresh', 'battery', 'ChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.AllDevices, 'refresh', 'lastActivity', 'ChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.AllDevices, 'refresh', 'power', 'ChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.AllDevices, 'refresh', 'motion', 'ChangeHandler')

    })

    .subscribedEventHandler('ChangeHandler', (context, event) => {
        
        this.UpdateServer(evt)
        

	})
