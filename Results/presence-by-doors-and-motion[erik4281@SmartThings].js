
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor this door...', section => {
            section.deviceSetting('contactSensor').capability(['contactSensor']).name('Contact opens');

        });


        page.section('... and this motion sensor(s)...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Motion here');

        });


        page.section('...override presence with these sensor(s)', section => {
            section.deviceSetting('overrideSensor').capability(['motionSensor']).name('Motion here');

        });


        page.section('Switch to this mode for home...', section => {
            section.enumSetting('homeAlarm').name('Set SHM mode to?');
            section.deviceSetting('homeOn').capability(['switch']).name('Turn on switches?');
            section.deviceSetting('homeOff').capability(['switch']).name('Turn off switches?');

        });


        page.section('Switch to this mode for away...', section => {
            section.enumSetting('awayAlarm').name('Set SHM mode to?');
            section.deviceSetting('awayOn').capability(['switch']).name('Turn on switches?');
            section.deviceSetting('awayOff').capability(['switch']).name('Turn off switches?');

        });


        page.section('Use this delay for away mode...', section => {
            section.numberSetting('delayMinutes').name('Change after X minutes');

        });


        page.section('Also monitor for sleepmode (to enable away from sleep', section => {
            section.enumSetting('pushOn').name('Send a push notification?');

        });


        page.section('Send PUSH...', section => {
            section.enumSetting('pushOn').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.active', 'motionActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact.open', 'contactOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.inactive', 'motionInactiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact.closed', 'contactCloseHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        console.log('contactOpenHandler')
        state.contactClose = null
        log.info(state.contactClose)
        if (awayModeOk || sleepModeOk ) {
        if (pushOn == 'Yes') {
        this.sendPush('Arrive: Home-mode activated and alarm switched off.')
        } else {
        this.sendNotificationEvent('Arrive: Home-mode activated and alarm switched off.')
        }
        this.changeHome()
        } else {
        if (pushOn == 'Yes') {
        this.sendPush('Front door opened.')
        } else {
        this.sendNotificationEvent('Front door opened.')
        }
        }
        this.runIn(300, doorChecker, ['overwrite': true])
        

	})

    .subscribedEventHandler('contactCloseHandler', (context, event) => {
        
        console.log('contactCloseHandler')
        state.contactClose = this.now()
        log.info(state.contactClose)
        log.info("Changing to away in $delayMinutes minutes")
        this.sendNotificationEvent('Front door closed.')
        this.runIn(delayMinutes * 60, changeAway, ['overwrite': true])
        

	})

    .subscribedEventHandler('motionInactiveHandler', (context, event) => {
        
        console.log('motionInactiveHandler')
        if (motionOk) {
        state.motionStop = null
        } else {
        state.motionStop = this.now()
        }
        log.info(state.motionStop)
        

	})

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        console.log('motionActiveHandler')
        state.motionStop = null
        log.info(state.motionStop)
        if (overrideSensor) {
        
        context.api.devices.sendCommands(context.config.overrideSensor, 'motionSensor', currentValue)
    
        let overrideValue = overrideSensor.find({
        it.currentMotion == 'active'
        })
        if (overrideValue && awayModeOk ) {
        if (pushOn == 'Yes') {
        this.sendPush('Motion: Home-mode activated and alarm switched off.')
        } else {
        this.sendNotificationEvent('Motion: Home-mode activated and alarm switched off.')
        }
        this.changeHome()
        }
        }
        

	})
