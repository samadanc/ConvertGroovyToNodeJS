
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sleep mode...', section => {
            section.deviceSetting('sleepOn').capability(['switch']).name('Turn on switches?');
            section.deviceSetting('sleepOff').capability(['switch']).name('Turn off switches?');
            section.deviceSetting('sleepMotion').capability(['motionSensor']).name('If no motion here');
            section.numberSetting('sleepDelay').name('For x minutes');
            section.timeSetting('sleepStarting').name('Starting from');
            section.timeSetting('sleepEnding').name('Ending at');

        });


        page.section('Wake up mode...', section => {
            section.deviceSetting('wakeUpOn').capability(['switch']).name('Turn on switches?');
            section.deviceSetting('wakeUpOff').capability(['switch']).name('Turn off switches?');
            section.deviceSetting('wakeUpMotion').capability(['motionSensor']).name('If motion here');
            section.timeSetting('wakeUpStarting').name('Starting from');
            section.timeSetting('wakeUpEnding').name('Ending at');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.wakeUpMotion, 'motionSensor', 'motion', 'wakeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sleepMotion, 'motionSensor', 'motion', 'sleepHandler')

    })

    .subscribedEventHandler('sleepHandler', (context, event) => {
        
        log.trace('sleepHandler')
        
        context.api.devices.sendCommands(context.config.sleepMotion, 'motionSensor', currentValue)
    
        let motionValue = sleepMotion.find({
        it.currentMotion == 'active'
        })
        if (motionValue) {
        log.info('Motion, so not ready to sleep')
        state.motionStopTime = null
        } else {
        log.info('No Motion, so getting ready to go to sleep whenever the time is there')
        state.motionStopTime = this.now()
        if (sleepDelay) {
        this.runIn(sleepDelay * 60, goToSleep, ['overwrite': false])
        log.info("Delay (motion): $sleepDelay minutes")
        } else {
        this.goToSleep()
        }
        }
        

	})

    .subscribedEventHandler('wakeHandler', (context, event) => {
        
        log.trace('wakeHandler')
        
        context.api.devices.sendCommands(context.config.wakeUpMotion, 'motionSensor', currentValue)
    
        let motionValue = wakeUpMotion.find({
        it.currentMotion == 'active'
        })
        if (motionValue) {
        log.info('Motion, so will wake up if the time is there')
        state.motionStopTime = null
        if (allOkWake) {
        this.goToWake()
        }
        } else {
        log.info('No Motion, so not ready to go to wake up')
        state.motionStopTime = this.now()
        }
        

	})
