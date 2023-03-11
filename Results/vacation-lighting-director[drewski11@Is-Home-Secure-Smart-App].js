
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.enumSetting('startTimeType').name('Starting at');
            section.numberSetting('startTimeOffset').name('Offset in minutes (+/-)');
            section.timeSetting('starting').name('Start time (if enabled)');

        });


        page.section('', section => {
            section.enumSetting('endTimeType').name('Ending at');
            section.numberSetting('endTimeOffset').name('Offset in minutes (+/-)');
            section.timeSetting('ending').name('End time (if enabled)');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        log.trace("modeChangeHandler $evt")
        this.setSched()
        

	})
