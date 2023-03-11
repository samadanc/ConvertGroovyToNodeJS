
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchOn', (context, event) => {
        
                let s = event.getDevice()
                console.log("$s was turned on")
                childDevices.first().on()
            

	})

    .subscribedEventHandler('switchOff', (context, event) => {
        
                console.log("${event.device} was turned off")
                let on = allSwitches.find({ 
                    it.currentSwitch == 'on'
                })
                if (!on) {
                    childDevices.first().off()
                }
            

	})

    .subscribedEventHandler('masterOn', (context, event) => {
        
                console.log('Master switch was turned on')
                let on = allSwitches.find({ 
                    it.currentSwitch == 'on'
                })
                if (!on) {
                    let leaveOn = false
                    allSwitches.each({ let s ->
                        if (settings."turnOn${s.displayName}") {
                            console.log("Turning on $s")
                            s.on()
                            leaveOn = true
                        }
                    })
                    if (!leaveOn) {
                        event.device.off()
                    }
                }
            

	})

    .subscribedEventHandler('masterOff', (context, event) => {
        
                console.log('Master switch was turned off')
                allSwitches.each({ let s ->
                    console.log("Turning off $s")
                    s.off()
                })
            

	})
