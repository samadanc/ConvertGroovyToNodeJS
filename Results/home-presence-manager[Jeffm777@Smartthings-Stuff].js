
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('presenceEventHandler', (context, event) => {
        
                let room = this.findRoomByDeviceId(event.device.id)
                if (event.value == 'present') {
                    this.turnOnLights(room)
                } else {
                    this.turnOffLights(room)
                }
            

	})

    .subscribedEventHandler('motionActiveEventHandler', (context, event) => {
        
                let room = this.findRoomByDeviceId(event.device.id)
                this.logDebug("${room.roomName} Motion is Active")
                room.lastActivity = new Date().time
                room.pendingExit = false
                this.handlePresentRoom(room)
            

	})

    .subscribedEventHandler('timerEventHandler', (context, event) => {
        
                let btnNumber = event.data.replace('{"buttonNumber":', '').replace('}', '').substring(2)
                let roomNumber = this.validateRoomNumber(btnNumber)
                if (roomNumber > 0) {
                    let room = this.findRoomByRoomNumber(roomNumber)
                    if (!(this.isPresent(room))) {
                        this.changeSwitchState(room, 'on', 'off')
                    }
                }
            

	})

    .subscribedEventHandler('contactEventHandler', (context, event) => {
        
                let room = this.findRoomByDeviceId(event.device.id)
                let presenceType = this.contactPresenceType(room)
                let currentlyPresent = this.isPresent(room)
                this.logDebug("${room.roomName} contact is ${event.value}")
                if (presenceType == event.value) {
                    this.handlePresentRoom(room, true)
                } else {
                    if (currentlyPresent && !(presenceType.contains('toggle'))) {
                        this.handleNotPresentRoom(room)
                    } else {
                        if (presenceType.contains(event.value)) {
                            if (currentlyPresent) {
                                this.handleNotPresentRoom(room)
                            } else {
                                this.handlePresentRoom(room, true)
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('motionInactiveEventHandler', (context, event) => {
        
                let room = this.findRoomByDeviceId(event.device.id)
                this.logDebug("${room.roomName} Motion is Inactive")
                this.handleMotionInactiveRoom(room)
            

	})
