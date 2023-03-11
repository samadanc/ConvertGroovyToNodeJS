
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
                if (event.name != 'mode') {
                    return null
                }
                if (loggingOn) {
                    console.log('BI_modeChange detected. ' + event.value)
                }
                let checkMode = ''
                location.modes.each({ let mode ->
                    if (mode.name == event.value) {
                        checkMode = 'mode-' + mode.id
                        if (loggingOn) {
                            console.log('BI_modeChange matched to ' + mode.name)
                        }
                    }
                })
                if (checkMode != '' && settings[ checkMode ]) {
                    if (loggingOn) {
                        console.log('BI_Found Profile ' + settings[ checkMode ])
                    }
                    if (localOnly) {
                        this.localAction(settings[ checkMode ].toInteger())
                    } else {
                        this.externalAction(settings[ checkMode ].toInteger())
                    }
                }
            

	})
