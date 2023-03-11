
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Title'', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('pollShades', delay);

    })

    .scheduledEventHandler('pollShades', (context, event) => {
        
                let now = this.now()
                let updateBattery = false
                if (!atomicState?.lastBatteryUpdate || atomicState?.lastBatteryUpdate - now > 60 * 60 * 1000) {
                    updateBattery = true
                    atomicState?.lastBatteryUpdate = now 
                }
                console.log("pollShades: updateBattery = $updateBattery")
                this.getShadeDevices().eachWithIndex({ let device, let index ->
                    if (device != null) {
                        let shadeId = this.dniToShadeId(device.deviceNetworkId)
                        this.runIn(index * 5, 'pollShadeDelayed', ['overwrite': false, 'data': ['shadeId': shadeId , 'updateBattery': updateBattery ]])
                    } else {
                        console.log("Got null shade device, index $index")
                    }
                })
            

	})
