
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('refresh', delay);

        context.api.schedules.runIn('subscribeToDevices', delay);

        context.api.schedules.runIn('refreshDevices', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'locationHandler')

    })

    .subscribedEventHandler('locationHandler', (context, event) => {
        
                console.log('locationHandler(evt)')
                let description = event.description
                let hub = evt?.hubId
                let parsedEvent = this.parseDiscoveryMessage(description)
                parsedEvent << ['hub': hub ]
                if (parsedEvent.headers && parsedEvent.body) {
                    String headerString = new String(parsedEvent.headers.decodeBase64())?.toLowerCase()
                    if (headerString != null && headerString.contains('text/xml') || headerString.contains('application/xml')) {
                        let body = this.parseXmlBody(parsedEvent.body)
                        let switches = this.getespSwitches()
                        let espSwitch = switches.find({ 
                            it?.key?.contains(body?.device?.UDN?.text())
                        })
                        if (espSwitch) {
                            espSwitch.value << ['name': body?.device?.friendlyName?.text(), 'verified': true]
                        } else {
                            log.error('/esp8266.xml returned a esp8266 device that didn\'t exist')
                        }
                    }
                } else {
                    if (parsedEvent?.ssdpPath?.contains('esp8266')) {
                        console.log(parsedEvent.ssdpUSN.toString())
                        let switches = this.getespSwitches()
                        if (!switches."${parsedEvent.ssdpUSN.toString()}") {
                            switches << ["${parsedEvent.ssdpUSN.toString()}": parsedEvent ]
                        } else {
                            console.log('Device was already found in state...')
                            let d = switches."${parsedEvent.ssdpUSN.toString()}"
                            java.lang.Boolean deviceChangedValues = false
                            console.log("${d.ip} <==> ${parsedEvent.ip}")
                            if (d.ip != parsedEvent.ip || d.port != parsedEvent.port) {
                                d.ip = parsedEvent.ip
                                d.port = parsedEvent.port
                                deviceChangedValues = true
                                console.log('Device\'s port or ip changed...')
                                let child = this.getChildDevice(parsedEvent.mac)
                                child.subscribe(parsedEvent.ip, parsedEvent.port)
                                child.poll()
                            }
                        }
                    }
                }
            

	})

    .scheduledEventHandler('refreshDevices', (context, event) => {
        
                console.log('refreshDevices() called')
                let devices = this.getAllChildDevices()
                devices.each({ let d ->
                    console.log("Calling refresh() on device: ${d.id}")
                    d.refresh()
                })
            

	})

    .scheduledEventHandler('subscribeToDevices', (context, event) => {
        
                console.log('subscribeToDevices() called')
                let children = this.getChildDevices(true)
                let childdeviceinfo = []
                let bridgedevice 
                console.log(selectedSwitch)
                children.each({ 
                    if (it.getName() == 'ESP8266_Compool_Bridge') {
                        bridgedevice = it 
                    }
                })
                children.each({ 
                    console.log(it.getName())
                    console.log(it.deviceNetworkId)
                    if (it.getName() != 'ESP8266_Compool_Bridge') {
                        this.subscribe(it, 'switch', switchevent)
                        this.subscribe(bridgedevice, "${it.getName().toLowerCase()}", masterevent)
                        console.log("subscribed to ${bridgedevice.getName()} with ${it.getName().toLowerCase()}")
                    }
                })
            

	})

    .scheduledEventHandler('refresh', (context, event) => {
        
                console.log('refresh() called')
                this.doDeviceSync()
                this.refreshDevices()
            

	})
