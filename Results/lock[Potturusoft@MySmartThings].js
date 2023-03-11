
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('updateCode', (context, event) => {
        
                let data = new JsonSlurper().parseText(event.data)
                let slot = event.value.toInteger()
                let code 
                if (data.code.isNumber()) {
                    code = data.code
                } else {
                    code = null
                }
                let previousCode = state.codes["slot$slot"]['code']
                state.codes["slot$slot"]['code'] = code 
                state.codes["slot$slot"]['codeState'] = 'known'
                this.debugger("Received: s:$slot c:$code")
                if (!state.refreshComplete) {
                    this.runIn(5, makeRequest)
                }
                if (previousCode != code ) {
                    this.codeInform(slot, code)
                }
            

	})

    .subscribedEventHandler('codeUsed', (context, event) => {
        
                let lockId = lock.id
                let message = ''
                let action = event.value
                let userApp = false
                let codeUsed = false
                let manualUse = false
                let data = false
                if (event.data) {
                    data = new JsonSlurper().parseText(event.data)
                    codeUsed = data.usedCode
                    if (codeUsed.isNumber()) {
                        userApp = this.findSlotUserApp(codeUsed)
                    }
                }
                if (!data || data?.usedCode == 'manual') {
                    manualUse = true
                }
                if (action == 'unlocked') {
                    if (userApp) {
                        message = "${lock.label} was unlocked by ${userApp.userName}"
                        userApp.incrementLockUsage(lock.id)
                        if (!(userApp.isNotBurned())) {
                            parent.setAccess()
                            message += '.  Now burning code.'
                        }
                        if (userApp.userUnlockPhrase) {
                            userApp.executeHelloPresenceCheck(userApp.userUnlockPhrase)
                        }
                        if (codeUnlockRoutine) {
                            this.executeHelloPresenceCheck(codeUnlockRoutine)
                        }
                        if (parent.codeUnlockRoutine) {
                            parent.executeHelloPresenceCheck(parent.codeUnlockRoutine)
                        }
                    } else {
                        if (manualUse) {
                            if (manualUnlockRoutine) {
                                this.executeHelloPresenceCheck(manualUnlockRoutine)
                            }
                            if (parent.manualUnlockRoutine) {
                                parent.executeHelloPresenceCheck(parent.manualUnlockRoutine)
                            }
                            message = "${lock.label} was unlocked manually"
                            if (notifyManualUnlock) {
                                this.send(message)
                            }
                            if (alexaManualUnlock) {
                                this.send(message)
                            }
                        }
                    }
                }
                if (action == 'locked') {
                    if (userApp) {
                        message = "${lock.label} was locked by ${userApp.userName}"
                        if (userApp.userLockPhrase) {
                            userApp.executeHelloPresenceCheck(userApp.userLockPhrase)
                        }
                        if (codeLockRoutine) {
                            this.executeHelloPresenceCheck(codeLockRoutine)
                        }
                        if (parent.codeLockRoutine) {
                            parent.executeHelloPresenceCheck(parent.codeLockRoutine)
                        }
                    }
                    if (data && data.usedCode == -1) {
                        message = "${lock.label} was locked by keypad"
                        if (keypadLockRoutine) {
                            this.executeHelloPresenceCheck(keypadLockRoutine)
                        }
                        if (notifyKeypadLock) {
                            this.send(message)
                        }
                        if (alexaKeypadLock) {
                            this.askAlexa(message)
                        }
                    }
                    if (manualUse) {
                        message = "${lock.label} was locked manually"
                        if (manualLockRoutine) {
                            this.executeHelloPresenceCheck(manualLockRoutine)
                        }
                        if (parent.manualLockRoutine) {
                            parent.executeHelloPresenceCheck(parent.manualLockRoutine)
                        }
                        if (notifyManualLock) {
                            this.send(message)
                        }
                        if (alexaManualLock) {
                            this.askAlexa(message)
                        }
                    }
                }
                if (userApp && message ) {
                    this.debugger('Sending message: ' + message )
                    if (action == 'unlocked') {
                        if (userApp.notifyAccess || parent.notifyAccess) {
                            userApp.send(message)
                        }
                        if (userApp.alexaAccess || parent.alexaAccess) {
                            userApp.sendAskAlexa(message)
                        }
                    } else {
                        if (action == 'locked') {
                            if (userApp.notifyLock || parent.notifyLock) {
                                userApp.send(message)
                            }
                            if (userApp.alexaLock || parent.alexaLock) {
                                userApp.sendAskAlexa(message)
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('pollCodeReport', (context, event) => {
        
                let codeData = new JsonSlurper().parseText(event.data)
                state.codeSlots = codeData.codes
                let codeSlots = this.lockCodeSlots()
                this.initSlots()
                this.debugger("Received: $codeData")
                (1.. codeSlots ).each({ let slot ->
                    let code = codeData."code$slot"
                    if (code != null) {
                        if (code.isNumber()) {
                        } else {
                            code = null
                        }
                    }
                    state.codes["slot$slot"]['code'] = code 
                    if (state.codes["slot$slot"]['codeState'] != 'refresh') {
                        state.codes["slot$slot"]['codeState'] = 'known'
                    }
                })
                state.initializeComplete = true
                this.setCodes()
            

	})
