
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('stopMotionTimer', (context, event) => {
        
                this.runIn(turnOffDelay, stopMotionHandler)
            

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
                if (location.mode == 'Morning') {
                    if (levelMorning) {
                        lightsMorning?.setLevel(levelMorning)
                    }
                    if (tempMorning) {
                        lightsMorning?.setColorTemperature(tempMorning)
                    }
                    if (colorMorning) {
                        this.setColor(colorMorning)
                    }
                }
                if (location.mode == 'Day') {
                    if (levelDay) {
                        lightsDay?.setLevel(levelDay)
                    }
                    if (tempDay) {
                        lightsDay?.setColorTemperature(tempDay)
                    }
                    if (colorDay) {
                        this.setColor(colorDay)
                    }
                }
                if (location.mode == 'Evening') {
                    if (levelEvening) {
                        lightsEvening?.setLevel(levelEvening)
                    }
                    if (tempEvening) {
                        lightsEvening?.setColorTemperature(tempEvening)
                    }
                    if (colorEvening) {
                        this.setColor(colorEvening)
                    }
                }
                if (location.mode == 'Night') {
                    if (levelNight) {
                        lightsNight?.setLevel(levelNight)
                    }
                    if (tempNight) {
                        lightsNight?.setColorTemperature(tempNight)
                    }
                    if (colorNight) {
                        this.setColor(colorNight)
                    }
                }
                if (location.mode == 'Midnight') {
                    if (levelMidnight) {
                        lightsMidnight?.setLevel(levelMidnight)
                    }
                    if (tempMidnight) {
                        lightsMidnight?.setColorTemperature(tempMidnight)
                    }
                    if (colorMidnight) {
                        this.setColor(colorMidnight)
                    }
                }
            

	})
