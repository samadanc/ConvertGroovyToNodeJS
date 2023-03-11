
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.numberSetting('minutes').name('Minutes of Delay between opening contact and notification');

        });


        page.section('', section => {
            section.numberSetting('notificationHumidity').name('This Humidity or Higher to be notified');

        });


        page.section('', section => {
            section.deviceSetting('contactSensor').capability(['contactSensor']).name('Contact Sensor to get Notified About');
            section.deviceSetting('humiditySensor').capability(['relativeHumidityMeasurement']).name('Get humidity readings from this sensor');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');
            section.textSetting('notificationText').name('What would you like your notification to say?');
            section.textSetting('notificationHumidtyDoorLeftOpenText').name('What would you like the first part of your notification to say for Humidity got High, Left Open Reminders?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact', 'contactChangeEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensor, 'relativeHumidityMeasurement', 'humidity', 'humidityChangeEventHandler')

    })

    .subscribedEventHandler('humidityChangeEventHandler', (context, event) => {
        
        this.logtrace('Executing \'humidityChangeEventHandler\'')
        console.log("The value of this event is different from its previous value: ${event.isStateChange()}")
        if (event.isStateChange() && notificationHumidity <= this.getHumidity() && this.isContactSensorOpen()) {
        if (!state.hasLeftDoorOpen) {
        console.log('State Shows we have no reminder for Humidity Change. Lets create one.')
        state.hasLeftDoorOpen = true
        let notificationWords = "$notificationHumidtyDoorLeftOpenText The Humidity is now ${this.getHumidity()}% in the area."
        let reminderEventData = ['sendPushMessage': null, 'phoneNumber': null, 'notificationText': null]
        reminderEventData.phoneNumber = phoneNumber
        reminderEventData.sendPushMessage = sendPushMessage
        reminderEventData.notificationText = notificationWords
        this.runEvery30Minutes(remindUserHumidityEvent, ['data': reminderEventData ])
        }
        }
        this.logtrace('End Executing \'humidityChangeEventHandler\'')
        

	})

    .subscribedEventHandler('contactChangeEventHandler', (context, event) => {
        
        this.logtrace('Executing \'contactChangeEventHandler\'')
        console.log("The value of this event is different from its previous value: ${event.isStateChange()}")
        if (event.isStateChange() && notificationHumidity <= this.getHumidity()) {
        if (this.isContactSensorOpen()) {
        let eventData = ['sendPushMessage': null, 'phoneNumber': null, 'notificationText': null]
        eventData.sendPushMessage = sendPushMessage
        eventData.notificationText = notificationText
        console.log("Contact Open - High Humidity: Schedule Notification for ${(minutes * 60)} seconds")
        this.runIn(minutes * 60, notifyUser, ['overwrite': true, 'data': eventData ])
        let reminderEventData = ['sendPushMessage': null, 'phoneNumber': null, 'notificationText': null]
        reminderEventData.phoneNumber = phoneNumber
        reminderEventData.sendPushMessage = sendPushMessage
        reminderEventData.notificationText = notificationText
        this.runEvery30Minutes(remindUser, ['data': reminderEventData ])
        } else {
        console.log('Contact Closed: Un-schedule any active notifications')
        this.unscheduleNotificaitons()
        }
        } else {
        console.log("State: ${event.isStateChange()} Humidity: ${this.getHumidity()}. We can ignore")
        }
        this.logtrace('End Executing \'contactChangeEventHandler\'')
        

	})
