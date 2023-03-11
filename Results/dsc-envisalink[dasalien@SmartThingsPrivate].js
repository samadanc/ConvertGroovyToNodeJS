
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'securitySystemStatus', 'sthmHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'sthmHandler')

    })

    .subscribedEventHandler('sthmHandler', (context, event) => {
        
                console.log(evt)
                if (settings.sthmSync == 'Yes') {
                    console.log("sthmHandler: STHM changed status to: ${event.value}")
                    if (settings.sthmVirtualSwitches == 'Yes') {
                        if (event.value == 'disarmed') {
                            console.log('Switching off both VSwitches')
                            this.updateVirtualSwitches('stay', 'off')
                            this.updateVirtualSwitches('away', 'off')
                        }
                        if (event.value == 'armedAway') {
                            console.log('Switching on VSwitch Away')
                            this.updateVirtualSwitches('away', 'on')
                        }
                        if (event.value == 'armedStay') {
                            console.log('Switching on VSwitch Stay')
                            this.updateVirtualSwitches('stay', 'on')
                        }
                    }
                    let children = this.getChildDevices()
                    let child = children.find({ let item ->
                        item.device.deviceNetworkId in ['dscstay1', 'dscaway1']
                    })
                    if (child != null) {
                        let panelStatus = child.currentPartitionStatus
                        console.log("sthmHandler: using panel: ${child.device.deviceNetworkId} status: $panelStatus")
                        let dscMap = ['Armed Away': 'armedAway', 'Entry Dealy': 'on', 'Exit Delay': 'on', 'Force Ready': 'disarmed', 'Ready': 'disarmed', 'Armed Stay': 'armedStay']
                        if (dscMap[ panelStatus ] && event.value != dscMap[ panelStatus ]) {
                            if (event.value == 'disarmed' && dscMap[ panelStatus ] in ['armedStay', 'armedAway', 'on']) {
                                this.sendUrl('disarm')
                                console.log("sthmHandler: ${event.value} is valid action for $panelStatus, disarmed sent")
                            } else {
                                if (event.value == 'armedAway' && dscMap[ panelStatus ] in ['armedStay', 'disarmed']) {
                                    this.sendUrl('arm')
                                    console.log("sthmHandler: ${event.value} is valid action for $panelStatus, armedAway sent")
                                } else {
                                    if (event.value == 'armedStay' && dscMap[ panelStatus ] in ['armedAway', 'disarmed']) {
                                        this.sendUrl('stayarm')
                                        console.log("sthmHandler: ${event.value} is valid action for $panelStatus, armedStay sent")
                                    }
                                }
                            }
                        }
                    }
                }
            

	})
