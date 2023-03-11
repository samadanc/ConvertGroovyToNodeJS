
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('routine').capability(['switch']).name('Routine');

        });


        page.section('Trigger', section => {
            section.deviceSetting('door').capability(['contactSensor']).name('Door');
            section.timeSetting('startTime').name('Start Time');
            section.timeSetting('endTime').name('End Time');

        });


        page.section('', section => {
            section.deviceSetting('notifier').capability(['notification']).name('Notification Device');
            section.booleanSetting('logEnable').name('Enable debug logging?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.door, 'contactSensor', 'contact', 'handler_AwayAlert')

        await context.api.subscriptions.subscribeToDevices(context.config.door, 'contactSensor', 'contact.closed', 'doorHandler_RoutineSwitch')

    })

    .subscribedEventHandler('doorHandler_RoutineSwitch', (context, event) => {
        
        this.logDebug("doorHandler_RoutineSwitch: ${event.device} changed to ${event.value}")
        if (location.mode != 'Away' && this.timeOfDayIsBetween(this.timeToday(startTime), this.timeToday(endTime), new Date(), location.timeZone)) {
        
        context.api.devices.sendCommands(context.config.routine, 'switch', on)
    
        }
        

	})

    .subscribedEventHandler('handler_AwayAlert', (context, event) => {
        
        this.logDebug("handler_AwayAlert: ${event.device} changed to ${event.value}")
        if (location.mode == 'Away') {
        
        context.api.devices.sendCommands(context.config.notifier, 'notification', deviceNotification)
    
        }
        

	})
