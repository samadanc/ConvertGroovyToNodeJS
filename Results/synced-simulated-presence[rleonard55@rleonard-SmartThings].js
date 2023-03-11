
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('OnPresenceArrive', (context, event) => {
        
                this.debugMsg('Running \'OnPresenceArrive\'')
                this.debugMsg("Value is : ${SimulatedPresenceSensor.currentValue(presence)}")
                this.PresenceSync()
            

	})

    .subscribedEventHandler('SimulatedPresenceChange', (context, event) => {
        
                this.runIn(60 * settings.SyncMinutes, PresenceSync)
            

	})

    .subscribedEventHandler('OnPresenceDepart', (context, event) => {
        
                this.debugMsg('Running \'OnPresenceDepart\'')
                this.debugMsg("Value is : ${SimulatedPresenceSensor.currentValue(presence)}")
                this.PresenceSync()
            

	})
