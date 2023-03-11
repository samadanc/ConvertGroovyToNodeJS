
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('physicalHandler', (context, event) => {
        
                console.log("physicalHandler called with event:  name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} isPhysical: ${event.isPhysical()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
                for (java.lang.Integer i = 1; i <= vNumber ; i++) {
                    if (event.name == "switch$i") {
                        try {
                            this.sendEvent(settings["virtual$i"], ['name': 'switch', 'value': "${event.value}", 'type': 'physical'])
                        } 
                        catch (let e) {
                            log.trace('Caught error: Likely caused by not using my specialized Simulated Switches')
                            log.trace(e)
                            settings["virtual$i"]."${event.value}Physical"()
                        } 
                    }
                }
            

	})

    .subscribedEventHandler('powerHandler', (context, event) => {
        
                console.log("powerHandler called with event:  name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} isPhysical: ${event.isPhysical()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
                for (java.lang.Integer i = 1; i <= vNumber ; i++) {
                    if (event.name == "power$i") {
                        this.sendEvent(settings["virtual$i"], ['name': 'power', 'value': "${event.value}"])
                    }
                }
            

	})

    .subscribedEventHandler('energyHandler', (context, event) => {
        
                console.log("energyHandler called with event:  name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} isPhysical: ${event.isPhysical()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
                for (java.lang.Integer i = 1; i <= vNumber ; i++) {
                    if (event.name == "energy$i") {
                        this.sendEvent(settings["virtual$i"], ['name': 'energy', 'value': "${event.value}"])
                    }
                }
            

	})

    .subscribedEventHandler('virtualHandler', (context, event) => {
        
                console.log("virtualHandler called with event: deviceId ${event.deviceId} name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} isPhysical: ${event.isPhysical()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
                for (java.lang.Integer i = 1; i <= vNumber ; i++) {
                    if (event.deviceId == settings["virtual$i"].id) {
                        physical."${event.value}$i"()
                    }
                }
            

	})
