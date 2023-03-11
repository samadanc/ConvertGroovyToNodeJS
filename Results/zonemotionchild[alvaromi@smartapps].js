
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
        
                log.trace("active handler fired via [${event.displayName}] UTC: ${event.date.format(yyyy-MM-dd HH:mm:ss)}")
                let evtTime = event.date.getTime()
                let device = event.displayName
                if (this.modeIsOK()) {
                    switch (settings.zoneType) {
                        case '0':
                            if (this.activeThresholdReached(evtTime)) {
                                this.zoneOn()
                            }
                            break
                        case '1':
                            this.zoneOn()
                            this.activityTimeoutHandler(evtTime, device)
                            break
                        case '2':
                            if (!state.zoneTriggerActive && this.anyTriggersActive(evtTime)) {
                                this.zoneOn()
                                this.activityTimeoutHandler(evtTime, device)
                                state.zoneTriggerActive = true
                            } else {
                                if (state.zoneTriggerActive) {
                                    this.activityTimeoutHandler(evtTime, device)
                                }
                            }
                            break
                    }
                } else {
                    console.log('modeOK: False')
                }
            

	})
