
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('codeReturn', (context, event) => {
        
                let codeNumber = event.data.replaceAll('\D+', '')
                let codeSlot = event.integerValue.toInteger()
                let lock = event.device
                if (userSlot.toInteger() == codeSlot ) {
                    if (codeNumber == '') {
                        if (state."lock${lock.id}".access == true) {
                            console.log("Lock is ${state.lock${lock.id}.access} setting to false!")
                            state."lock${lock.id}".access = false
                            if (notifyAccessEnd || parent.notifyAccessEnd) {
                                let message = "${app.label} no longer has access to ${event.displayName}"
                                if (codeNumber.isNumber()) {
                                    state."lock${lock.id}".codes."slot$codeSlot" = codeNumber 
                                }
                                this.send(message)
                            }
                        }
                    } else {
                        if (state."lock${lock.id}".access == false) {
                            state."lock${lock.id}".access = true
                            if (notifyAccessStart || parent.notifyAccessStart) {
                                let message = "${app.label} now has access to ${event.displayName}"
                                if (codeNumber.isNumber() && codeNumber.toInteger() != userCode.toInteger()) {
                                    console.log("code: $codeNumber should be ${userCode.toInteger()}")
                                    console.log('set message to null')
                                    message = null
                                }
                                if (message) {
                                    this.send(message)
                                }
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('codeUsed', (context, event) => {
        
                console.log('codeUsed event.value: ' + event.value + '. event.data: ' + event.data)
                let message = null
                let lockId = event.deviceId
                if (event.value == 'unlocked' && event.data) {
                    let codeData = new JsonSlurper().parseText(event.data)
                    if (codeData.usedCode && codeData.usedCode.isNumber() && codeData.usedCode.toInteger() == userSlot.toInteger()) {
                        this.runIn(10, doPoll)
                        message = "${event.displayName} was unlocked by ${app.label}"
                        state."lock$lockId".usage = state."lock$lockId".usage + 1
                        if (!(this.isNotBurned())) {
                            message += '.  Now burning code.'
                        }
                        if (userUnlockPhrase) {
                            location.helloHome.execute(userUnlockPhrase)
                        }
                    }
                } else {
                    if (event.value == 'locked' && settings.notifyLock) {
                    }
                }
                if (message) {
                    console.log('Sending message: ' + message )
                    this.send(message)
                }
            

	})
