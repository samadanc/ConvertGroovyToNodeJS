
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('actuators').capability(['actuator']).name('');
            section.deviceSetting('sensors').capability(['sensor']).name('');
            section.textSetting('containerID').name('ID of container to add');
            section.textSetting('containerValidationKey').name('Validation key for container to add');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery30Minutes('searchForDevices', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'processLocationEvent')

    })

    .subscribedEventHandler('processDeviceEvent', (context, event) => {
        
        this.getSubscribeEventsMap().collect().findAll({
        it.value > new Date().getTime()
        }).each({
        log.info("Sending event to '${it.key}' from '${event.device.name}'; '${event.name}': '${event.value}'")
        }).each({
        this.sendMessage(it.key, ['deviceID': event.device.deviceNetworkId, 'propertyName': event.name, 'propertyValue': event.value])
        })
        

	})

    .subscribedEventHandler('processLocationEvent', (context, event) => {
        
        let lanMessage = this.parseLanMessage(event.description)
        if (lanMessage?.ssdpTerm == 'urn:schemas-upnp-org:device:AutoBridge:1') {
        log.info("Processing SSDP message from ${lanMessage.networkAddress}...")
        let containerID = lanMessage.ssdpUSN.split(':')[1]
        this.getContainerHostMap()[ containerID ] = lanMessage.networkAddress
        } else {
        if (lanMessage?.mdnsPath) {
        log.info("Processing MDNS message from ${lanMessage.networkAddress}...")
        log.info('RECEIVED MDNS, NEED TO IMPLEMENT')
        } else {
        if (lanMessage?.json?.operation != null) {
        let containerID = lanMessage.header.split()[1].split('/').last()
        let operation = lanMessage?.json?.operation
        let validationKeyString = this.getContainerValidationKeyStringMap()[ containerID ]
        if (validationKeyString != null) {
        let dateString = lanMessage.headers['Date']
        let date = Date.parse('EEE, dd MMM yyyy HH:mm:ss z', dateString)
        if (Math.abs(date.getTime() - new Date().getTime()) > 60000) {
        throw new Exception('Date is out of valid range')
        }
        let providedSignatureString = lanMessage.headers['Authorization']
        let actualSignatureString = this.computeSignatureString(validationKeyString, lanMessage.headers['Date'], lanMessage.body)
        if (providedSignatureString != actualSignatureString ) {
        throw new Exception('Signature is not valid')
        }
        }
        if (operation == 'syncSources') {
        let sourceIDs = lanMessage.json.sourceIDs.toSet()
        log.info("Syncing device sources from '$containerID' for ${sourceIDs.size()} sources...")
        this.getChildDeviceInfos().findAll({
        it.path.targetContainerID == containerID
        }).findAll({
        !(sourceIDs.contains(it.path.sourceContainerID))
        }).each({
        this.tryDeleteChildDevice(it.device.deviceNetworkId)
        })
        this.searchForDevices()
        } else {
        if (operation == 'syncSourceDevices') {
        let existingDeviceIDChildDeviceMap = this.getChildDeviceInfos().findAll({
        it.path.targetContainerID == containerID && it.path.sourceContainerID == lanMessage.json.sourceID
        }).collectEntries({
        [it.path.deviceID: it.device]
        })
        let deviceIDs = lanMessage.json.devices.collect({
        it.deviceID
        }).toSet()
        log.info("Syncing devices from '$containerID' for ${deviceIDs.size()} devices...")
        existingDeviceIDChildDeviceMap.findAll({
        !(deviceIDs.contains(it.key))
        }).each({
        this.tryDeleteChildDevice(it.value.deviceNetworkId)
        })
        lanMessage.json.devices.each({
        let existingChildDevice = existingDeviceIDChildDeviceMap[it.deviceID]
        if (existingChildDevice == null) {
        this.addChildDevice(it.namespace, it.typeName, containerID + ':' + lanMessage.json.sourceID + ':' + it.deviceID, location.getHubs()[0].id, ['name': it.name, 'label': it.name, 'completedSetup': true])
        } else {
        if (existingChildDevice.name != it.name) {
        log.info("Renaming device '${existingChildDevice.name}' to '${it.name}'...")
        if (existingChildDevice.name == existingChildDevice.label) {
        existingChildDevice.label = it.name
        }
        existingChildDevice.name = it.name
        }
        }
        })
        } else {
        if (operation == 'syncDeviceState') {
        let childDevice = this.getChildDevice(containerID + ':' + lanMessage.json.sourceID + ':' + lanMessage.json.deviceID)
        log.info("Syncing state from '$containerID' for device '${lanMessage.json.deviceID}' (${childDevice?.name}); setting property '${lanMessage.json.propertyName}' to '${lanMessage.json.propertyValue}'...")
        if (lanMessage.json.propertyName == 'image' && lanMessage.json.propertyValue != '') {
        childDevice?.storeImage(java.util.UUID.randomUUID().toString().replaceAll('-', ''), new ByteArrayInputStream(lanMessage.json.propertyValue.decodeBase64()))
        } else {
        childDevice?.sendEvent(['name': lanMessage.json.propertyName, 'value': lanMessage.json.propertyValue])
        }
        childDevice?.onEventSent(lanMessage.json.propertyName, lanMessage.json.propertyValue)
        } else {
        if (operation == 'getDevices') {
        log.info("Getting devices for '$containerID'...")
        this.searchForDevices()
        
        context.api.devices.sendCommands(context.config.actuators, 'actuator', sendMessage)
    
        ['deviceID': it.deviceNetworkId, 'name': it.label ? it.label : it.name, 'capabilityNames': it.getCapabilities().collect({
        it.name
        }).toList(), 'propertyNameValueMap': this.getPropertyNameValueMap(it)]
        })])
        } else {
        if (operation == 'getDeviceState') {
        log.info("Getting device state for '$containerID' for device '${lanMessage.json.deviceID}'...")
        let assignedDevice = this.getAssignedDevice(lanMessage.json.deviceID)
        if (assignedDevice) {
        this.sendMessage(containerID, ['deviceID': lanMessage.json.deviceID, 'propertyNameValueMap': this.getPropertyNameValueMap(assignedDevice)])
        }
        } else {
        if (operation == 'invokeDeviceCommand') {
        log.info("Invoking device command for '$containerID' for device '${lanMessage.json.deviceID}', command '${lanMessage.json.commandName}'...")
        this.getAssignedDevice(lanMessage.json.deviceID)?."${lanMessage.json.commandName}"()
        } else {
        if (operation == 'subscribeEvents') {
        log.info("Setting subscription for'$containerID'...")
        this.getSubscribeEventsMap()[ containerID ] = new Date(new Date().getTime() + lanMessage.json.expirationMillisecondCount).getTime()
        }
        }
        }
        }
        }
        }
        }
        }
        }
        }
        

	})

    .scheduledEventHandler('searchForDevices', (context, event) => {
        
        log.info('Searching for devices...')
        this.sendHubCommand(new physicalgraph.device.HubAction('lan discovery urn:schemas-upnp-org:device:AutoBridge:1', physicalgraph.device.Protocol.LAN))
        

	})
