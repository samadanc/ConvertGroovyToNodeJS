
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('A_colorHandler', (context, event) => {
        
                let dimLevel = A_level ? (A_level as int) : 0
                let hueLevel = A_hue ? (A_hue as int) : 0
                let saturationLevel = A_sat ? (A_sat as int) : 0
                let newValue = ['hue': hueLevel , 'saturation': saturationLevel , 'level': (dimLevel as Integer)]
                A_switchesOn?.on()
                A_switches?.setColor(newValue)
                A_switchesOff?.off()
            

	})
