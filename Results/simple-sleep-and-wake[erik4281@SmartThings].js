
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor motion sensors', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('If no motion here');

        });


        page.section('Go to sleep...', section => {
            section.numberSetting('sleepDelay').name('After X minutes without motion.');
            section.enumSetting('sleepAlarm').name('Set Smart Home Monitor mode to?');
            section.deviceSetting('sleepOn').capability(['switch']).name('Turn on switches?');
            section.deviceSetting('sleepOff').capability(['switch']).name('Turn off switches?');
            section.timeSetting('sleepStarting').name('Starting from');
            section.timeSetting('sleepEnding').name('Ending at');

        });


        page.section('Wake up...', section => {
            section.enumSetting('wakeAlarm').name('Set Smart Home Monitor mode to?');
            section.deviceSetting('wakeUpOn').capability(['switch']).name('Turn on switches?');
            section.deviceSetting('wakeUpOff').capability(['switch']).name('Turn off switches?');
            section.timeSetting('wakeUpStarting').name('Starting from');
            section.timeSetting('wakeUpEnding').name('Ending at');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        log.trace('Sleep & Wake eventHandler')
        
        context.api.devices.sendCommands(context.config.motionSensor, 'motionSensor', currentValue)
    
        let motionValue = motionSensor.find({
        it.currentMotion == 'active'
        })
        if (motionValue) {
        log.info('Motion detected')
        state.motionStopTime = null
        if (allOkWake) {
        this.goToWake()
        }
        } else {
        log.info('Motion stopped')
        state.motionStopTime = this.now()
        if (sleepDelay) {
        this.runIn(sleepDelay * 60, goToSleep)
        log.info("Delay (motion): $sleepDelay minutes")
        } else {
        this.goToSleep()
        }
        }
        

	})
