
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('nightBox', delay);

        context.api.schedules.schedule('morningUnlock', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'routinehandler')

    })

    .subscribedEventHandler('clearBoxhandler', (context, event) => {
        
                log.trace('clearBoxhandler')
                let action = this.clearancerequest()
            

	})

    .subscribedEventHandler('allowDeliveryhandler', (context, event) => {
        
                let action = this.allowDelivery()
            

	})

    .subscribedEventHandler('forceResethandler', (context, event) => {
        
                log.trace('forceResethandler')
                let action = this.unlockBox()
                let mode = this.setMode('unlocked')
                state.parcelCount = 0
                let parcelcount = this.setparcelCount(state.parcelCount)
                let boxStatus = this.setboxStatus('empty')
            

	})

    .subscribedEventHandler('forceLockhandler', (context, event) => {
        
                log.trace('forceLockhandler: ' + event.value)
                if (event.value == 'forcelock') {
                    let action = this.lockBox()
                    let mode = this.setMode('locked')
                } else {
                    if (event.value == 'forceunlock') {
                        let action = this.unlockBox()
                        let mode = this.setMode('unlocked')
                    } else {
                    }
                }
            

	})

    .subscribedEventHandler('doorBellhandler', (context, event) => {
        
                if (event.value == 'open') {
                    state.bellState = 'pressed'
                }
                let bellStatus = boxController.setBellStatus('on')
                this.runIn(60 * autoWaitTime , clearBell)
            

	})

    .subscribedEventHandler('routinehandler', (context, event) => {
        
                log.trace('routinehandler')
                switch (event.displayName) {
                    case allowdeliveryRoutine :
                        log.trace('Allow Delivery called via Routine')
                        let action = this.allowDelivery()
                        break
                    case boxclearanceRoutine :
                        log.trace('Box Clearance called via Routine')
                        let action = this.clearancerequest()
                        break
                }
            

	})

    .subscribedEventHandler('powerhandler', (context, event) => {
        
                log.trace('powerhandler: ' + event.value)
                switch (event.value) {
                    case 'on':
                        log.trace('power on')
                        state.forceOff = false
                        let action = this.morningUnlock(false)
                        break
                    case 'disabled':
                        log.trace('Disabled')
                        state.forceOff = true
                        let action = this.nightBox(false)
                        break
                    case 'off':
                        log.trace('Off')
                        state.forceOff = false
                        let action = this.nightBox(false)
                        break
                }
            

	})

    .subscribedEventHandler('boxSensorhandler', (context, event) => {
        
                if (event.value == 'open') {
                    let actionl = this.setlidStatus('open')
                    log.trace('box opened')
                    let action = this.setlidOpened(this.now())
                    this.runIn(60 * boxOpenTimeout , checkBoxStatus)
                } else {
                    log.trace('box closed')
                    let actionl = this.setlidStatus('closed')
                    switch (state.boxStatus) {
                        case 'empty':
                            log.trace('box empty')
                            this.sendNotification('Parcel delivered')
                            state.parcelCount = state.parcelCount + 1
                            let parcelcount = this.setparcelCount(state.parcelCount)
                            let action = this.lockBox()
                            let actionM = this.setMode('locked')
                            let actionB = this.setboxStatus('full')
                            break
                        case 'full':
                            log.trace('box full')
                            this.sendNotification('additional parcel delivered')
                            state.parcelCount = state.parcelCount + 1
                            let parcelcount = this.setparcelCount(state.parcelCount)
                            let action = this.lockBox()
                            let actionM = this.setMode('locked')
                            let actionB = this.setboxStatus('full')
                            break
                        case 'clearingfull':
                            log.trace('box cleared')
                            this.sendNotification('box emptied')
                            state.parcelCount = 0
                            let parcelcount = this.setparcelCount(state.parcelCount)
                            let actionS = this.setboxStatus('empty')
                            let between = this.timeOfDayIsBetween(unlockTime, lockTime, new Date(), location.timeZone)
                            if (between) {
                                let action = this.unlockBox()
                                let actionM = this.setMode('unlocked')
                            } else {
                                let action = this.nightBox()
                            }
                            break
                        case 'clearingempty':
                            log.trace('box cleared')
                            this.sendNotification('box emptied')
                            state.parcelCount = 0
                            let parcelcount = this.setparcelCount(state.parcelCount)
                            let actionS = this.setboxStatus('empty')
                            let between = this.timeOfDayIsBetween(unlockTime, lockTime, new Date(), location.timeZone)
                            if (between) {
                                let action = this.unlockBox()
                                let actionM = this.setMode('unlocked')
                            } else {
                                let action = this.nightBox()
                            }
                            break
                        default: 
                        console.log('box closed, unknown status')
                        let action = this.setboxStatus('unknown')
                    }
                }
            

	})

    .subscribedEventHandler('autoOpenhandler', (context, event) => {
        
                log.trace('autoOpenhandler')
                state.autoOpen = event.value
                log.trace('autoOpen: ' + state.autoOpen)
            

	})

    .subscribedEventHandler('boxButtonhandler', (context, event) => {
        
                log.trace('boxStatus: ' + state.boxStatus)
                if (state.forceOff != true) {
                    if (state.boxStatus == 'empty') {
                        let between = this.timeOfDayIsBetween(unlockTime, lockTime, new Date(), location.timeZone)
                        if (between) {
                            log.trace('box unlocked when empty')
                            let action = this.unlockBox()
                        } else {
                            console.log('box button pressed out of hours')
                        }
                    } else {
                        this.flashRed()
                        log.trace('autoOpen state: ' + state.autoOpen)
                        if (state.autoOpen == 'on') {
                            if (state.bellState == 'pressed') {
                                let action = this.setMode('autoOpen')
                                this.runIn(autoOpenCounter, unlockBox)
                                this.sendNotification('Auto Delivery Activated')
                                this.runIn(60 * autoOpenTimeout , checkBoxStatus)
                            } else {
                                this.sendNotification('Delivery Requested (doorbell fail)')
                                let mode = this.setMode('waiting')
                            }
                        } else {
                            log.trace('auto-open not true, so wait for manual open')
                            this.sendNotification('Delivery Requested (manual)')
                            let action = this.setMode('waiting')
                        }
                    }
                }
            

	})

    .scheduledEventHandler('morningUnlock', (context, event) => {
        
                log.trace('morning Unlock boxStatus: ' + state.boxStatus)
                this.unsubscribe()
                if (state.forceOff == false) {
                    if (state.boxStatus == 'empty') {
                        log.trace('box empty - unlocking')
                        let action = this.unlockBox()
                        let action1 = this.setMode('unlocked')
                    } else {
                        log.trace('box full - locking')
                        let action = this.lockBox()
                        let action1 = this.setMode('locked')
                    }
                    let enable = this.disableApp('on')
                    if (param != false) {
                        let action = boxController.powerOn()
                    }
                } else {
                    log.trace('morningUnlock but box is disabled - doing nothing')
                }
                this.initialize()
            

	})

    .scheduledEventHandler('nightBox', (context, event) => {
        
                this.unsubscribe()
                if (param != false) {
                    boxController.setLockStatus()
                    let actionP = boxController.powerOff(false)
                }
                if (state.forceOff == true) {
                    log.trace('nightBox - Disable')
                    let setMode = this.setMode('disabled')
                } else {
                    log.trace('nightBox - Off')
                    let setMode = this.setMode('off')
                }
                let offGreen = boxController.offGreen()
                let offRed = boxController.offRed()
                let lock = boxController.lock()
                let disable = this.disableApp('off')
                this.initialize()
            

	})
