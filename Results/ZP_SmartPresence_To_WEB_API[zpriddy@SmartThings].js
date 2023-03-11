
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Presence Sensor', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which presence sensors?');

        });


        page.section('Remote Info', section => {
            section.textSetting('remotePresence').name('Sensor Name');
            section.textSetting('authCode').name('Auth Code');
            section.textSetting('endpointURL').name('Endpoint URL');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.presence, 'presenceSensor', currentValue)
    
        if (presenceState == 'not present') {
        this.postPresence('notpresent')
        } else {
        this.postPresence('present')
        }
        

	})
