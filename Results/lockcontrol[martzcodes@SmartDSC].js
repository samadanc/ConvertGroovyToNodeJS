
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('What Locks', section => {
            section.deviceSetting('locks').capability(['lock']).name('Lock');

        });


        page.section('User 1', section => {
            section.textSetting('name1').name('User Name');
            section.enumSetting('delete1').name('Delete User');

        });


        page.section('User 2', section => {
            section.textSetting('name2').name('User Name');
            section.enumSetting('delete2').name('Delete User');

        });


        page.section('User 3', section => {
            section.textSetting('name3').name('User Name');
            section.enumSetting('delete3').name('Delete User');

        });


        page.section('User 4', section => {
            section.textSetting('name4').name('User Name');
            section.enumSetting('delete4').name('Delete User');

        });


        page.section('User 5', section => {
            section.textSetting('name5').name('User Name');
            section.enumSetting('delete5').name('Delete User');

        });


        page.section('User 6', section => {
            section.textSetting('name6').name('User Name');
            section.enumSetting('delete6').name('Delete User');

        });


        page.section('Alarm Disarm', section => {
            section.enumSetting('alarmdisarm').name('Disarm the Alarm');
            section.deviceSetting('alarmThing').capability(['polling']).name('Alarm Thing');

        });


        page.section('Notifications', section => {
            section.enumSetting('pushnotify').name('Push Notify?');
            section.numberSetting('phone1').name('Phone Number');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'userunlock', 'userunlock')

    })

    .subscribedEventHandler('userunlock', (context, event) => {
        
        let usernames = [ name1 , name2 , name3 , name4 , name5 , name6 ]
        if (alarmdisarm == 'Yes') {
        if (alarmthing) {
        alarmthing.disarm()
        }
        }
        let msg = "User ${event.value}: ${usernames[(event.value.toInteger() - 1)]} Unlocked ${event.linkText}"
        console.log(msg)
        if (pushnotify == 'Yes') {
        this.sendPush(msg)
        }
        if (phone1) {
        this.sendSms(phone1, msg)
        }
        console.log("Event User?: ${event.user}")
        

	})
