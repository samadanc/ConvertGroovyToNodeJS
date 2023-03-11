
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('garages').capability(['doorControl']).name('');

        });


        page.section('', section => {
            section.numberSetting('minutesLater').name('after __ minutes');

        });


        page.section('when anyone leaves...', section => {
            section.deviceSetting('anyLeave').capability(['presenceSensor']).name('Who?');

        });


        page.section('', section => {

        });


        page.section('for success messages', section => {
            section.enumSetting('sendPushSuccess').name('Send a push notification?');

        });


        page.section('for errors', section => {
            section.enumSetting('sendPushError').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        console.log('Handling event: ' + event.value)
        if (event.value == 'open') {
        console.log("Scheduling close because $open was open")
        try {
        this.runIn(minutesLater * 60, closeDoors)
        this.notifySuccess("scheduled doors to close in $minutesLater minutes")
        }
        catch (let all) {
        this.notifyError('failed to schedule the close action. Door(s) will not close.')
        }
        } else {
        console.log("Not scheduling close because ${event.value}")
        }
        

	})
