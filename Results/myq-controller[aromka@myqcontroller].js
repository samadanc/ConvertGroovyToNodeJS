
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'lanEventHandler')

    })

    .subscribedEventHandler('lanEventHandler', (context, event) => {
        
                let description = event.description
                let hub = evt?.hubId
                let parsedEvent = this.parseLanMessage(description)
                if (parsedEvent.data && parsedEvent.data.service && parsedEvent.data.service == 'myq') {
                    let msg = parsedEvent.data
                    if (msg.result == 'pong') {
                        log.info('Successfully contacted local server')
                        atomicState.pong = true
                    }
                }
                if (parsedEvent.data && parsedEvent.data.event) {
                    switch (parsedEvent.data.event) {
                        case 'init':
                            this.sendLocalServerCommand(settings.localServerIp, 'init', ['security': this.processSecurity()])
                            break
                        case 'event':
                            this.processEvent(parsedEvent.data.data)
                            break
                    }
                }
            

	})
