
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('At this time every day', section => {
            section.timeSetting('time1').name('Time of Day');

        });


        page.section('Select locks', section => {
            section.deviceSetting('refresh1').capability(['refresh']).name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        log.trace('scheduledCheck')
        console.log(refresh1?.lock)
        
        context.api.devices.sendCommands(context.config.refresh1, 'refresh', refresh)
    
        

	})
