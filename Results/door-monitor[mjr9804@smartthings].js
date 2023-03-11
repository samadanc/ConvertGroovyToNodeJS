
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('doors').capability(['contactSensor']).name('Doors');
            section.deviceSetting('locks').capability(['lock']).name('Locks');

        });


        page.section('', section => {
            section.booleanSetting('pushNotif').name('Send a push notification');
            section.booleanSetting('textNotif1').name('Send a text message to Phone #1');
            section.booleanSetting('textNotif2').name('Send a text message to Phone #2');

        });


        page.section('If an alarm goes off', section => {
            section.booleanSetting('homeAlarmAlert').name('Alert me');
            section.booleanSetting('homeAlarmClose').name('Close all doors');
            section.booleanSetting('homeAlarmLock').name('Lock all doors');

        });


        page.section('If a door was left open', section => {
            section.booleanSetting('leaveDoorOpenAlert').name('Alert me');

        });


        page.section('If a lock was left unlocked', section => {
            section.booleanSetting('leaveLockUnlockedAlert').name('Alert me');

        });


        page.section('If an alarm goes off', section => {
            section.booleanSetting('awayAlarmAlert').name('Alert me');
            section.booleanSetting('awayAlarmClose').name('Close all doors');
            section.booleanSetting('awayAlarmLock').name('Lock all doors');

        });


        page.section('If a door unlocks', section => {
            section.booleanSetting('awayUnlockAlert').name('Alert me');
            section.booleanSetting('awayUnlockDisarm').name('Disable the alarm');

        });


        page.section('If a door opens', section => {
            section.booleanSetting('awayOpenAlert').name('Alert me');
            section.numberSetting('awayOpenDelay').name('With a delay of (seconds)');

        });


        page.section('If an alarm goes off', section => {
            section.booleanSetting('nightAlarmAlert').name('Alert me');
            section.booleanSetting('nightAlarmClose').name('Close all doors');
            section.booleanSetting('nightAlarmLock').name('Lock all doors');

        });


        page.section('If a door unlocks', section => {
            section.booleanSetting('nightUnlockAlert').name('Alert me');

        });


        page.section('If a door opens', section => {
            section.booleanSetting('nightOpenAlert').name('Alert me');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doors, 'contactSensor', 'contact', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'tamper', 'evtHandler')

    })

    .subscribedEventHandler('evtHandler', (context, event) => {
        
        let descText = event.descriptionText.replaceAll('^\{\{ [a-zA-Z_]+ \}\}', "${event.device}")
        console.log("event name: ${event.name}")
        console.log("display name: $displayName")
        console.log("desc text: $descText")
        console.log("string value: ${event.stringValue}")
        console.log("device: ${event.device}")
        this.takeAction(event.stringValue, descText, event.name)
        

	})
