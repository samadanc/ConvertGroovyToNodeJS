
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('motionEvent', (context, event) => {
        
                this.trace("motionEvent(${event.value})")
                if (event.isStateChange && this.inMode() && triggerType == this.triggerTypes()[0]) {
                    this.debug("Evaluating $motionSensors")
                    let ruleEval = this.motionRule()
                    if (ruleEval) {
                        this.debug("Running $motionSensors")
                        this.goForward()
                        this.unschedule(goBackward)
                    } else {
                        if (!ruleEval && motionToggle ) {
                            this.debug("Toggling after $motionTimeout minutes")
                            this.runIn(motionTimeout * 60, goBackward, ['overwrite': true])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('switchEvent', (context, event) => {
        
                this.trace("switchEvent(${event.value})")
                if (event.isStateChange && this.inMode() && triggerType == this.triggerTypes()[1]) {
                    this.debug("Evaluating $switches")
                    let ruleEval = this.switchRule()
                    if (ruleEval) {
                        this.debug("Running $lights")
                        this.goForward()
                        this.unschedule(goBackward)
                    } else {
                        if (!ruleEval && switchToggle ) {
                            this.debug("Toggling after $switchTimeout minutes")
                            this.runIn(switchTimeout * 60, goBackward, ['overwrite': true])
                        }
                    }
                }
            

	})
