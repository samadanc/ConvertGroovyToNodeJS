
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

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
                let switchState = ovrSwitch.currentValue('switch')
                if (switchState == 'off') {
                    if (!(this.checkTimeInterval())) {
                        return null
                    }
                    this.logEvent('Motion Detected, turning lights on', true)
                    state.didMotionTurnOn = true
                    lights.on()
                } else {
                    if (state.didMotionTurnOn != true) {
                        this.logEvent('override switch is on, ignoring motion', true)
                        state.didMotionTurnOn = false
                    }
                }
            

	})

    .subscribedEventHandler('motionInactiveHandler', (context, event) => {
        
                if (state.didMotionTurnOn == true) {
                    this.logEvent('Motion Stopped')
                    this.runIn(seconds, checkMotion)
                }
            

	})
