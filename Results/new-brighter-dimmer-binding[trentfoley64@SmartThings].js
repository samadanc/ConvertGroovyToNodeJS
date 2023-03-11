
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
                console.log("switchoffHandler Event: ${event.value}")
                slaveDimmers?.off()
                slaveSwitches?.off()
            

	})

    .subscribedEventHandler('switchSetLevelHandler', (context, event) => {
        
                if (event.value == 'on' || event.value == 'off') {
                    return null
                }
                let level = event.value.toFloat()
                level = level.toInteger()
                console.log("switchSetLevelHandler Event: $level")
                slaveDimmers?.setLevel(level)
            

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
                console.log("switchOnHandler Event: ${event.value}")
                let dimmerValue = master.latestValue('level')
                slaveDimmers?.on()
                slaveSwitches?.on()
            

	})
