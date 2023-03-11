
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s AC power loss on...', section => {
            section.deviceSetting('myDevice').capability(['contactSensor']).name('Where?');

        });


        page.section('Via a push notification and a text message(optional)', section => {
            section.enumSetting('pushAndPhone').name('Send Text?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.myDevice, 'contactSensor', 'powered.powerOff', 'lostPowerHandler')

    })

    .subscribedEventHandler('lostPowerHandler', (context, event) => {
        
        log.trace("${event.value}: $evt, $settings")
        let msg = "${(myDevice.label) ? myDevice.label : myDevice.name} detected loss of input power"
        console.log('sending push')
        this.sendPush(msg)
        if (phone1 && pushAndPhone ) {
        console.log("sending SMS to $phone1")
        this.sendSms(phone1, msg)
        }
        

	})
