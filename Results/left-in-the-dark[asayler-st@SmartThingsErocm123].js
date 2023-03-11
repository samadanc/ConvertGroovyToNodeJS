
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('lightEvent', (context, event) => {
        
        if (allOk) {
        if (debugBool) {
        console.log("lightEvent - name: ${event.displayName} id: ${event.deviceId} source: ${event.source}")
        }
        let roomNumber
        for (java.lang.Integer i = 1; i <= (numberOfRooms as Integer); i++) {
        if (settings["lights_$i"].find({
        it.id == event.deviceId
        })) {
        roomNumber = i
        }
        }
        if (roomNumber) {
        let myEvents = settings["lights_$roomNumber"].find({
        it.id == event.deviceId
        }).eventsSince(new Date(this.now() - 6000), ['all': true, 'max': 5]).findAll({
        (it.source as String) == 'APP_COMMAND'
        })
        if (myEvents) {
        if (debugBool) {
        console.log("A SmartApp triggered these events: ${myEvents?.source}")
        }
        let myTime = this.now()
        if (debugBool) {
        console.log("Setting room$roomNumber to $myTime")
        }
        state."room$roomNumber" = myTime
        } else {
        if (debugBool) {
        console.log('Light was turned off, but no "APP_COMMAND" events found in the last six seconds')
        }
        }
        } else {
        if (debugBool) {
        console.log('Room was not found')
        }
        }
        }
        

	})

    .subscribedEventHandler('motionEvent', (context, event) => {
        
        if (allOk) {
        if (debugBool) {
        console.log("motionEvent - name: ${event.displayName} id: ${event.deviceId} source: ${event.source}")
        }
        let roomNumber
        for (java.lang.Integer i = 1; i <= (numberOfRooms as Integer); i++) {
        if (settings["motion_$i"].find({
        it.id == event.deviceId
        })) {
        roomNumber = i
        }
        }
        if (roomNumber) {
        if (settings.numberOfSeconds == null || settings.numberOfSeconds == '') {
        settings.numberOfSeconds = 60
        }
        if (state."room$roomNumber" && this.now() - state."room$roomNumber" < settings.numberOfSeconds * 1000) {
        if (debugBool) {
        console.log('We need to turn the lights on')
        }
        settings["lights_$roomNumber"].on()
        } else {
        if (debugBool) {
        console.log('No need to turn the lights on')
        }
        }
        } else {
        if (debugBool) {
        console.log('Room was not found')
        }
        }
        }
        

	})
