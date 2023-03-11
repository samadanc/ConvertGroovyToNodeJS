
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('runRule', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'allHandler')

    })

    .subscribedEventHandler('allHandler', (context, event) => {
        
                log.info("${app.label}: ${event.displayName} ${event.name} ${event.value}")
                this.runRule(false)
            

	})

    .scheduledEventHandler('runRule', (context, event) => {
        
                state.token = 0
                let success = this.eval()
                if (success != state.success || delay ) {
                    this.unschedule(delayRule)
                    if (delayTrue && !delay) {
                        this.doDelay(delayTrue, success)
                    } else {
                        if (delayFalse && !delay) {
                            this.doDelay(delayFalse, success)
                        } else {
                            if (success) {
                                if (onSwitchTrue) {
                                    onSwitchTrue.on()
                                }
                                if (offSwitchTrue) {
                                    offSwitchTrue.off()
                                }
                                if (delayedOffTrue) {
                                    this.runIn(delayMinutesTrue * 60, delayOffTrue)
                                }
                                if (pendedOffTrue) {
                                    this.runIn(pendMinutesTrue * 60, pendingOffTrue)
                                }
                                if (pendedOffFalse) {
                                    this.unschedule(pendingOffFalse)
                                }
                                if (dimATrue) {
                                    dimATrue.setLevel(dimLATrue)
                                }
                                if (dimBTrue) {
                                    dimBTrue.setLevel(dimLBTrue)
                                }
                                if (lockTrue) {
                                    lockTrue.lock()
                                }
                                if (unlockTrue) {
                                    unlockTrue.unlock()
                                }
                                if (modeTrue) {
                                    this.setLocationMode(modeTrue)
                                }
                                if (pushTrue) {
                                    this.sendPush(msgTrue ? msgTrue : "Rule ${app.label} True")
                                }
                                if (phoneTrue) {
                                    this.sendSms(phoneTrue, msgTrue ? msgTrue : "Rule ${app.label} True")
                                }
                                if (pendedCloseTrue) {
                                    this.runIn(pendDoorMinutesTrue * 60, pendingCloseTrue)
                                }
                                if (onDoorOpen) {
                                    onDoorOpen.open()
                                }
                                if (onDoorClose) {
                                    onDoorClose.close()
                                }
                                if (myPhraseTrue) {
                                    location.helloHome.execute(myPhraseTrue)
                                }
                            } else {
                                if (onSwitchFalse) {
                                    onSwitchFalse.on()
                                }
                                if (offSwitchFalse) {
                                    offSwitchFalse.off()
                                }
                                if (delayedOffFalse) {
                                    this.runIn(delayMinutesFalse * 60, delayOffFalse)
                                }
                                if (pendedOffFalse) {
                                    this.runIn(pendMinutesFalse * 60, pendingOffFalse)
                                }
                                if (pendedOffTrue) {
                                    this.unschedule(pendingOffTrue)
                                }
                                if (dimAFalse) {
                                    dimAFalse.setLevel(dimLAFalse)
                                }
                                if (dimBFalse) {
                                    dimBFalse.setLevel(dimLBFalse)
                                }
                                if (lockFalse) {
                                    lockFalse.lock()
                                }
                                if (unlockFalse) {
                                    unlockFalse.unlock()
                                }
                                if (modeFalse) {
                                    this.setLocationMode(modeFalse)
                                }
                                if (myPhraseFalse) {
                                    location.helloHome.execute(myPhraseFalse)
                                }
                                if (pushFalse) {
                                    this.sendPush(msgFalse ? msgFalse : "Rule ${app.label} False")
                                }
                                if (phoneFalse) {
                                    this.sendSms(phoneFalse, msgFalse ? msgFalse : "Rule ${app.label} False")
                                }
                            }
                        }
                    }
                    state.success = success 
                    log.info(success ? "${app.label} is True" : "${app.label} is False")
                }
            

	})
