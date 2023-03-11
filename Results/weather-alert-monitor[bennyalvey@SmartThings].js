
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Weather service..', section => {

        });


        page.section('In addition to push notifications, send text alerts to...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.weather, 'device.SmartweatherStationTile', 'alert', 'alertHandler')

    })

    .subscribedEventHandler('alertHandler', (context, event) => {
        
        if (event.value != 'no current weather alerts') {
        let msg = "Weather Alert! ${event.descriptionText}"
        console.log(msg)
        this.sendPush(msg)
        if (settings.phone1) {
        this.sendSms(phone1, msg)
        }
        if (settings.phone2) {
        this.sendSms(phone2, msg)
        }
        if (settings.phone3) {
        this.sendSms(phone3, msg)
        }
        }
        

	})
