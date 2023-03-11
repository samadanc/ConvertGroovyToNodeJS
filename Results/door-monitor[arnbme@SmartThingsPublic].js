
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor Contact Sensors not monitored in SmartHome when alarm is set to armed', section => {
            section.deviceSetting('thecontact').capability(['contactSensor']).name('One or more contact sensors');
            section.numberSetting('maxcycles').name('Maximum number of warning messages');
            section.numberSetting('thedelay').name('Number of minutes between messages from 1 to 15');
            section.booleanSetting('thesendPush').name('Send Push Notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thecontact, 'contactSensor', 'contact.closed', 'contactClosedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmStatusHandler')

    })

    .subscribedEventHandler('alarmStatusHandler', (context, event) => {
        
        console.log("Door Monitor caught alarm status change: ${event.value}")
        if (event.value == 'off') {
        this.killit()
        } else {
        if (this.countopenContacts() == 0) {
        this.killit()
        } else {
        this.new_monitor()
        }
        }
        

	})

    .subscribedEventHandler('contactClosedHandler', (context, event) => {
        
        console.log("contactClosedHandler called: ${event.value}")
        if (this.countopenContacts() == 0) {
        this.killit()
        }
        

	})
