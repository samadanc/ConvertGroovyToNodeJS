
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'OnAlarmStatusChange')

    })

    .subscribedEventHandler('OnAlarmStatusChange', (context, event) => {
        
                if (!(this.PreCheck())) {
                    return null
                }
                if (event.value == 'off') {
                    this.logDebug('Caught alarm status change: ' + event.value)
                    this.logDebug("Scheduleing security re-arm in $arrivalSleepMin min(s)")
                    this.runIn(arrivalSleepMin * 60, rearmSecurity)
                    this.subscribe(contactSensors, 'contact.closed', OnContactClosed)
                } else {
                    this.unschedule()
                    this.unsubscribe(OnContactClosed)
                }
            

	})
