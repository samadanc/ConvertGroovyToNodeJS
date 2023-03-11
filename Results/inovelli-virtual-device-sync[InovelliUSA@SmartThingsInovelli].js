
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
                switch (event.name) {
                    case ~('.*level.*') :
                        this.sendEvent(this.getChildDevice("${app.id}/${this.getSwitchNumber(event.name)}"), ['name': 'level', 'value': "${event.value}", 'type': 'physical'])
                        break
                    default: 
                    this.sendEvent(this.getChildDevice("${app.id}/${this.getSwitchNumber(event.name)}"), ['name': 'switch', 'value': "${event.value}", 'type': 'physical'])
                    break
                }
            

	})

    .subscribedEventHandler('powerHandler', (context, event) => {
        
                console.log("powerHandler called with event:  name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} isPhysical: ${event.isPhysical()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
                this.sendEvent(this.getChildDevice("${app.id}/${this.getSwitchNumber(event.name)}"), ['name': 'power', 'value': "${event.value}"])
            

	})

    .subscribedEventHandler('energyHandler', (context, event) => {
        
                console.log("energyHandler called with event:  name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} isPhysical: ${event.isPhysical()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
                this.sendEvent(this.getChildDevice("${app.id}/${this.getSwitchNumber(event.name)}"), ['name': 'energy', 'value': "${event.value}"])
            

	})

    .subscribedEventHandler('virtualHandler', (context, event) => {
        
                console.log("virtualHandler called with event: deviceId ${event.deviceId} name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} isPhysical: ${event.isPhysical()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
                this.getChildDevices().each({ 
                    if (event.deviceId == it.id) {
                        let switchNumber = it.deviceNetworkId.split('/')[1]
                        switch (event.value) {
                            case 'setLevel':
                                physical."setLevel$switchNumber"(it.currentValue('level'))
                                break
                            default: 
                            physical."${event.value}$switchNumber"()
                            break
                        }
                    }
                })
            

	})
