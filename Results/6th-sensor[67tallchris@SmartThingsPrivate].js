
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('on_event', (context, event) => {
        
                console.log('[on_event]: ------------- START ------------')
                if (settings.nightlightsenabled && location.mode == settings.homemode) {
                    this.on_home_event(evt)
                }
                if (settings.nightpathenabled && location.mode == settings.nightmode) {
                    this.on_night_event(evt)
                }
                console.log('[on_event]: -------------- END -------------')
            

	})
