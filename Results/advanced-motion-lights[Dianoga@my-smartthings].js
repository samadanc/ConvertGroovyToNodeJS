
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
                log.trace("Switch: physical: ${event.isPhysical()}, value: ${event.value}, deviceId: ${event.deviceId}")
                let zones = this.findDevice('switch', event.deviceId)
                log.trace("Zones: $zones")
                if (!zones) {
                    log.trace('Device not found')
                    return null
                }
                zones.each({ let zone ->
                    state.zones["$zone"].physical = event.isPhysical()
                })
            

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
                log.trace("Motion: value: ${event.value}, deviceId: ${event.deviceId}")
                let zones = this.findDevice('motion', event.deviceId)
                log.trace("Zones: $zones")
                if (!zones) {
                    log.trace('Device not found')
                    return null
                }
                zones.each({ let zone ->
                    if (event.value == 'active') {
                        console.log(settings["name$zone"] + ': Turning on')
                        state.zones["$zone"].active = true
                        settings["switch$zone"]?.on()
                    }
                    if (event.value == 'inactive' && !(settings["motion$zone"].any({ 
                        it.currentMotion == 'active'
                    }))) {
                        state.zones["$zone"].active = false
                        state.zones["$zone"].inactive = nowSeconds 
                        if (!(settings["offAfterMotion$zone"])) {
                            return null
                        }
                        this.runIn(60 * settings["offDelay$zone"], switchOff, ['overwrite': false, 'data': ['zone': zone ]])
                    }
                })
            

	})
