
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('onMotion', (context, event) => {
        
                if (!enabled) {
                    this.logDebug('Disabled, skipping')
                    return null
                }
                this.unschedule(turnOffRestore)
                switches.each({ 
                    state.it.id = null
                })
                let timeOk = this.timeToRun()
                this.logDebug("TimeOk =$timeOk")
                if (timeOk == false && this.luxLevelToRun() == false) {
                    return null
                }
                let dayOk = this.dayToRun()
                this.logDebug("DayOk =$dayOk")
                if (!dayOk) {
                    return null
                }
                switches.each({ 
                    if (ifOffOrLower) {
                        if (it.currentSwitch == 'off') {
                            if (it.hasCommand('setLevel') == false) {
                                this.logDebug("1) Turning switch ${it.displayName} ON")
                                it.on()
                            } else {
                                this.logDebug("Setting ${it.displayName} to ${settings.level}%")
                                it.setLevel(settings.level)
                            }
                        } else {
                            if (it.hasCommand('setLevel') && settings.level > it.currentValue('level')) {
                                state.it.id = it.currentValue('level')
                                this.logDebug("${it.displayName} is at ${state.it.id}%")
                                this.logDebug("Raising ${it.displayName} to ${settings.level}%")
                                it.setLevel(settings.level)
                            }
                        }
                    } else {
                        if (it.hasCommand('setLevel')) {
                            it.setLevel(settings.level)
                            this.logDebug("Setting ${it.displayName} level to ${settings.level}")
                        } else {
                            this.logDebug("2) Turning switch ${it.displayName} ON")
                            it.on()
                        }
                    }
                })
                if (turnOffAfterMotion) {
                    this.logDebug('Waiting for motion to stop')
                    this.subscribe(motions, 'motion.inactive', onMotionStop)
                }
                this.subscribe(switches, 'switch.off', onTurnOff)
                this.subscribe(switches, 'switch.level', onLevelChange)
            

	})
