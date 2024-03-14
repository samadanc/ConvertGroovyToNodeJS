
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Close if garage door is open...', section => {
            section.deviceSetting('doorSensor').capability(['contactSensor']).name('Which Sensor?');
            section.deviceSetting('doorSwitch').capability(['momentary']).name('Which Door?');

        });


        page.section('Sunset offset (optional)...', section => {
            section.numberSetting('sunsetOffsetValue').name('Minutes');
            section.enumSetting('sunsetOffsetDir').name('Before or After');

        });


        page.section('Zip code (optional, defaults to location coordinates)...', section => {
            section.textSetting('zipCode').name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetTimeHandler')

    })

    .subscribedEventHandler('sunsetTimeHandler', (context, event) => {
        
        console.log("sunset event $evt")
        this.scheduleCloseGarage(event.date)
        this.send("Sunset: ${event.date}")
        

	})
        console.log("{{interesting}}")

