
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                if (allOk) {
                    log.trace("modeChangeHandler ${event.name}: ${event.value} ($triggerModes)")
                    hues.each({ 
                        java.lang.Integer dimLevel = it.currentValue('level')
                        java.lang.Integer currenthue = it.currentValue('hue')
                        console.log("Current Level: $dimLevel - Target Level: $lightLevel")
                        java.lang.Integer targetLevel = lightLevel.toInteger()
                        java.lang.Integer levelDifference = targetLevel - dimLevel 
                        console.log("Level Difference $levelDifference")
                        java.lang.Integer firstStepLevel = dimLevel + levelDifference / 3
                        java.lang.Integer firstTransTime = transistiontime * 60 / 3
                        console.log("TransTime1: $firstTransTime")
                        it.setColor(['hue': 14, 'saturation': 5, 'level': firstStepLevel , 'transitiontime': firstTransTime ])
                        this.runIn(firstTransTime, secondFade)
                    })
                }
            

	})
