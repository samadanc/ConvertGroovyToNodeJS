
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When all of these people are home...', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Turn off camera power...', section => {
            section.deviceSetting('switches1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        console.log("event.name: ${event.value}")
        if (event.value == 'not present') {
        console.log('checking if everyone is away')
        if (this.everyoneIsAway()) {
        console.log('starting on Sequence')
        this.runIn(60 * 2, 'turnOn')
        }
        } else {
        if (!(this.everyoneIsAway())) {
        this.turnOff()
        }
        }
        

	})
