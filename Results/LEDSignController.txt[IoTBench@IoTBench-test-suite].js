
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens or closes...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.multisensor, 'device.smartSenseMulti', 'contact', 'handleContact')

    })

    .subscribedEventHandler('handleContact', (context, event) => {
        
        this.httpGet('http://www.smartthings.com', successClosure)
        

	})
