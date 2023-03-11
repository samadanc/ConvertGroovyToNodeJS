
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Getting mail sensor', section => {
            section.deviceSetting('contactGetMail').capability(['contactSensor']).name('Get mail contact that closes');

        });


        page.section('Fetching mail sensor', section => {
            section.deviceSetting('contactFetchMail').capability(['contactSensor']).name('Fetch mail contact that closes');

        });


        page.section('Send this message (optional, sends standard status message if not specified)', section => {
            section.textSetting('messageTextGet').name('Mail Delivered?');

        });


        page.section('Send this message (optional, sends standard status message if not specified)', section => {
            section.textSetting('messageTextFetch').name('Mail Fetched?');

        });


        page.section('Minimum time between messages (optional, defaults to every message)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contactGetMail, 'contactSensor', 'contact.closed', 'eventHandlerGotMail')

        await context.api.subscriptions.subscribeToDevices(context.config.contactFetchMail, 'contactSensor', 'contact.closed', 'eventHandlerFetchMail')

    })

    .subscribedEventHandler('eventHandlerGotMail', (context, event) => {
        
        console.log("${event.name}: ${event.value}, lastStatus: ${state.lastStatus}, motionStopTime: ${state.motionStopTime}")
        state.isThereMail = true
        if (frequency) {
        let lastTime = state[event.deviceId]
        if (lastTime == null || this.now() - lastTime >= frequency * 60000) {
        this.sendMessageGet(evt)
        }
        } else {
        this.sendMessageGet(evt)
        }
        

	})

    .subscribedEventHandler('eventHandlerFetchMail', (context, event) => {
        
        console.log("${event.name}: ${event.value}, lastStatus: ${state.lastStatus}, motionStopTime: ${state.motionStopTime}")
        state.isThereMail = false
        if (frequency) {
        let lastTime = state[event.deviceId]
        if (lastTime == null || this.now() - lastTime >= frequency * 60000) {
        this.sendMessageFetch(evt)
        }
        } else {
        this.sendMessageFetch(evt)
        }
        

	})
