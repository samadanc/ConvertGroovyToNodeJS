
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
                let s = switches.find({ 
                    event.deviceId == it.id
                })
                let phrase = location.helloHome.getPhrases().find({ 
                    it.label == s.displayName
                })
                if (phrase) {
                    location.helloHome.execute(phrase.label)
                }
                let mode = location.modes.find({ 
                    it.name == s.displayName
                })
                if (mode) {
                    this.setLocationMode(mode)
                }
            

	})
