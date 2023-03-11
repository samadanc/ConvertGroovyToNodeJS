
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'lanResponseHandler')

    })

    .subscribedEventHandler('lanResponseHandler', (context, event) => {
        
                let parsedEvent = this.parseEventMessage(event.description)
                if (parsedEvent.body) {
                    let body = new String(parsedEvent.body.decodeBase64())
                    if (body.find('uuid:02780011-440b-107f-8073-3052cbc59611')) {
                        console.log('roku tv is on')
                        state.rokuOn = true
                        return null
                    }
                }
            

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
                switch (event.deviceId) {
                    case netflix.id:
                        this.runCommand('netflix')
                        break
                    case news.id:
                        this.runCommand('news')
                        break
                    case playstation.id:
                        this.runCommand('ps')
                        break
                    case mediacenter.id:
                        this.runCommand('bilibili')
                        break
                }
            

	})
