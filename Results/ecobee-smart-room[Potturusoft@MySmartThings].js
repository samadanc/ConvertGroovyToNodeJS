
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('doorClosedHandler', (context, event) => {
        
                console.log('door closed')
                if (!(theDoors.currentContact.contains('open'))) {
                    this.generateSensorsEvents(['doors': 'closed'])
                    this.unschedule(openCheck)
                    if (atomicState.isSmartRoomActive) {
                        this.runIn(doorClosedHours.toInteger() * 3600, closedCheck, ['overwrite': true])
                    }
                }
            

	})

    .subscribedEventHandler('doorOpenHandler', (context, event) => {
        
                console.log('door opened')
                Integer i = 0
                theDoors.each({ 
                    if (it.currentContact == 'open') {
                        i++
                    }
                })
                if (i == 1) {
                    this.generateSensorsEvents(['doors': 'open'])
                    this.unschedule(closedCheck)
                    if (!atomicState.isSmartRoomActive) {
                        this.runIn(doorOpenMinutes.toInteger() * 60, openCheck, ['overwrite': true])
                    } else {
                        this.unschedule(openCheck)
                    }
                }
            

	})

    .subscribedEventHandler('smartRoomHandler', (context, event) => {
        
                if (event.value == 'enable') {
                    if (!theWindows || theWindows.currentContact.contains('open')) {
                        this.activateRoom()
                        if (theWindows) {
                            atomicState.isWaitingForWindows = false
                        }
                    } else {
                        if (theWindows) {
                            atomicState.isWaitingForWindows = true
                        }
                    }
                    if (theDoors.currentContact.contains('open')) {
                        this.unschedule(openCheck)
                    } else {
                        this.unschedule(closedCheck)
                    }
                } else {
                    if (event.value == 'disable') {
                        this.deactivateRoom()
                        if (theDoors.currentContact.contains('open')) {
                            this.runIn(doorOpenMinutes * 60, openCheck, ['overwrite': true])
                        } else {
                        }
                    }
                }
            

	})

    .subscribedEventHandler('windowHandler', (context, event) => {
        
                if (event.value == 'open') {
                    console.log('window open')
                    if (atomicState.isSmartRoomActive) {
                        this.deactivateRoom()
                        atomicState.isWaitingForWindows = true
                        this.generateSensorsEvents(['windows': 'open'])
                    }
                } else {
                    console.log('window closed')
                    if (atomicState.isWaitingForWindows) {
                        if (!theWindows || theWindows.currentContact.contains('open')) {
                            this.activateRoom()
                            atomicState.isWaitingForWindows = false
                            this.generateSensorsEvents(['windows': 'closed'])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
                console.log("motionHandler() ${event.name} is ${event.value}")
                if (event.value == 'active') {
                    if (theDoors.currentContact.contains('open')) {
                    } else {
                        if (atomicState.isSmartRoomActive) {
                            if (!atomicState.isRoomOccupied) {
                                this.unschedule(checkTheDoors)
                                atomicState.isRoomOccupied = true
                            }
                        } else {
                            if (false) {
                                if (!theWindows || theWindows.currentContact.contains('open')) {
                                    this.activateRoom()
                                    if (theWindows) {
                                        atomicState.isWaitingForWindows = false
                                    }
                                    atomicState.isRoomOccupied = true
                                } else {
                                    this.deactivateRoom()
                                    if (theWindows) {
                                        atomicState.isWaitingForWindows = true
                                    }
                                    atomicState.isRoomOccupied = true
                                }
                            }
                        }
                    }
                } else {
                }
            

	})
