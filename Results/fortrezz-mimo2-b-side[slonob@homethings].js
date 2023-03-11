
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('devices').capability(['voltageMeasurement']).name('MIMO2 devices');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('events', (context, event) => {
        
        let ch = this.getChildDevice(event.device.id)
        ch.eventParse(evt)
        console.log("${event.device.id} triggered ${event.name}")
        

	})
