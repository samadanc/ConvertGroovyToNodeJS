
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select people\'s presence that will control your home\'s mode', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Mode settings', section => {
            section.enumSetting('modeNotify').name('Send notification when mode changes?');

        });


        page.section('Select contact sensors to check when everybody is away', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        console.log("event.name: ${event.value}")
        if (this.ignorePresenceChange() == true) {
        console.log('current mode is one of the ignoreModes; not evaluating')
        return null
        }
        if (event.value == 'not present') {
        if (location.mode != awayMode ) {
        console.log('checking if everyone is away')
        if (this.everyoneIsAway()) {
        console.log('starting sequence')
        this.runIn(this.findFalseAlarmThreshold() * 60, 'takeAction', ['overwrite': false])
        }
        } else {
        console.log('mode is the same, not evaluating')
        }
        } else {
        if (location.mode != homeMode ) {
        this.takeAction()
        } else {
        console.log('mode is the same, not evaluating')
        }
        }
        

	})
