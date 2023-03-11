
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn off these:', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('When we are away:', section => {

        });


        page.section('At a certain time:', section => {
            section.timeSetting('runTime').name('Time?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduledTime', delay);

    })

    .scheduledEventHandler('scheduledTime', (context, event) => {
        
        this.allOff()
        

	})
