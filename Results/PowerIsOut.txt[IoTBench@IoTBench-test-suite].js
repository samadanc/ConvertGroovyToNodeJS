
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there is wired-power loss on...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Via a push notification and a text message(optional)', section => {
            section.enumSetting('pushAndPhone').name('Send Text?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'powerSource.battery', 'onBatteryPowerHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'powerSource.powered', 'PoweredPowerHandler')

    })

    .subscribedEventHandler('PoweredPowerHandler', (context, event) => {
        
        log.trace("${event.value}: $evt")
        let msg = "${(motion1.label) ? motion1.label : motion1.name} sensed Power is Back On!"
        console.log('sending push for power is back on')
        this.sendPush(msg)
        if (phone1 && pushAndPhone ) {
        console.log("sending SMS to $phone1")
        this.sendSms(phone1, msg)
        }
        

	})

    .subscribedEventHandler('onBatteryPowerHandler', (context, event) => {
        
        log.trace("${event.value}: $evt")
        let msg = "${(motion1.label) ? motion1.label : motion1.name} sensed Power is Out!"
        console.log('sending push for power is out')
        this.sendPush(msg)
        if (phone1 && pushAndPhone ) {
        console.log("sending SMS to $phone1")
        this.sendSms(phone1, msg)
        }
        

	})
