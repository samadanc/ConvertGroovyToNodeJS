
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('buttonPress', (context, event) => {
        
                let isHeld = false
                if (event.value == 'held') {
                    isHeld = true
                }
                let buttonNumber = event.jsonData.buttonNumber
                if (dimmingBtns && buttonNumber == dimButton || buttonNumber == brightenButton ) {
                    return this.dimOpperation(evt)
                }
                let shouldTurnOff = false
                let timedSettingsActive = false
                if (!offBtn) {
                    for (let light : lights ) {
                        if (light.currentValue('switch') == 'on') {
                            shouldTurnOff = true
                        }
                    }
                } else {
                    if (buttonNumber == offBtnNumber ) {
                        shouldTurnOff = true
                    }
                }
                if (shouldTurnOff) {
                    lights.off()
                } else {
                    if (!isHeld) {
                        let children = this.getChildApps()
                        children.each({ let child ->
                            if (child.isActive()) {
                                timedSettingsActive = true
                                let settings = child.getSettings()
                                if (child.hasSpecificSettings()) {
                                    lights.each({ let light ->
                                        let data = child.getSpecificLightSetting(light.label)
                                        if (data != null) {
                                            let lightOff = false
                                            console.log(data)
                                            if (data.on != null && data.on.toString() != 'null') {
                                                if (!data.on) {
                                                    light.off()
                                                    lightOff = true
                                                }
                                            }
                                            if (!lightOff) {
                                                light.on()
                                                if (data.level != null && data.level.toString() != 'null' || data.temp != null && data.temp.toString() != 'null' || data.color != null && data.color.toString() != 'null') {
                                                    this.setLightConfig(light, data)
                                                }
                                            }
                                        } else {
                                            light.on()
                                            if (settings.level != null && settings.level.toString() != 'null' || settings.temp != null && settings.temp.toString() != 'null' || settings.color != null && settings.color.toString() != 'null') {
                                                this.setLightConfig(light, settings)
                                            }
                                        }
                                    })
                                } else {
                                    lights.on()
                                    if (settings.level != null && settings.level.toString() != 'null' || settings.temp != null && settings.temp.toString() != 'null' || settings.color != null && settings.color.toString() != 'null') {
                                        this.setLightsConfig(settings)
                                    }
                                }
                                return null
                            }
                        })
                    }
                    if (!timedSettingsActive) {
                        lights.on()
                        if (level != null || temp != null || color != null) {
                            this.setLightsConfig(['level': level , 'temp': temp , 'color': color ])
                        }
                    }
                }
            

	})
