
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Tturn these lights on', section => {
            section.deviceSetting('lights').capability(['switch']).name('Lights');

        });


        page.section('only when these devices are not present', section => {
            section.deviceSetting('presenceDevices').capability(['presenceSensor']).name('Presence Devices');
            section.numberSetting('falseAlarmThreshold').name('Delay (1 minute minimum)');

        });


        page.section('between these times', section => {
            section.enumSetting('fromTime').name('From');
            section.numberSetting('fromTimeDelay').name('+ minutes');
            section.enumSetting('toTime').name('To');
            section.numberSetting('toTimeDelay').name('+ minutes');
            section.booleanSetting('pushNotifications').name('Enable Push Notifications');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'fromtime', 'lightsOnDelay')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceDevices, 'presenceSensor', 'presence', 'presenceEventHandler')

        context.api.schedules.schedule('lightsOnDelay', delay);

        context.api.schedules.schedule('lightsOffDelay', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'toTime', 'lightsOffDelay')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'fromTime', 'lightsOnDelay')

    })

    .subscribedEventHandler('presenceEventHandler', (context, event) => {
        
        this.sendNotificationEvent('Presense Event Fired')
        if (event.value == 'not present') {
        this.sendNotificationEvent('Someone Left')
        if (this.everyoneIsAway()) {
        this.runIn(this.findFalseAlarmThreshold() * 60, 'checkScheduleAndTurnOnLights', ['overwrite': false])
        }
        } else {
        this.sendNotificationEvent('Someone Arrived')
        this.runIn(this.findFalseAlarmThreshold() * 60, 'lightsOff', ['overwrite': false])
        }
        

	})

    .subscribedEventHandler('lightsOnDelay', (context, event) => {
        
        this.sendNotificationEvent("Lights On Scheduled for $currentFromDelay minutes.")
        let currentFromDelay = this.findFromTimeDelay()
        this.runIn(currentFromDelay * 60, 'checkScheduleAndTurnOnLights', ['overwrite': false])
        

	})

    .subscribedEventHandler('lightsOffDelay', (context, event) => {
        
        this.sendNotificationEvent("Lights off Delay scheduled for $currentToDelay minutes")
        let currentToDelay = this.findToTimeDelay()
        this.runIn(currentToDelay * 60, 'lightsOff', ['overwrite': false])
        

	})

    .scheduledEventHandler('lightsOnDelay', (context, event) => {
        
        this.sendNotificationEvent("Lights On Scheduled for $currentFromDelay minutes.")
        let currentFromDelay = this.findFromTimeDelay()
        this.runIn(currentFromDelay * 60, 'checkScheduleAndTurnOnLights', ['overwrite': false])
        

	})

    .scheduledEventHandler('lightsOffDelay', (context, event) => {
        
        this.sendNotificationEvent("Lights off Delay scheduled for $currentToDelay minutes")
        let currentToDelay = this.findToTimeDelay()
        this.runIn(currentToDelay * 60, 'lightsOff', ['overwrite': false])
        

	})
