
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switch4Handler', (context, event) => {
        
                log.info("switch4Handler Event: ${event.value}")
                if (Dim4 == 0) {
                    dimmers.off()
                } else {
                    if (colors) {
                        if (Hue4 || Sat4 ) {
                            if (Hue4) {
                                colors?.setHue(Hue4)
                            }
                            if (Sat4) {
                                colors?.setSaturation(Sat4)
                            }
                            if (Temp4) {
                                slaves?.setColorTemperature(Temp4)
                            }
                        } else {
                            if (Temp4) {
                                slaves?.setColorTemperature(Temp4)
                            }
                        }
                        if (Dim4 > 0) {
                            if (dimmers) {
                                dimmers.on()
                                dimmers.setLevel(Dim4)
                            }
                        }
                    } else {
                        if (Temp4) {
                            slaves?.setColorTemperature(Temp4)
                        }
                        if (Dim4 > 0) {
                            if (dimmers) {
                                dimmers.on()
                                dimmers.setLevel(Dim4)
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('switch2Handler', (context, event) => {
        
                log.info("switch2Handler Event: ${event.value}")
                if (Dim2 == 0) {
                    dimmers.off()
                } else {
                    if (colors) {
                        if (Hue2 || Sat2 ) {
                            if (Hue2) {
                                colors?.setHue(Hue2)
                            }
                            if (Sat2) {
                                colors?.setSaturation(Sat2)
                            }
                            if (Temp2) {
                                slaves?.setColorTemperature(Temp2)
                            }
                        } else {
                            if (Temp2) {
                                slaves?.setColorTemperature(Temp2)
                            }
                        }
                        if (Dim2 > 0) {
                            if (dimmers) {
                                dimmers.on()
                                dimmers.setLevel(Dim2)
                            }
                        }
                    } else {
                        if (Temp2) {
                            slaves?.setColorTemperature(Temp2)
                        }
                        if (Dim2 > 0) {
                            if (dimmers) {
                                dimmers.on()
                                dimmers.setLevel(Dim2)
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('switch3Handler', (context, event) => {
        
                log.info("switch3Handler Event: ${event.value}")
                if (Dim3 == 0) {
                    dimmers.off()
                } else {
                    if (colors) {
                        if (Hue3 || Sat3 ) {
                            if (Hue3) {
                                colors?.setHue(Hue3)
                            }
                            if (Sat3) {
                                colors?.setSaturation(Sat3)
                            }
                            if (Temp3) {
                                slaves?.setColorTemperature(Temp3)
                            }
                        } else {
                            if (Temp3) {
                                slaves?.setColorTemperature(Temp3)
                            }
                        }
                        if (Dim3 > 0) {
                            if (dimmers) {
                                dimmers.on()
                                dimmers.setLevel(Dim3)
                            }
                        }
                    } else {
                        if (Temp3) {
                            slaves?.setColorTemperature(Temp3)
                        }
                        if (Dim3 > 0) {
                            if (dimmers) {
                                dimmers.on()
                                dimmers.setLevel(Dim3)
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('switch1Handler', (context, event) => {
        
                log.info("switch1Handler Event: ${event.value}")
                if (Dim1 == 0) {
                    dimmers.off()
                } else {
                    if (colors) {
                        if (Hue1 || Sat1 ) {
                            if (Hue1) {
                                colors?.setHue(Hue1)
                            }
                            if (Sat1) {
                                colors?.setSaturation(Sat1)
                            }
                            if (Temp1) {
                                slaves?.setColorTemperature(Temp1)
                            }
                        } else {
                            if (Temp1) {
                                slaves?.setColorTemperature(Temp1)
                            }
                        }
                        if (Dim1 > 0) {
                            if (dimmers) {
                                dimmers.on()
                                dimmers.setLevel(Dim1)
                            }
                        }
                    } else {
                        if (Temp1) {
                            slaves?.setColorTemperature(Temp1)
                        }
                        if (Dim1 > 0) {
                            if (dimmers) {
                                dimmers.on()
                                dimmers.setLevel(Dim1)
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('switch5Handler', (context, event) => {
        
                log.info("switch5Handler Event: ${event.value}")
                if (Dim5 == 0) {
                    dimmers.off()
                } else {
                    if (colors) {
                        if (Hue5 || Sat5 ) {
                            if (Hue5) {
                                colors?.setHue(Hue5)
                            }
                            if (Sat5) {
                                colors?.setSaturation(Sat5)
                            }
                            if (Temp5) {
                                slaves?.setColorTemperature(Temp5)
                            }
                        } else {
                            if (Temp5) {
                                slaves?.setColorTemperature(Temp5)
                            }
                        }
                        if (Dim5 > 0) {
                            if (dimmers) {
                                dimmers.on()
                                dimmers.setLevel(Dim5)
                            }
                        }
                    } else {
                        if (Temp5) {
                            slaves?.setColorTemperature(Temp5)
                        }
                        if (Dim5 > 0) {
                            if (dimmers) {
                                dimmers.on()
                                dimmers.setLevel(Dim5)
                            }
                        }
                    }
                }
            

	})
