
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'response')

        context.api.schedules.runEvery3Hours('embyPoller', delay);

    })

    .subscribedEventHandler('response', (context, event) => {
        
                let msg = this.parseLanMessage(event.description)
                let stillPlaying = []
                if (msg && msg.body && msg.body.startsWith('<?json')) {
                    console.log('Parsing status/sessions')
                    let whatToCallMe = ''
                    let playingDevices = [:]
                    let mediaContainer = new XmlSlurper().parseText(msg.body)
                    mediaContainer.Video.each({ let thing ->
                        if (thing.Player.title.text() != '') {
                            whatToCallMe = "${thing.Player.@title.text()}-${thing.Player.@product.text()}"
                        } else {
                            if (thing.Player.device.text() != '') {
                                whatToCallMe = "${thing.Player.@device.text()}-${thing.Player.@product.text()}"
                            }
                        }
                        playingDevices << [thing.Player.machineIdentifier.text(): ['name': "$whatToCallMe", 'id': "${thing.Player.@machineIdentifier.text()}"]]
                        if (settings?.stPoller) {
                            let embyEvent = [:] << ['id': "${thing.Player.@machineIdentifier.text()}", 'type': "${thing.@type.text()}", 'status': "${thing.Player.@state.text()}", 'user': "${thing.User.@title.text()}"]
                            stillPlaying << "${thing.Player.@machineIdentifier.text()}"
                            this.eventHandler(embyEvent)
                        }
                    })
                    if (settings?.stPoller) {
                        state.playingClients.each({ let id, let data ->
                            if (!(stillPlaying.contains("$id"))) {
                                let embyEvent2 = [:] << ['id': "$id", 'type': '--', 'status': 'stopped', 'user': '--']
                                this.eventHandler(embyEvent2)
                            }
                        })
                    }
                    state.embyClients << playingDevices 
                    state.playingClients = playingDevices 
                }
            

	})

    .scheduledEventHandler('embyPoller', (context, event) => {
        
                if (settings?.stPoller) {
                    this.executeRequest('/status/sessions', 'GET')
                    log.warn('Emby Poller Update')
                    this.runOnce(new Date(this.now() + 10000), embyPoller)
                }
            

	})
