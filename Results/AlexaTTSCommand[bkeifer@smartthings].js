
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
                console.log("Speaking: ${settings.command}")
                speech.playTrackAndRestore(state.ttsCommand.uri, state.ttsCommand.duration)
            

	})
