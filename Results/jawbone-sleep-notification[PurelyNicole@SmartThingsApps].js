
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this Jawbone changes mode...', section => {
            section.deviceSetting('myJawbone').capability(['sleepSensor']).name('Your Jawbone');

        });


        page.section('Text this number...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.myJawbone, 'sleepSensor', 'sleeping', 'jawboneChange')

    })

    .subscribedEventHandler('jawboneChange', (context, event) => {
        
        console.log('The Jawbone staus has changed.')
        if (myJawbone.currentSleeping == 'not sleeping') {
        console.log('Jawbone has woken up.')
        state.alertmsg = myJawbone.displayName + ' has woken up.'
        }
        if (myJawbone.currentSleeping == 'sleeping') {
        console.log('Jawbone has gone to sleep')
        state.alertmsg = myJawbone.displayName + ' has gone to sleep.'
        }
        if (phoneNumber != null) {
        this.sendSms(phoneNumber, state.alertmsg)
        }
        

	})
