
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select lights ...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('trigger switch ...', section => {
            section.deviceSetting('trigger').capability(['momentary']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('on_event', (context, event) => {
        
        this.setScene()
        

	})
