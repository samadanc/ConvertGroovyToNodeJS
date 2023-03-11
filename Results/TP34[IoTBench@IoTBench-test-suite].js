
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which mode changes trigger the check?', section => {

        });


        page.section('Which doors, windows, and locks should I check?', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Which door(s)?');
            section.deviceSetting('locks').capability(['lock']).name('Which lock?');
            section.deviceSetting('contactsNonSecure').capability(['contactSensor']).name('These doors/windows should be checked but do not effect security.');

        });


        page.section('When should I check? (once per day)', section => {
            section.timeSetting('timeToCheck').name('When?(Optional)');

        });


        page.section('Vacation mode: Check every X hours. (minimum every 5 hours)', section => {
            section.numberSetting('timeToCheckVacation').name('How often? (Optional)');

        });


        page.section('Notification delay... (defaults to 2 min)', section => {

        });


        page.section('Add SMS alerts?', section => {
            section.enumSetting('pushAndPhone').name('Send push message too?');

        });


        page.section('Settings', section => {
            section.enumSetting('sendPushUnsecure').name('Send a SMS/push notification when home is unsecure?');
            section.enumSetting('sendPushSecure').name('Send a SMS/push notification when house is secure?');
            section.enumSetting('lockAuto').name('Lock door(s) automatically if found unsecure?');

        });


        page.section('More options', section => {
            section.enumSetting('days').name('Only on certain days of the week');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkDoor', delay);

    })

    .scheduledEventHandler('checkDoor', (context, event) => {
        
        if (allOk) {
        console.log('checkDoor')
        let openContacts = contacts.findAll({
        it?.latestValue('contact') == 'open'
        })
        let openLocks = locks.findAll({
        it?.latestValue('lock') == 'unlocked'
        })
        let openContactsNonSecure = contactsNonSecure.findAll({
        it?.latestValue('contact') == 'open'
        })
        if (openContacts || openLocks ) {
        if (openContacts && openLocks ) {
        let message = "ALERT: ${openContacts.join(, )} and ${openLocks.join(, )} are unsecure!"
        this.sendUnsecure(message)
        if (lockAuto != 'No') {
        this.lockDoors()
        }
        } else {
        let message = "ALERT: ${openContacts.join(, )} ${openLocks.join(, )} unsecure!"
        this.sendUnsecure(message)
        if (lockAuto != 'No') {
        this.lockDoors()
        }
        }
        } else {
        if (!openContacts && !openLocks && openContactsNonSecure ) {
        let message = "Your home is secure but ${openContactsNonSecure.join(, )} left open."
        this.sendSecure(message)
        } else {
        if (!openContacts && !openLocks && !openContactsNonSecure) {
        let message = 'All doors, windows, and locks are secure.'
        this.sendSecure(message)
        }
        }
        }
        }
        

	})
