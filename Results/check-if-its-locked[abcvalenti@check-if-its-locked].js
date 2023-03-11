
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which lock(s) should I check?', section => {
            section.deviceSetting('locks').capability(['lock']).name('Which?');

        });


        page.section('Which mode changes trigger the check?', section => {

        });


        page.section('When should I check?', section => {
            section.timeSetting('timeToCheck').name('At this time');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkLocks', delay);

    })

    .scheduledEventHandler('checkLocks', (context, event) => {
        
        console.log('checking locks')
        let unLockedMessage = StringBuilder.newInstance()
        locks.each({
        console.log("${it.displayName} is ${it.currentLock}")
        if (it.currentLock == 'unlocked') {
        unLockedMessage.append("${it.displayName} is unlocked. ")
        console.log("$unLockedMessage")
        }
        })
        console.log("${unLockedMessage.size()}")
        if (unLockedMessage.size() > 0) {
        console.log(unLockedMessage)
        let strUnLockedMessage = unLockedMessage.toString()
        this.sendPush(strUnLockedMessage)
        }
        

	})
