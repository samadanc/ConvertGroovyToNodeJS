
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('updateLights', (context, event) => {
        
                let one = switches_1*.currentValue('switch').contains('on')
                let two = switches_2*.currentValue('switch').contains('on')
                let three = switches_3*.currentValue('switch').contains('on')
                let four = switches_4*.currentValue('switch').contains('on')
                buttonDevice.setLightStatus(one ? color_1 : 0, two ? color_2 : 0, three ? color_3 : 0, four ? color_4 : 0)
            

	})

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
                (1..4).each({ 
                    settings['switches_' + it ].each({ 
                        if (it.hasCommand('poll')) {
                            it.poll()
                        } else {
                            if (it.hasCommand('ping')) {
                                it.ping()
                            }
                        }
                    })
                })
                return null
            

	})
