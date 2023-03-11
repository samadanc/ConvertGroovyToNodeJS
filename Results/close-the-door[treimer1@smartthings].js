
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select door to control...', section => {
            section.deviceSetting('door').capability(['doorControl']).name('');

        });


        page.section('Close it at...', section => {
            section.timeSetting('closeTime').name('Close Time?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('closeTimerCallback', delay);

    })

    .scheduledEventHandler('closeTimerCallback', (context, event) => {
        
        console.log('Closing door')
        
        context.api.devices.sendCommands(context.config.door, 'doorControl', close)
    
        

	})
