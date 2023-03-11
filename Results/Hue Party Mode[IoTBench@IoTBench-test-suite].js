
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose lights...', section => {
            section.deviceSetting('lights').capability(['colorControl']).name('Pick your lights');

        });


        page.section('Adjust color change speed and timeout', section => {
            section.numberSetting('interval').name('Color change interval (seconds)');
            section.numberSetting('timeout').name('How long to run (minutes)');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('onLightOff', (context, event) => {
        
        if (state.running) {
        log.info("${app.name}: One of our lights was turned off.")
        this.stop()
        }
        

	})
