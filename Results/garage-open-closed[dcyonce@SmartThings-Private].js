
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Garage Open/Closed - dcyonce'', section => {

        });


        page.section('Garage Doors ...', section => {
            section.deviceSetting('garagedoor').capability(['contactSensor']).name('Which Door?');

        });


        page.section('Text me at (optional, sends a push notification if not specified)...', section => {

        });


        page.section('Max time left open ...', section => {
            section.numberSetting('maxOpenTime').name('Minutes?');

        });


        page.section('Send alert every xxx minutes ...', section => {
            section.numberSetting('resendTime').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.garagedoor, 'contactSensor', 'contact', 'EventHandler')

    })

    .subscribedEventHandler('EventHandler', (context, event) => {
        
        console.log("event.Value=${event.value}")
        let message = ''
        if (event.value == 'open') {
        message = "$location ${event.displayName} has been opened."
        state.isOpened = 'true'
        state.sensorName = "${event.displayName}"
        this.runIn(maxOpenTime * 60, SendOpenedTooLong)
        } else {
        message = "$location ${event.displayName} has been closed."
        state.isOpened = 'false'
        state.reSend = 'false'
        }
        this.SendNotification(message)
        

	})
