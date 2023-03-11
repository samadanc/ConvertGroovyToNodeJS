
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'handleLANEvent')

    })

    .subscribedEventHandler('handleLANEvent', (context, event) => {
        
                let message = this.parseLanMessage(event.value)
                if (!message.header) {
                    return null
                }
                let path = message.header.split('\n')[0].split()[1]
                if (path == '/presence') {
                    let slurper = new JsonSlurper()
                    let json = slurper.parseText(message.body)
                    switch (json.event) {
                        case 'AP-STA-CONNECTED':
                            let sensor = this.findPresenceSensor(json.mac_address)
                            if (sensor) {
                                log.info("${sensor.name} arrived")
                                sensor.arrived()
                            }
                            break
                        case 'AP-STA-DISCONNECTED':
                            let sensor = this.findPresenceSensor(json.mac_address)
                            if (sensor) {
                                log.info("${sensor.name} departed")
                                sensor.departed()
                            }
                            break
                    }
                }
            

	})
