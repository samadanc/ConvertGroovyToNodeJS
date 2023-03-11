
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery30Minutes('pollHandler', delay);

    })

    .scheduledEventHandler('pollHandler', (context, event) => {
        
                console.log('pollhandler')
                let calendarsToCheck = this.getAllChildDevices()
                calendarsToCheck.each({ let cal ->
                    let ev = this.getNextEvents(cal.deviceNetworkId)
                    console.log('setting next event to trigger at ' + ev.first().start.dateTime)
                    cal.setNextEvent(ev.first().start.dateTime, ev.first().end.dateTime, ev.first().summary)
                })
            

	})
