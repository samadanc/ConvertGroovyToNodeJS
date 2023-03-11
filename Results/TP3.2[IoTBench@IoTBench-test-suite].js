
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a switch to use...', section => {
            section.deviceSetting('switch').capability(['switch']).name('Switch');

        });


        page.section('Change to a new mode when...', section => {

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.value == 'on') {
        this.changeMode(offMode)
        } else {
        this.changeMode(onMode)
        }
        

	})
