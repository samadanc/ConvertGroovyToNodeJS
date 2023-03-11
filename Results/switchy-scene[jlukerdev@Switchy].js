
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

    .subscribedEventHandler('lightTurnedOn', (context, event) => {
        
                if (!(this.checkTimeInterval())) {
                    this.logEvent('Event not in schedule', true)
                    return null
                }
                let lightDev = event.getDevice()
                let devId = lightDev.getId()
                this.logEvent("${lightDev.displayName} was turned on", true)
                let isLevelAvail = this.isLevelCapabilitySet()
                let isTempAvail = this.isTemperatureCapabilitySet()
                if (isLevelAvail) {
                    if (this.isDeviceInList(lightsLevel.getId(), devId)) {
                        let curLevel = lightDev.currentLevel
                        this.logEvent("Current level is $curLevel%")
                        if (curLevel != lightLevelValue ) {
                            let setToLevel = lightLevelValue 
                            if (setToLevel < 0) {
                                setToLevel = 0
                            } else {
                                if (setToLevel > 100) {
                                    setToLevel = 100
                                }
                            }
                            this.logEvent("Setting level to $setToLevel")
                            lightDev.setLevel(setToLevel)
                        } else {
                            this.logEvent('Level was not changed')
                        }
                    }
                }
                if (isTempAvail) {
                    let setTemp = true
                    if (!useOneLightsList) {
                        setTemp = this.isDeviceInList(lightsTemp.getId(), devId)
                    } else {
                        setTemp = this.isDeviceInList(lightsLevel.getId(), devId)
                    }
                    if (setTemp) {
                        this.logEvent('Checking for temperature capability...')
                        if (lightDev.hasAttribute('colorTemperature')) {
                            let currentTemp = lightDev.latestValue('colorTemperature')
                            this.logEvent("Current temp is $currentTempK")
                            if (currentTemp != lightTempValue ) {
                                let setToTemp = lightTempValue 
                                if (setToTemp < 3000) {
                                    setToTemp = 3000
                                } else {
                                    if (setToTemp > 6500) {
                                        setToTemp = 6500
                                    }
                                }
                                this.logEvent("Setting temp to $setToTemp")
                                lightDev.setColorTemperature(setToTemp)
                            } else {
                                this.logEvent('Temp was not changed')
                            }
                        }
                    }
                }
            

	})
