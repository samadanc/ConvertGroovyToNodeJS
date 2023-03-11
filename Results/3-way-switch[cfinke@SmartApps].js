
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches?');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        for (let eachSwitch : switches ) {
        if (eachSwitch.currentSwitch == 'on') {
        eachSwitch.off()
        }
        }
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        for (let eachSwitch : switches ) {
        if (eachSwitch.currentSwitch == 'off') {
        eachSwitch.on()
        }
        }
        

	})
