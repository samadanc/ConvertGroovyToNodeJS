
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select contacts...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Which contact sensor?');
            section.enumSetting('openOrClosed').name('Notify when open or closed?');

        });


        page.section('For too long...', section => {
            section.numberSetting('maxOpenTime').name('Minutes?');

        });


        page.section('Keep sending reminder texts every ??? minutes (optional)', section => {
            section.numberSetting('reminderTime').name('Minutes?');

        });


        page.section('Text me at (optional, sends a push notification if not specified)...', section => {

        });


        page.section('Notify on google home:', section => {
            section.deviceSetting('speaker1').capability(['actuator']).name('Which speaker?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("${event.device} ${event.name}: ${event.value}")
        let isOpen = event.value == openOrClosed
        let isNotScheduled = state.status != 'scheduled'
        let openContacts = contact1.findAll({
        it.currentValue('contact') == openOrClosed
        })
        let scheduledContacts = state.scheduledContacts
        let bSchedule = false
        if (!openContacts) {
        console.log('All contacts closed. Cancelling runIn and clearing status.')
        this.clearStatus()
        this.unschedule(takeAction)
        } else {
        if (isOpen) {
        openContacts.each({
        if (!(scheduledContacts?.contains(it.label))) {
        scheduledContacts << it.label
        bSchedule = true
        console.log("New scheduled contacts:$it, All scheduled contacts:$scheduledContacts")
        }
        })
        state.scheduledContacts = scheduledContacts
        if (bSchedule) {
        state.status = 'scheduled'
        this.runIn(maxOpenTime * 60, takeAction, ['overwrite': false])
        }
        }
        }
        

	})
