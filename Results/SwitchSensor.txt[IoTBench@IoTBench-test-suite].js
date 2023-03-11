
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which sensor do you want to track?', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Select one');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        if (event.value == 'open') {
        this.httpPost('https://www.google-analytics.com/collect', 'v=1&tid=UA-38046499-1&cid=1&t=event&ec=Door-' + event.displayName + '&ea=Open')
        }
        

	})
