
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Set light to 1% at specified time', section => {
            section.timeSetting('theTime').name('Time to dim lights');

        });


        page.section('Which lights?', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('handler', delay);

    })

    .scheduledEventHandler('handler', (context, event) => {
        
        console.log("handler called at ${new Date()}")
        

	})
