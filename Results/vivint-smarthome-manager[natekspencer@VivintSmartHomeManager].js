
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('delayAddChildren', delay);

    })

    .scheduledEventHandler('delayAddChildren', (context, event) => {
        
                try {
                    let validDevices = this.getDevicesByType('ALL')
                    data.devices.each({ let deviceNetworkId ->
                        try {
                            if (!(this.getChildDevice(deviceNetworkId))) {
                                let device = state.devices.find({ 
                                    deviceNetworkId == [it.systemId, it.id].join('.')
                                })
                                let name = validDevices[ deviceNetworkId ]
                                log.info("Adding device: $name [$deviceNetworkId]")
                                this.addChildDevice(app.namespace, this.typeName(device.type), deviceNetworkId, location.hubs[0]?.id, ['label': name , 'completedSetup': true])
                            }
                        } 
                        catch (let e) {
                            log.error("Error creating device: $e")
                        } 
                    })
                    this.runIn(1, pollChildren, ['overwrite': true])
                } 
                catch (java.util.concurrent.TimeoutException e) {
                    this.runIn(1, delayAddChildren, ['data': data ])
                } 
                catch (let e) {
                    log.error("Error creating children: $e")
                } 
            

	})
