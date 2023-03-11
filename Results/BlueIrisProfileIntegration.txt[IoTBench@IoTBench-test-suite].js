
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChange')

    })

    .subscribedEventHandler('modeChange', (context, event) => {
        
                console.log('modeChange detected.')
                let checkMode = ''
                location.modes.each({ let mode ->
                    if (mode.name == event.value) {
                        checkMode = 'mode-' + mode.id
                    }
                })
                if (settings[ checkMode ]) {
                    console.log('Found profile ' + settings[ checkMode ])
                    this.takeAction(settings[ checkMode ].toInteger())
                }
            

	})
