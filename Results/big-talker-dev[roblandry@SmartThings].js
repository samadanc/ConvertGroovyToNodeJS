
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('onButton2Event', (context, event) => {
        
                this.processButtonEvent(2, evt)
            

	})

    .subscribedEventHandler('onWater3Event', (context, event) => {
        
                this.processWaterEvent(3, evt)
            

	})

    .subscribedEventHandler('onPresence2Event', (context, event) => {
        
                this.processPresenceEvent(2, evt)
            

	})

    .subscribedEventHandler('onSwitch3Event', (context, event) => {
        
                this.processSwitchEvent(3, evt)
            

	})

    .subscribedEventHandler('onLock2Event', (context, event) => {
        
                this.processLockEvent(2, evt)
            

	})

    .subscribedEventHandler('onThermostat2Event', (context, event) => {
        
                this.processThermostatEvent(2, evt)
            

	})

    .subscribedEventHandler('onSmoke2Event', (context, event) => {
        
                this.processSmokeEvent(2, evt)
            

	})
