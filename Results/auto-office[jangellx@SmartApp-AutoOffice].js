
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('deviceOffHandler', (context, event) => {
        
                if (!masterEnable) {
                    console.log('Ignoring deviceOffHandler(); master enable false')
                    return null
                }
                console.log('"Off" event received')
                state.lastWakeTime = this.now()
                this.doWake(false)
            

	})

    .subscribedEventHandler('motionOnHandler', (context, event) => {
        
                if (!masterEnable) {
                    console.log('Ignoring motionOnHandler(); master enable false')
                    return null
                }
                if (state.lastWakeTime + 60 * 1000 > this.now()) {
                    console.log('Motion "On" event received too soon after "off" events; ignoring')
                    return null
                }
                console.log('Motion "On" event received (after 60 second delay)')
                this.doWake(true)
            

	})

    .subscribedEventHandler('deviceOnHandler', (context, event) => {
        
                if (!masterEnable) {
                    console.log('Ignoring deviceOnHandler(); master enable false')
                    return null
                }
                console.log('"On" event received')
                this.doWake(true)
            

	})
