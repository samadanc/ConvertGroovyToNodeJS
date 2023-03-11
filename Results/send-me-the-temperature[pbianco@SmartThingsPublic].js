
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Temperature Device', section => {
            section.deviceSetting('tempSensor1').capability(['temperatureMeasurement']).name('');

        });


        page.section('Send Me the temperature at', section => {
            section.timeSetting('sendTime').name('Notification Time?');

        });


        page.section('Phone Number to Text', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('sendMessage', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.tempSensor1, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        log.trace("temperature: ${event.value}, $evt")
        console.log("Temperature: ${event.value}")
        state.temp = event.value
        

	})

    .scheduledEventHandler('sendMessage', (context, event) => {
        
        console.log("State.temp= ${state.temp}")
        let msg = "The Temperature in the $tempSensor1 is ${state.temp}"
        this.sendPush(msg)
        if (phone) {
        this.sendSms(phone, msg)
        }
        

	})
