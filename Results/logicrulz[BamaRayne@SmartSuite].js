
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'RemindRevent', 'remindRHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'remindR', 'remindRProfiles')

    })

    .subscribedEventHandler('remindRHandler', (context, event) => {
        
                log.info("event received from RemindR ==> ${event.descriptionText}")
                let children = this.getChildApps()
                let data = event.descriptionText
                children.each({ let child ->
                    if (child.label == data ) {
                        log.info("executing logic block ${child.label}")
                        child.processActions(evt)
                    }
                })
            

	})

    .subscribedEventHandler('remindRProfiles', (context, event) => {
        
                let result 
                log.warn("received Profiles List from RemindR: ${event.data}")
                switch (event.value) {
                    case 'refresh':
                        state.profiles = event.jsonData && event.jsonData?.profiles ? event.jsonData.profiles : []
                        break
                    case 'runReport':
                        let profiles = event.jsonData
                        result = this.runReport(profiles)
                        break
                }
                return result 
            

	})
