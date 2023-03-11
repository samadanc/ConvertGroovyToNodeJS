
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
        
                if (ovrSwitch.currentValue('switch') == 'on') {
                    return null
                }
                let switchState = ovrSwitch.currentValue('switch')
                if (switchState == 'off') {
                    if (!(this.checkTimeInterval())) {
                        return null
                    }
                    this.logEvent('Motion Detected, turning lights on', true)
                    lights.setLevel(dimmerLevel)
                    lights.on()
                } else {
                    this.logEvent('Light automation is off, ignoring motion', true)
                }
            

	})

    .subscribedEventHandler('motionInactiveHandler', (context, event) => {
        
                if (ovrSwitch.currentValue('switch') == 'off') {
                    this.logEvent('Motion Stopped')
                    this.runIn(seconds, checkMotion)
                }
            

	})
