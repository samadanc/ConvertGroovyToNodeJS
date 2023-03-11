
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Get state of these things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Which Contact?');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which Presence?');

        });


        page.section('Report to the following Pushbullet devices...', section => {

        });


        page.section('Polling Interval', section => {
            section.numberSetting('interval').name('Set polling interval (in minutes)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log('event')
        this.runIn(60, reportIfChanged, ['overwrite': true])
        

	})
