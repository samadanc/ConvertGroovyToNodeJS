
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
                if (event.isStateChange) {
                    this.evaluateLock()
                }
            

	})

    .subscribedEventHandler('presenceEvent', (context, event) => {
        
                this.trace("presenceEvent(${event.value})")
                if (true) {
                    if (event.value == 'present' && arriveUnlocksDoor ) {
                        if (this.now() - state.lastLeave > presenceDelay * 60000) {
                            this.unlockDoor()
                            this.debug("Unlocking the ${this.getApp().label.toLowerCase()} after someone has arrived")
                        }
                    } else {
                        let allGone = true
                        people.each({ 
                            allGone &= !(it.currentValue('presence') == 'present')
                        })
                        if (allGone) {
                            this.lockDoor()
                            this.debug("Locking the ${this.getApp().label.toLowerCase()} after everyone has left")
                        }
                        state.lastLeave = this.now()
                    }
                }
            

	})

    .subscribedEventHandler('knockEvent', (context, event) => {
        
                this.trace("knockEvent(${event.value})")
                if (event.isStateChange) {
                    this.runIn(knockDelay ? knockDelay : 5, evaluateKnock, ['overwrite': true])
                    this.debug("Scheduling knock handler for ${this.getApp().label.toLowerCase()} to run in $knockDelay seconds")
                }
            

	})

    .subscribedEventHandler('outsideEvent', (context, event) => {
        
                this.trace("outsideEvent(${event.value})")
                if (event.isStateChange) {
                    if (!limitLightEvents || limitLightEvents && 'motion' in lightEvents ) {
                        this.turnOnLights()
                    }
                }
            

	})

    .subscribedEventHandler('lockEvent', (context, event) => {
        
                this.trace("lockEvent(${event.value})")
                if (event.isStateChange) {
                    let customMsg = event.value == 'locked' ? lockMessage : unlockMessage 
                    let defaultMsg = "The ${this.getApp().label.toLowerCase()} was ${event.value}."
                    state.whenUnlocked = this.now()
                    this.notify(notifyOnDoorEvents && event.value in doorEvents , useCustomDoorMessages, customMsg, defaultMsg)
                    if (!limitLightEvents || limitLightEvents && event.value in lightEvents ) {
                        this.turnOnLights()
                    }
                    this.evaluateLock()
                }
            

	})

    .subscribedEventHandler('contactEvent', (context, event) => {
        
                this.trace("contactEvent(${event.value})")
                if (event.isStateChange) {
                    let customMsg = event.value == 'open' ? openMessage : closeMessage 
                    let defaultMsg = "The ${this.getApp().label.toLowerCase()} was ${((event.value == open)) ? opened : event.value}."
                    this.notify(notifyOnDoorEvents && event.value in doorEvents , useCustomDoorMessages, customMsg, defaultMsg)
                    if (!limitLightEvents || limitLightEvents && event.value in lightEvents ) {
                        this.turnOnLights()
                    }
                    this.evaluateLock()
                }
            

	})

    .subscribedEventHandler('doorbellEvent', (context, event) => {
        
                this.trace("doorbellEvent(${event.value})")
                if (event.isStateChange) {
                    let defaultMsg = "Someone is ringing the ${this.getApp().label.toLowerCase()} doorbell."
                    this.notify(notifyDoorbell, useCustomDoorbellMessage, doorbellMessage, defaultMsg)
                    if (!limitLightEvents || limitLightEvents && 'doorbell' in lightEvents ) {
                        this.turnOnLights()
                    }
                }
            

	})
