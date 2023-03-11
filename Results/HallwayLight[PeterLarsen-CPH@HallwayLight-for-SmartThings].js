
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('onOffbuttonEvent', (context, event) => {
        
                let buttonNumber = event.data
                let value = event.value
                console.log("button: $buttonNumber, value: $value")
                let button = -1
                switch ( buttonNumber ) {
                    case ~('.*1.*') :
                        button = 1
                        break
                    case ~('.*2.*') :
                        button = 2
                        break
                    case ~('.*3.*') :
                        button = 3
                        break
                    case ~('.*4.*') :
                        button = 4
                        break
                }
                console.log("Button number: $button")
                if (button.toString() == onOffbuttonNumber ) {
                    if (state.schemaOff) {
                        console.log('Schema on')
                        state.schemaOff = false
                        switches?.setLevel(state.levels[state.startLightUseThis])
                        switchLevels?.setLevel(state.levels[state.startLightUseThis])
                        this.runIn(10, decreaseLights, ['overwrite': true])
                    } else {
                        this.setSchemaOff()
                    }
                }
            

	})

    .subscribedEventHandler('sensorDetectedHandler', (context, event) => {
        
                console.log("sensorDetectedHandler called: $evt")
                let period = this.dayPeriod()
                if (state.schemaOff) {
                    if (period != 'NIGHT' || new Date().time > state.schemaOffTime) {
                        console.log('Schema inactivity is timed out or the day mode changed from NIGHT')
                        state.schemaOff = false
                    } else {
                        console.log('Schema is off')
                        return null
                    }
                }
                if (period == 'DAY') {
                    return null
                }
                if (period == 'NIGHT' && !lightsOnInNight) {
                    return null
                }
                this.increaseLights()
            

	})

    .subscribedEventHandler('sensorStoppedHandler', (context, event) => {
        
                console.log("sensorStoppedHandler called: $evt")
                if (state.schemaOff) {
                    console.log('Schema is off')
                    return null
                }
                let period = this.dayPeriod()
                this.runIn(state.timeBeforeDecreasingUseThis.toInteger(), decreaseLights, ['overwrite': true])
                if (period == 'NIGHT' && lightsOnInNight && turnOffNightIfInactive ) {
                    this.runIn(30 * 60, nightSchemaOff, ['overwrite': true])
                }
            

	})
