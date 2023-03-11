
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s AC power loss on...', section => {
            section.deviceSetting('myDevice').capability(['battery']).name('Where?');

        });


        page.section('Via a push notification and a text message(optional)', section => {
            section.enumSetting('pushAndPhone').name('Send Text?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.myDevice, 'battery', 'powerSource.battery', 'onBatteryPowerHandler')

    })

    .subscribedEventHandler('onBatteryPowerHandler', (context, event) => {
        
        log.trace("${event.value}: $evt, $settings")
        let msg = "${(myDevice.label) ? myDevice.label : myDevice.name} detected going to battery power"
        console.log('sending push')
        this.sendPush(msg)
        if (phone1 && pushAndPhone ) {
        console.log("sending SMS to $phone1")
        this.sendSms(phone1, msg)
        }
        

	})
