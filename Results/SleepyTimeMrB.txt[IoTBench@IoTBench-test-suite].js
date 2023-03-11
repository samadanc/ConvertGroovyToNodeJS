
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the clock strikes', section => {
            section.timeSetting('time1').name('When?');

        });


        page.section('Then flash...', section => {
            section.deviceSetting('switches').capability(['switch']).name('These lights');
            section.numberSetting('numFlashes').name('This number of times (default 3)');

        });


        page.section('Time settings in milliseconds (optional)...', section => {
            section.numberSetting('onFor').name('On for (default 1000)');
            section.numberSetting('offFor').name('Off for (default 1000)');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        log.trace('scheduledCheck')
        this.flashLights()
        

	})
