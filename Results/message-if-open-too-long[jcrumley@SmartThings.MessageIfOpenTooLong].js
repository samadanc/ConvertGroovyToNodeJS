
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Title'', section => {

        });


        page.section('Turn on when activated:', section => {
            section.deviceSetting('tomonitor').capability(['contactSensor']).name('Contact Sensor to monitor');
            section.deviceSetting('tomonitorWet').capability(['waterSensor']).name('Moisture Sensor to monitor');
            section.timeSetting('startTime').name('Time to start monitoring');
            section.timeSetting('endTime').name('Time to stop monitoring');
            section.booleanSetting('sendImmediate').name('Send immediate notification');
            section.booleanSetting('repeat').name('Repeat notifications');

        });


        page.section('Send a text message to...', section => {

        });


        page.section('Open alarm threshold (defaults to 5 min)', section => {
            section.numberSetting('openalarmthreshold').name('Send after open x minutes');
            section.numberSetting('repeatmessagedelay').name('Repeat every X minutes');

        });


        page.section('Identifier', section => {
            section.textSetting('identifier').name('Text in message');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.tomonitorWet, 'waterSensor', 'water', 'contactHandler')

        context.api.schedules.schedule('checkOpen', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.tomonitor, 'contactSensor', 'contact', 'contactHandler')

        context.api.schedules.schedule('checkOpenTimeBounded', delay);

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log('contactHandler: Called')
        console.log("contactHandler: Contact is in ${event.value} state")
        if ('open' == event.value || 'wet' == event.value) {
        if (this.inTimeWindow()) {
        if (sendImmediate == true) {
        this.checkOpen()
        console.log('contactHandler: immediate checkOpen')
        }
        if (sendImmediate != true || repeat != true) {
        let openDoorAwayInterval = openalarmthreshold ? openalarmthreshold * 60 : 5
        this.runIn(openDoorAwayInterval, checkOpenTimeBounded)
        console.log('contactHandler: checkOpen scheduled in ' + openDoorAwayInterval.toString())
        }
        } else {
        this.checkOpen()
        console.log('contactHandler: immediate checkOpen2')
        }
        }
        if ('closed' == event.value || 'dry' == event.value) {
        if (state.triggered == true) {
        console.log('contactHandler has been triggered')
        state.triggered = false
        state.counter = 0
        let message = identifier + ' Closed/Dry'
        if (location.contactBookEnabled) {
        this.sendNotificationToContacts(message, recipients)
        console.log('contactHandler:  notificationContacts')
        } else {
        this.sendSms(phone1, message)
        if (phone2) {
        this.sendSms(phone2, message)
        }
        console.log('contactHandler:  sendSMS')
        }
        }
        }
        

	})

    .scheduledEventHandler('checkOpenTimeBounded', (context, event) => {
        
        console.log('checkOpenTimeBounded: Called')
        if (this.inTimeWindow()) {
        this.checkOpen()
        }
        

	})

    .scheduledEventHandler('checkOpen', (context, event) => {
        
        if (this.checkOn()) {
        let message = identifier + ' Open/Wet (' + state.counter.toString() + ')'
        if (location.contactBookEnabled) {
        this.sendNotificationToContacts(message, recipients)
        console.log('checkOpen:  notificationContacts')
        } else {
        this.sendSms(phone1, message)
        if (phone2) {
        this.sendSms(phone2, message)
        }
        console.log('checkOpen:  sendSMS (' + state.counter.toString() + ')')
        }
        state.triggered = true
        state.counter = state.counter + 1
        if (repeat == true) {
        let repeatTime = repeatmessagedelay ? repeatmessagedelay * 60 : openalarmthreshold ? openalarmthreshold * 60 : 5
        console.log('checkOpen:  repeat in ' + repeatTime.toString())
        this.unschedule(checkOpenTimeBounded)
        this.unschedule(checkOpen)
        this.runIn(repeatTime, checkOpen)
        }
        let summarySound = this.textToSpeech(message, true)
        } else {
        console.log('checkOpen:  has been closed/dry.  don\'t send')
        }
        

	})
