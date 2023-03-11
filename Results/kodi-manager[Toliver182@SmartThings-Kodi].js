
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Kodi Client', section => {
            section.textSetting('clientName').name('Client Name');
            section.textSetting('kodiIp').name('Kodi IP');
            section.textSetting('kodiPort').name('Kodi port');
            section.textSetting('kodiUsername').name('Kodi Username');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'response')

    })

    .subscribedEventHandler('response', (context, event) => {
        
        let msg = this.parseLanMessage(event.description)
        

	})
