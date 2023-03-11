
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Adjust these lights...', section => {
            section.deviceSetting('lights').capability(['colorTemperature']).name('Tunable White Bulbs');

        });


        page.section('Set color temperature to...', section => {
            section.numberSetting('colorTemp').name('Color Temperature');

        });


        page.section('At this time every day...', section => {
            section.timeSetting('theTime').name('Time to execute every day');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('setColorTempHandler', delay);

    })

    .scheduledEventHandler('setColorTempHandler', (context, event) => {
        
        console.log("setColorTempHandler: called at ${new Date()}")
        console.log("setColorTempHandler: setting color temp to $colorTemp")
        lights?.setColorTemperature(colorTemp)
        

	})
