
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('heartbeat', delay);

    })

    .subscribedEventHandler('contact', (context, event) => {
        
                log.trace("contact ${event.value} for ${event.deviceId}")
                if (event.value == 'open' && !(state.openContactsByDeviceId.containsKey(event.deviceId))) {
                    state.openContactsByDeviceId[event.deviceId] = ['openTime': this.now() / 1000, 'nextReminder': this.timeNextReminderSeconds(this.now() / 1000), 'remindersCount': 0]
                } else {
                    state.openContactsByDeviceId.remove(event.deviceId)
                }
            

	})

    .scheduledEventHandler('heartbeat', (context, event) => {
        
                if (state.openContactsByDeviceId.size() == 0) {
                    return null
                }
                let currentTime = this.now() / 1000
                let openContacts = state.openContactsByDeviceId.sort({ 
                    it.value.nextReminder
                })
                let openContactsWithReminder = openContacts.findAll({ 
                    it.value.nextReminder < currentTime 
                })
                if (openContactsWithReminder.size() == 0) {
                    return null
                }
                let numberOfOpenContacts = openContactsWithReminder.size()
                let olderContactId = openContactsWithReminder.find({ 
                    true
                }).key
                let olderDeviceLabel = contacts.find({ 
                    it.id == olderContactId 
                }).displayName
                openContactsWithReminder.keySet().each({ 
                    let reminder = state.openContactsByDeviceId[ it ]
                    reminder.nextReminder = this.timeNextReminderSeconds(currentTime)
                    reminder.remindersCount = reminder.remindersCount + 1
                })
                let minutes = openContactsWithReminder.collect({ 
                    it.value.remindersCount
                }).min() * this.frequencyReminderMinutes()
                if (notification && modes?.contains(location.mode)) {
                    let msg = olderDeviceLabel + numberOfOpenContacts > 1 ? " (and ${(numberOfOpenContacts - 1)} other) were open" : ' was open' + ' for more than ' + minutes > 1 ? "$minutes minutes" : '1 minute'
                    this.sendPush(msg)
                    if (phone) {
                        this.sendSms(phone, msg)
                    }
                }
            

	})
