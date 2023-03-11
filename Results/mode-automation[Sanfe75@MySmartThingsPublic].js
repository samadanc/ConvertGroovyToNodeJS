
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When one of these people leave home', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Mode for someone Away', section => {

        });


        page.section('Mode for anyone Away', section => {

        });


        page.section('Action delay time (minutes) (defaults to 10 min)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        console.log("event.name: ${event.value}")
        if (event.value == 'not present') {
        let secondsDelay = delay != null && delay != '' ? delay * 60 : 10 * 60
        this.runIn(this.getDelay(), presenceCheck, ['overwrite': false])
        }
        

	})
