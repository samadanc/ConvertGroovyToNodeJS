
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'askAlexaMQ', 'askAlexaMQHandler')

    })

    .subscribedEventHandler('askAlexaMQHandler', (context, event) => {
        
        if (!evt) {
        return null
        }
        switch (event.value) {
        case 'refresh':
        state.askAlexaMQ = event.jsonData && event.jsonData?.queues ? event.jsonData.queues : []
        console.log("Received list of queues from Ask Alexa ${state.askAlexaMQ}")
        break
        }
        

	})
