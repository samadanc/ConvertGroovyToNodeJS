
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('reSyncFromMaster', delay);

    })

    .subscribedEventHandler('speedHandler', (context, event) => {
        
                this.syncSpeedState(event.deviceId)
            

	})

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
                this.log("BINDING: ${event.displayName} OFF detected")
                this.syncSwitchState(event.deviceId, false)
            

	})

    .subscribedEventHandler('levelHandler', (context, event) => {
        
                if (event.device.currentValue('switch', true) == 'off') {
                    return null
                }
                this.syncLevelState(event.deviceId)
            

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
                this.log("BINDING: ${event.displayName} ON detected")
                this.syncSwitchState(event.deviceId, true)
                this.syncLevelState(event.deviceId)
            

	})

    .subscribedEventHandler('colorTemperatureHandler', (context, event) => {
        
                this.syncColorTemperatureState(event.deviceId)
            

	})

    .subscribedEventHandler('hueHandler', (context, event) => {
        
                this.syncHueState(event.deviceId)
            

	})

    .subscribedEventHandler('colorModeHandler', (context, event) => {
        
                this.syncColorModeState(event.deviceId)
            

	})

    .scheduledEventHandler('reSyncFromMaster', (context, event) => {
        
                this.log('BINDING: reSyncFromMaster()')
                if (settings.masterSwitchId == null) {
                    this.log('BINDING: Master Switch not set')
                    return null
                }
                let masterSwitch = settings.switches.find({ 
                    it.deviceId.toString() == settings.masterSwitchId.toString()
                })
                this.log("masterSwitchId: ${settings.masterSwitchId.toString()}")
                this.log("masterSwitch: $masterSwitch")
                if (((this.now() - atomicState.startInteractingMillis) as long) < 1000 * 60) {
                    this.log('BINDING: Skipping reSync because there has been a recent user interaction.')
                    return null
                }
                let onOrOff = masterSwitch.currentValue('switch') == 'on'
                this.log("onOrOff: $onOrOff")
                this.syncSwitchState(masterSwitchId, onOrOff)
            

	})
