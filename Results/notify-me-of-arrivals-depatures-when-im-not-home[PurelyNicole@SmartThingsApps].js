
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I\'m not home...', section => {
            section.deviceSetting('presenceUser1').capability(['presenceSensor']).name('Your Presense Sensor');

        });


        page.section('Let me know when this person comes and goes...', section => {
            section.deviceSetting('presenceUser2').capability(['presenceSensor']).name('Sensor to Track');

        });


        page.section('By sending a message to...', section => {
            section.booleanSetting('pushAlert').name('Send push alert?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presenceUser2, 'presenceSensor', 'presence', 'user2change')

    })

    .subscribedEventHandler('user2change', (context, event) => {
        
        console.log('User 2\'s presense status has changed.')
        if (presenceUser1.currentPresence == 'not present') {
        console.log('User 1 not home, send message.')
        if (presenceUser2.currentPresence == 'not present') {
        console.log('User 2 has left home.')
        state.alertmsg = presenceUser2.displayName + ' has left home.'
        }
        if (presenceUser2.currentPresence == 'present') {
        console.log('User 2 has left home.')
        state.alertmsg = presenceUser2.displayName + ' has arrived at home.'
        }
        if (pushAlert == true) {
        this.sendPush(state.alertmsg)
        }
        if (phoneNumber != null) {
        this.sendSms(phoneNumber, state.alertmsg)
        }
        }
        if (presenceUser1.currentPresence == 'present') {
        console.log('User 1 is home, do not send message.')
        }
        

	})
