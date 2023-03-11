
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('pushHandler', (context, event) => {
        
                let currentStates = lights.collect({ 
                    it.currentState('switch')
                })
                console.log(currentStates)
                if (currentStates.any({ 
                    it.value == 'on'
                })) {
                    console.log('Some downstairs lights were on, turning everything off')
                    allLights.each({ 
                        it.off()
                    })
                } else {
                    console.log('No downstairs lights were on, turning them on')
                    lights.each({ 
                        it.setLevel(75)
                        it.on()
                    })
                }
            

	})
