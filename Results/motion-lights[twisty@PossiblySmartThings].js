
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When motion is detected...', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion sensor:');

        });


        page.section('These devices are switched on...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Choose switches or lights:');

        });


        page.section('Turn off again after...', section => {
            section.numberSetting('minutesLater').name('Minutes:');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion.active', 'motionActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchActivityHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'level', 'switchActivityHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion.inactive', 'motionInactiveHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        console.log('== motionActiveHandler ==')
        if (this.isLight()) {
        log.warn('Not triggering switches: it is light at the moment.')
        } else {
        if (state.isTurnedOn == false) {
        state.isTurnedOn = true
        this.captureSwitchState()
        this.resetTouchedState()
        this.switchOn()
        } else {
        log.warn('Not triggering switches: already triggered.')
        }
        }
        

	})

    .subscribedEventHandler('motionInactiveHandler', (context, event) => {
        
        console.log('== motionInactiveHandler ==')
        if (state.isTurnedOn == true) {
        let delay = this.getDelay()
        log.info("Restoring switches in $minutesLater minutes ($delay seconds)")
        this.runIn(delay, restoreSwitches)
        }
        

	})

    .subscribedEventHandler('switchActivityHandler', (context, event) => {
        
        console.log('== switchActivityHandler ==')
        if (state.isTurnedOn == true) {
        let id = event.device.getId()
        if (state.switchTouched[ id ] == false) {
        if (state.initialSwitchLevels[ id ]) {
        let adjustedLevel = this.getLevelAdjustment(state.initialSwitchLevels[ id ])
        if (event.device.currentLevel != adjustedLevel ) {
        log.info('Level was changed with since setting by us. Flagging that we shouldn\'t restore this switch.')
        state.switchTouched[ id ] = true
        }
        }
        if (event.device.currentSwitch == 'off') {
        log.info('Switch was turned off since turning on by us. Flagging that we shouldn\'t restore this switch.')
        state.switchTouched[ id ] = true
        }
        }
        }
        

	})
