
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('notifier').capability(['notification']).name('Notification Device');
            section.textSetting('message').name('Message Text');

        });


        page.section('', section => {
            section.timeSetting('timeToNotify').name('Time');

        });


        page.section('', section => {
            section.enumSetting('daysToNotify').name('Only on certain days of the week');
            section.deviceSetting('people').capability(['presenceSensor']).name('Only when present');

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('sendMessage', delay);

    })

    .scheduledEventHandler('sendMessage', (context, event) => {
        
        if 
        
        context.api.devices.sendCommands(context.config.notifier, 'notification', deviceNotification)
    
        }
        

	})
