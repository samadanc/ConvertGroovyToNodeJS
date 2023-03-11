
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
                console.log("The ${lock1.displayName} lock is ${lock1.latestValue(lock)}")
                let data = []
                if (event.name == 'lock') {
                    if (event.value == 'unlocked') {
                        state.lastLockStatus = 'unlocked'
                        let isManual = false
                        if (event.data == '' || event.data == null) {
                            isManual = true
                        } else {
                            data = new JsonSlurper().parseText(event.data)
                            if (data.usedCode == '' || data.usedCode == null) {
                                console.log("Unknown extended data ($data), treating as manual unlock")
                                isManual = true
                            }
                        }
                        if (isManual) {
                            if (manualUnlock) {
                                if (this.anyoneIsHome()) {
                                    console.log('Manual/keyed unlock but someone is already present, no Action taken')
                                    return null
                                }
                                if (manualUnlockException) {
                                    console.log("${lock1.displayName} was manually unlocked - Someone is Home!")
                                    this.notify("Running "${settings.manualPhrase}" because ${lock1.displayName} was manually unlocked by someone.")
                                    location.helloHome.execute(settings.manualPhrase)
                                } else {
                                    console.log("${lock1.displayName} was manually unlocked - Someone is Home!")
                                    this.notify("Running "${settings.homePhrase}" because ${lock1.displayName} was manually unlocked by someone.")
                                    location.helloHome.execute(settings.homePhrase)
                                }
                                state.lastUser = 'Someone'
                            }
                        } else {
                            Integer i = (data.usedCode as Integer)
                            console.log("Unlocked with code $i")
                            if (enableDistressCode) {
                                if (i == distressCode ) {
                                    log.info('Sending Mayday message(s)')
                                    if (smsMayday) {
                                        this.sendSms(phone1, distressMsg)
                                    }
                                    if (pushMayday) {
                                        this.sendPush(distressMsg)
                                    }
                                    if (notifyAlso) {
                                        this.sendNotificationEvent(distressMsg)
                                    }
                                }
                            }
                            let foundUser = ''
                            let userName = settings."userNames$i"
                            if (userName != null) {
                                foundUser = userName 
                            }
                            if (foundUser == '' && settings.anonymousAllowed) {
                                foundUser = 'Unspecified Person'
                            }
                            if (foundUser != '') {
                                if (this.anyoneIsHome()) {
                                    console.log("Unlocked with code ${data.usedCode} - $foundUser is Home but someone is already present, no Action taken")
                                    return null
                                }
                                console.log("Unlocked with code ${data.usedCode} - $foundUser is Home!")
                                this.notify("Running "${settings.homePhrase}" because $foundUser unlocked ${lock1.displayName}.")
                                state.lastUser = foundUser 
                                location.helloHome.execute(settings.homePhrase)
                            } else {
                                if (this.anyoneIsHome()) {
                                    console.log("Unlocked by Unspecified Person (Code ID#${data.usedCode}, but someone is already present, no Action taken")
                                    return null
                                }
                                let doorMsg = "Unlocked by Unspecified Person (Code ID#${data.usedCode}), not running "$homePhrase""
                                if (autoLock) {
                                    lock1.lock()
                                    doorMsg = doorMsg + ' and auto-locking'
                                }
                                this.notify(doorMsg)
                            }
                        }
                    } else {
                        if (event.value == 'locked') {
                            state.lastLockStatus = 'locked'
                            if (this.anyoneIsHome()) {
                                console.log('Someone is already present, no Action taken')
                                return null
                            }
                            if (location.mode == 'Away') {
                                return null
                            }
                            if (state.lastUser != '') {
                                this.notify("Running "${settings.awayPhrase}" because ${state.lastUser} locked ${lock1.displayName} and nobody else is at home.")
                                state.lastUser = ''
                                location.helloHome.execute(settings.awayPhrase)
                            }
                        } else {
                            if (event.value == 'unknown') {
                                if (state.lastLockStatus == 'locked') {
                                    state.lastLockStatus = 'jammed'
                                    console.log('Lock jammed, attempting to unlock')
                                    settings.lock1.unlock()
                                } else {
                                    state.lastLockStatus = 'partial'
                                    console.log('Partially locked, attempting to re-lock')
                                    settings.lock1.lock()
                                }
                            } else {
                                console.log("Unknown event value: ${event.value}")
                            }
                        }
                    }
                }
            

	})
