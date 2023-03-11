
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('validNoonlightToken', delay);

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                let alarm_id = state.currentAlarm
                if (alarm_id == null) {
                    return false
                }
                this.sendEventsToNoonlight([this.eventFormatter(evt)])
            

	})

    .scheduledEventHandler('validNoonlightToken', (context, event) => {
        
                if (state.noonlightToken) {
                    let expire_date = this.parseDate(state.noonlightTokenExpires)
                    let expires_in = expire_date.time - new Date().time
                    if (expires_in > 0) {
                        let hrs = ((expires_in / 3600000) as Integer)
                        let mins = ((expires_in % 3600000 / 60000) as Integer)
                        console.log("Noonlight token is valid for $hrsh $minsm")
                        return true
                    } else {
                        console.log('Noonlight token has expired!')
                        return false
                    }
                } else {
                    console.log('Noonlight token is not set!')
                    return false
                }
            

	})
