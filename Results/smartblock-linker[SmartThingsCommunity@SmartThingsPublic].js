
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('updateSwitchLevel', (context, event) => {
        
                java.lang.Integer level = (event.value as int)
                console.log("matching level: $level")
                linkedSwitch.setLevel(level)
            

	})

    .subscribedEventHandler('updateBlockState', (context, event) => {
        
                console.log("setting linkedSmartBlock to ${event.value}")
                linkedSmartBlock."${event.value}"()
            

	})

    .subscribedEventHandler('updateSwitchState', (context, event) => {
        
                console.log("setting linkedSwitch to ${event.value}")
                linkedSwitch."${event.value}"()
            

	})

    .subscribedEventHandler('updateBlockLevel', (context, event) => {
        
                java.lang.Integer level = (event.value as int)
                console.log("matching level: $level")
                linkedSmartBlock.setLevel(level)
            

	})
