
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'shmHandler')

    })

    .subscribedEventHandler('shmHandler', (context, event) => {
        
                if (settings.shmSync == 'Yes') {
                    console.log("shmHandler: shm changed state to: ${event.value}")
                    let children = this.getChildDevices()
                    let child = children.find({ let item ->
                        item.device.deviceNetworkId in ['dscstay1', 'dscaway1']
                    })
                    if (child != null) {
                        console.log("shmHandler: using panel: ${child.device.deviceNetworkId} state: ${child.currentStatus}")
                        let dscMap = ['alarm': 'on', 'away': 'away', 'entrydelay': 'on', 'exitdelay': 'on', 'forceready': 'off', 'instantaway': 'away', 'instantstay': 'stay', 'ready': 'off', 'stay': 'stay']
                        if (dscMap[child.currentStatus] && event.value != dscMap[child.currentStatus]) {
                            if (event.value == 'off' && dscMap[child.currentStatus] in ['stay', 'away', 'on']) {
                                this.sendUrl('disarm')
                                console.log("shmHandler: ${event.value} is valid action for ${child.currentStatus}, disarm sent")
                            } else {
                                if (event.value == 'away' && dscMap[child.currentStatus] in ['stay', 'off']) {
                                    this.sendUrl('arm')
                                    console.log("shmHandler: ${event.value} is valid action for ${child.currentStatus}, arm sent")
                                } else {
                                    if (event.value == 'stay' && dscMap[child.currentStatus] in ['away', 'off']) {
                                        this.sendUrl('stayarm')
                                        console.log("shmHandler: ${event.value} is valid action for ${child.currentStatus}, stayarm sent")
                                    }
                                }
                            }
                        }
                    }
                }
            

	})
