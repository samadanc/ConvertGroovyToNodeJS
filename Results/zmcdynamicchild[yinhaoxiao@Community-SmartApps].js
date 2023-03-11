
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('inactiveHandler', (context, event) => {
        
                if (settings.zoneType == '0' && this.allInactive()) {
                    this.zoneOff()
                }
            

	})

    .subscribedEventHandler('activeHandler', (context, event) => {
        
                let evtTime = event.date.getTime()
                switch (settings.zoneType) {
                    case '0':
                        if (this.allMotionsActive(evtTime)) {
                            this.zoneOn()
                        }
                        break
                    case '1':
                        this.zoneOn()
                        this.activityTimeoutHandler()
                        break
                    case '2':
                        if (!state.zoneTriggerActive && this.anyTriggersActive(evtTime)) {
                            this.zoneOn()
                            this.activityTimeoutHandler()
                            state.zoneTriggerActive = true
                        } else {
                            if (state.zoneTriggerActive) {
                                this.activityTimeoutHandler()
                            }
                        }
                        break
                }
            

	})
