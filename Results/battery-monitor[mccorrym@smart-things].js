
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the sensors that use batteries and select a time to check them.', section => {
            section.deviceSetting('sensors').capability(['sensor']).name('Which sensors require batteries?');
            section.timeSetting('battery_check_time').name('Choose a time to check the batteries on the network each day');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('batteryCheckHandler', delay);

    })

    .scheduledEventHandler('batteryCheckHandler', (context, event) => {
        
        sensors.each({ let sensor ->
        let battery_value = sensor.currentValue('battery').toInteger()
        if (battery_value <= 20) {
        this.sendNotificationEvent("[EVENT] LOW BATTERY: The batteries for the ${sensor.getLabel().toLowerCase()} are low (${sensor.currentValue(battery)}%). Consider replacing them soon.")
        this.sendPush("The batteries for the ${sensor.getLabel().toLowerCase()} are low (${sensor.currentValue(battery)}%). Consider replacing them soon.")
        }
        })
        

	})
