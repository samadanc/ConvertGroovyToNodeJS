
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('sensorToggled', (context, event) => {
        
                if (!state.did && !(this.timeframeCheck(evt))) {
                    return null
                }
                if (!state.did) {
                    this.storeState()
                }
                if (event.value == 'active' && theLights.currentSwitch != 'on') {
                    theLights.setLevel(brightnessLevel)
                    state.did = true
                }
                if (event.value == 'inactive' && theLights.currentSwitch != 'off') {
                    this.runIn(delayMins * 60, scheduleCheck, ['overwrite': false])
                }
            

	})
