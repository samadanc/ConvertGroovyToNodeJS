
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
                if (switchesOffScheduled == 'Yes' && switchesOffFromTime && switchesOffToTime ) {
                    if (this.between(switchesOffFromTime, switchesOffToTime)) {
                        this.relayMessage("${event.getDevice()} was turned off", evt)
                    }
                } else {
                    this.relayMessage("${event.getDevice()} was turned off", evt)
                }
            

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
                if (switchesOnScheduled == 'Yes' && switchesOnFromTime && switchesOnToTime ) {
                    if (this.between(switchesOnFromTime, switchesOnToTime)) {
                        this.relayMessage("${event.getDevice()} was turned on", evt)
                    }
                } else {
                    this.relayMessage("${event.getDevice()} was turned on", evt)
                }
            

	})

    .subscribedEventHandler('smokeDetectedHandler', (context, event) => {
        
                if (smokeDetectedScheduled == 'Yes' && smokeDetectedFromTime && smokeDetectedToTime ) {
                    if (this.between(smokeDetectedFromTime, smokeDetectedToTime)) {
                        this.relayMessage("${event.getDevice()} has detected smoke!", evt)
                    }
                } else {
                    this.relayMessage("${event.getDevice()} has detected smoke!", evt)
                }
            

	})

    .subscribedEventHandler('arrivalOfHandler', (context, event) => {
        
                if (arrivalOfScheduled == 'Yes' && arrivalOfFromTime && arrivalOfToTime ) {
                    if (this.between(arrivalOfFromTime, arrivalOfToTime)) {
                        this.relayMessage("${event.getDevice()} has arrived", evt)
                    }
                } else {
                    this.relayMessage("${event.getDevice()} has arrived", evt)
                }
            

	})

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
                if (contactsOpenedScheduled == 'Yes' && contactsOpenedFromTime && contactsOpenedToTime ) {
                    if (this.between(contactsOpenedFromTime, contactsOpenedToTime)) {
                        this.relayMessage("${event.getDevice()} was open", evt)
                    }
                } else {
                    this.relayMessage("${event.getDevice()} was open", evt)
                }
            

	})

    .subscribedEventHandler('waterSensorHandler', (context, event) => {
        
                if (waterSensorsScheduled == 'Yes' && waterSensorsFromTime && waterSensorsToTime ) {
                    if (this.between(waterSensorsFromTime, waterSensorsToTime)) {
                        this.relayMessage("${event.getDevice()} has detected water!", evt)
                    }
                } else {
                    this.relayMessage("${event.getDevice()} has detected water!", evt)
                }
            

	})

    .subscribedEventHandler('accelerationHandler', (context, event) => {
        
                if (accelerationSensorsScheduled == 'Yes' && accelerationSensorsFromTime && accelerationSensorsToTime ) {
                    if (this.between(accelerationSensorsFromTime, accelerationSensorsToTime)) {
                        this.relayMessage("Movement detected by ${event.getDevice()}", evt)
                    }
                } else {
                    this.relayMessage("Movement detected by ${event.getDevice()}", evt)
                }
            

	})

    .subscribedEventHandler('buttonHandler', (context, event) => {
        
                if (buttonSensorsScheduled == 'Yes' && buttonSensorsFromTime && buttonSensorsToTime ) {
                    console.log("between(buttonSensorsFromTime, buttonSensorsToTime) ${this.between(buttonSensorsFromTime, buttonSensorsToTime)}")
                    if (this.between(buttonSensorsFromTime, buttonSensorsToTime)) {
                        this.relayMessage("${event.getDevice()} was pushed", evt)
                    }
                } else {
                    this.relayMessage("${event.getDevice()} was pushed", evt)
                }
            

	})

    .subscribedEventHandler('departureOfHandler', (context, event) => {
        
                if (departureOfScheduled == 'Yes' && departureOfFromTime && departureOfToTime ) {
                    if (this.between(departureOfFromTime, departureOfToTime)) {
                        this.relayMessage("${event.getDevice()} has departed", evt)
                    }
                } else {
                    this.relayMessage("${event.getDevice()} has departed", evt)
                }
            

	})

    .subscribedEventHandler('contactCloseHandler', (context, event) => {
        
                if (contactsClosedScheduled == 'Yes' && contactsClosedFromTime && contactsClosedToTime ) {
                    if (this.between(contactsClosedFromTime, contactsClosedToTime)) {
                        this.relayMessage("${event.getDevice()} was closed", evt)
                    }
                } else {
                    this.relayMessage("${event.getDevice()} was closed", evt)
                }
            

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
                if (motionSensorsScheduled == 'Yes' && motionSensorsFromTime && motionSensorsToTime ) {
                    if (this.between(motionSensorsFromTime, motionSensorsToTime)) {
                        this.relayMessage("Motion detected at ${event.getDevice()}", evt)
                    }
                } else {
                    this.relayMessage("Motion detected at ${event.getDevice()}", evt)
                }
            

	})
