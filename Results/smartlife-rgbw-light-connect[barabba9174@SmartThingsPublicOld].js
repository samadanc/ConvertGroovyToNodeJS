
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('ssdpDiscover', delay);

    })

    .subscribedEventHandler('physicalHandler', (context, event) => {
        
        console.log("physicalHandler called with event:  name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} isPhysical: ${event.isPhysical()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
        for (java.lang.Integer i = 1; i <= 6; i++) {
        if (event.name == "switch$i") {
        this.getChildDevices().each({
        if (event.deviceId == it.id) {
        this.sendEvent(this.getChildDevice("${it.deviceNetworkId}/${app.id}/$i"), ['name': 'switch', 'value': "${event.value}", 'type': 'physical'])
        }
        })
        }
        }
        

	})

    .subscribedEventHandler('virtualHandler', (context, event) => {
        
        console.log("virtualHandler called with event: deviceId ${event.deviceId} name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} isPhysical: ${event.isPhysical()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
        this.getChildDevices().each({
        if (event.deviceId == it.id) {
        console.log(settings["${it.deviceNetworkId.split(/)[0]}_programs_${it.deviceNetworkId.split(/)[2]}_off"])
        if (event.value == 'off' && settings["${it.deviceNetworkId.split(/)[0]}_programs_${it.deviceNetworkId.split(/)[2]}_off"] == 'true') {
        this.getChildDevice(it.deviceNetworkId.split('/')[0])."${event.value}${it.deviceNetworkId.split(/)[2]}"(-1)
        } else {
        this.getChildDevice(it.deviceNetworkId.split('/')[0])."${event.value}${it.deviceNetworkId.split(/)[2]}"()
        }
        }
        })
        

	})
