
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'SmartMessageControl', 'zone')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'SmartMessaging', 'zone')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'House Fan Controller', 'zone')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'RemindRevent', 'zone')

    })

    .subscribedEventHandler('zone', (context, event) => {
        
                if (aPause == false) {
                    log.warn('Smart Message Control Communications have been paused in the Parent app by the user')
                    return null
                }
                if (debug) {
                    log.info("event received from ${event.name} with the following message --> ${event.descriptionText}")
                }
                let msg = event.descriptionText
                if (kSwitch) {
                    let status = kSwitch?.currentValue('switch')
                    if (status == kSwitchCmd ) {
                        log.warn('The kill switch has been activated and messages have been stopped')
                    } else {
                        if (status != kSwitchCmd ) {
                            let result 
                            childApps.each({ let child ->
                                let ch = child.label.toLowerCase()
                                if (ch) {
                                    if (debug) {
                                        console.log("Activating Zone: $ch")
                                    }
                                    result = child.ttsActions(evt)
                                } else {
                                    console.log('Could not find a zone to activate')
                                }
                            })
                        }
                    }
                } else {
                    let result 
                    childApps.each({ let child ->
                        let ch = child.label.toLowerCase()
                        if (ch) {
                            if (debug) {
                                console.log("Activating Zone: $ch")
                            }
                            result = child.ttsActions(evt)
                        } else {
                            console.log('Could not find a zone to activate')
                        }
                    })
                }
            

	})
