
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
                let lightSensorState = state.luminance
                let lastStatus = state.lastStatus
                console.log("luxAnswer = $luxAnswer")
                console.log("SENSOR = $lightSensorState")
                console.log("luxLevel=$luxLevel")
                if (event.value == 'active' && lightSensorState < luxLevel || luxAnswer == 'No') {
                    console.log('There is motion')
                    state.motionStopTime = this.now()
                    if (dimmer1 != null && state.dimmerLastStatus != 'on') {
                        log.trace("dimmerLevel = $dimmerLevel")
                        dimmer1.setLevel(dimmerLevel)
                        state.dimmerLastStatus = 'on'
                        state.lastStatus = 'on'
                    }
                    if (switch1 != null && state.swirchLastStatus != 'on') {
                        log.trace("light.on() ... [luminance: $lightSensorState]")
                        switch1.on()
                        state.switchLastStatus = 'on'
                        state.lastStatus = 'on'
                    }
                } else {
                    if (event.value == 'inactive' && state.lastStatus != 'off') {
                        console.log('There is no motion')
                        state.motionStopTime = this.now()
                        if (delayMinutes) {
                            this.runIn(delayMinutes * 60, turnOffMotionAfterDelay, ['overwrite': false])
                        } else {
                            this.turnOffMotionNoDelay()
                        }
                    }
                }
            

	})

    .subscribedEventHandler('luxHandler', (context, event) => {
        
                if (luxSensor != null) {
                    state.luminance = event.integerValue
                } else {
                    state.luminance = 0
                }
            

	})
