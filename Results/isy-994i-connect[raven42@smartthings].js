
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'statusUpdate')

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
                console.log("modeChangeHandler() mode changed ${event.value}")
                let isy = this.getIsyHub()
                if (!isy) {
                    return null
                }
                let host = isy.value.networkAddress + ':' + isy.value.port
                let auth = this.getAuthorization()
                let variables = this.getVariables()
                if (!settings?.modeMapVariable) {
                    console.log('modeChangeHandler() modeMapVariable not set')
                    return null
                }
                if (settings?."modeMap${event.value}") {
                    let mapping = settings."modeMap${event.value}"
                    let modeMapVariable = variables.find({ 
                        settings.modeMapVariable.startsWith(it.value.name)
                    })
                    let mappingVariable = variables.find({ 
                        mapping.startsWith(it.value.name)
                    })
                    if (modeMapVariable && mappingVariable ) {
                        let path = "/rest/vars/set/${modeMapVariable.value.type}/${modeMapVariable.value.id}/${mappingVariable.value.value}"
                        console.log("modeMap${event.value}: setting ${modeMapVariable.value.name} to ${mappingVariable.value.name}")
                        this.sendHubCommand(new physicalgraph.device.HubAction(['method': 'GET', 'path': path , 'headers': ['HOST': host , 'Authorization': auth ]], null, ['callback': parseModeChange ]))
                    }
                }
            

	})

    .subscribedEventHandler('statusUpdate', (context, event) => {
        
                if (settings.debug) {
                    console.log("statusUpdate() evt:[$evt]")
                }
                let hub = evt?.hubId
                let parsedEvent = this.parseLanMessage(event.description)
                if (parsedEvent) {
                    parsedEvent << ['hub': hub ]
                    if (parsedEvent?.headers?.content-type.equals('application/xml')) {
                        let xml = new XmlParser().parseText(parsedEvent?.body)
                        xml.nodes.node.each({ let xmlNode ->
                            let child = this.getChildDevices()?.find({ 
                                it.getDataValue('nodeAddress').equals(xmlNode?.id?.text())
                            })
                            if (child) {
                                console.log("statusUpdate() id:${xmlNode.id.text()} status:${xmlNode.status.text()} sending statusUpdate() to $child")
                                child.statusUpdate(xmlNode)
                            }
                        })
                    } else {
                        console.log("statusUpdate() ignoring event:$parsedEvent")
                    }
                }
            

	})
