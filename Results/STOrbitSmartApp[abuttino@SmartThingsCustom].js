
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('main', delay);

    })

    .subscribedEventHandler('batteryHandler', (context, event) => {
        
                if (event.isStateChange() && event.value.toInteger() <= 40) {
                    let msgData = []
                    msgData.add("The ${event.linkText}'s battery is now at ${event.value}% at ${this.timestamp()}")
                    msgData.add("The ${this.makeHtmlColor(event.linkText)} ${this.makeHtmlColor(event.name, green)} is now at ${this.makeHtmlColor(event.value.toUpperCase())}% at ${this.timestamp()}")
                    this.send_message(msgData)
                }
            

	})

    .subscribedEventHandler('rain_delayHandler', (context, event) => {
        
                if (event.isStateChange()) {
                    let msgData = []
                    msgData.add("The ${event.linkText}'s rain delay is now ${event.value} hours at ${this.timestamp()}")
                    msgData.add("The ${this.makeHtmlColor(event.linkText)} ${this.makeHtmlColor(event.name, green)} is now ${this.makeHtmlColor(event.value.toUpperCase())} hours at ${this.timestamp()}")
                    this.send_message(msgData)
                }
            

	})

    .subscribedEventHandler('valveHandler', (context, event) => {
        
                if (event.isStateChange()) {
                    let msgData = []
                    msgData.add("The ${event.linkText} ${event.name} is now ${event.value.toUpperCase()} at ${this.timestamp()}")
                    msgData.add("The ${this.makeHtmlColor(event.linkText)} ${this.makeHtmlColor(event.name, green)} is now ${this.makeHtmlColor(event.value.toUpperCase())} at ${this.timestamp()}")
                    this.send_message(msgData)
                }
            

	})

    .subscribedEventHandler('is_connectedHandler', (context, event) => {
        
                if (event.isStateChange()) {
                    let msgData = []
                    msgData.add("The ${event.linkText}'s WiFi Online Status is now ${(event.value) ? Online : Offline} at ${this.timestamp()}")
                    msgData.add("The ${this.makeHtmlColor(event.linkText)} WiFi ${this.makeHtmlColor(event.name, green)} is now ${this.makeHtmlColor((event.value) ? Online : Offline)} at ${this.timestamp()}")
                    this.send_message(msgData)
                }
            

	})

    .scheduledEventHandler('main', (context, event) => {
        
                log.info("Executing Main Routine ID:${this.random()} at ${this.timestamp()}")
                let data = this.OrbitGet('devices')
                if (data) {
                    this.updateTiles(data)
                } else {
                    log.error('OrbitGet(devices): No data returned, Critical Error: Exit')
                }
            

	})
