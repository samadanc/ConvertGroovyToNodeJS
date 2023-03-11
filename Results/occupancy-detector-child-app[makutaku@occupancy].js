
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('insideMotionInactiveEventHandler', (context, event) => {
        
                this.logDebug("Inside: ${event.displayName} has changed to ${event.value}")
                if (this.isRoomActive()) {
                    this.logInfo('Inside motion still active.')
                } else {
                    this.logInfo('Inside motion is now inactive.')
                    this.scheduleTimeout()
                }
            

	})

    .subscribedEventHandler('outsideMotionInactiveEventHandler', (context, event) => {
        
                this.logDebug("Outer perimeter: ${event.displayName} has changed to ${event.value}")
                let outerPerimeterBreached = this.isOuterPerimeterBreached()
                if (outerPerimeterBreached) {
                    this.logDebug('Outer perimeter is still breached')
                    return null
                }
                this.runIn(outerPerimeterRestorationDelayInSeconds, outsidePerimeterRestorationHandler)
            

	})

    .subscribedEventHandler('insideMotionActiveEventHandler', (context, event) => {
        
                this.logDebug("Inside: ${event.displayName} has changed to ${event.value}")
                this.cancelTimeout()
                if (this.isInnerPerimeterBreached()) {
                    if (this.isOuterPerimeterBreached()) {
                        this.makeRoomReserved()
                    } else {
                        this.makeRoomOccupied()
                    }
                } else {
                    this.makeRoomEngaged()
                }
            

	})

    .subscribedEventHandler('innerRoomsEventHandler', (context, event) => {
        
                let roomDevice = this.getChildDevice(this.getRoomDeviceId())
                let latestvalue = roomDevice.latestValue('roomOccupancy')
                this.logDebug("Inside: ${event.displayName} has changed from $latestvalue to ${event.value}")
            

	})

    .subscribedEventHandler('perimeterContactOpenEventHandler', (context, event) => {
        
                this.logDebug("Inner perimeter: ${event.displayName} has changed to ${event.value}")
                this.logInfo('Inner perimeter has been breached')
                if (this.isOuterPerimeterBreached()) {
                    this.makeRoomReserved()
                } else {
                    this.makeRoomOccupied()
                }
                if (!(this.isRoomActive())) {
                    this.logInfo('Inside motion was inactive when inner perimeter breached.')
                    this.scheduleTimeout()
                }
            

	})

    .subscribedEventHandler('outsideMotionActiveEventHandler', (context, event) => {
        
                this.logDebug("Outer perimeter: ${event.displayName} has changed to ${event.value}")
                this.logInfo('Outer perimeter:  has been breached')
                this.unschedule(outsidePerimeterRestorationHandler)
                let state = this.getRoomState()
                if (state == 'occupied') {
                    this.makeRoomReserved()
                    if (!(this.isRoomActive())) {
                        this.scheduleTimeout()
                    }
                }
            

	})

    .subscribedEventHandler('perimeterContactClosedEventHandler', (context, event) => {
        
                this.logDebug("Inner perimeter:${event.displayName} has changed to ${event.value}")
                this.logDebug(this.isInnerPerimeterBreached() ? 'Inner perimeter is still breached' : 'Inner perimeter is restored')
            

	})
