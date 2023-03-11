
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'response')

    })

    .subscribedEventHandler('response', (context, event) => {
        
                log.trace('in response(evt)')
                let msg = this.parseLanMessage(event.description)
                if (msg && msg.body && msg.body.startsWith('<?xml')) {
                    let mediaContainer = new XmlSlurper().parseText(msg.body)
                    console.log('Parsing /status/sessions')
                    this.getChildDevices().each({ let pht ->
                        console.log("Checking $pht for updates")
                        let identifier = this.getPHTIdentifier(pht.deviceNetworkId)
                        let currentPlayback = mediaContainer.Video.find({ let d ->
                            d.Player.machineIdentifier.text() == identifier 
                        })
                        let playbackState = 'stopped'
                        if (currentPlayback) {
                            playbackState = currentPlayback.Player.state.text()
                        }
                        log.trace("Determined that $pht is: " + playbackState )
                        pht.setPlaybackState(playbackState)
                        log.trace('Current playback type:' + currentPlayback.type.text())
                        pht.playbackType(currentPlayback.type.text())
                        switch (currentPlayback.type.text()) {
                            case 'movie':
                                pht.setPlaybackTitle(currentPlayback.title.text())
                                break
                            case '':
                                pht.setPlaybackTitle('...')
                                break
                            case 'clip':
                                pht.setPlaybackTitle('Trailer')
                                break
                            case 'episode':
                                pht.setPlaybackTitle(currentPlayback.grandparentTitle.text() + ': ' + currentPlayback.title.text())
                        }
                    })
                }
            

	})
