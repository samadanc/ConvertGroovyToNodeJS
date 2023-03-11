
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('bedroomActive', (context, event) => {
        
                let start = this.timeToday(startTime, location?.timeZone)
                let stop = this.timeToday(stopTime, location?.timeZone)
                let now = new Date()
                console.log("bedroomActive, status: ${state.ststus}, start: $start, stop: $stop, now: $now")
                if (state.status == 'waiting') {
                    console.log('motion detected in bedroom, disarming')
                    this.unschedule('sendMessage')
                    state.status = null
                } else {
                    if (start.before(now) && stop.after(now)) {
                        console.log('motion in bedroom, look for bathroom motion')
                        state.status = 'pending'
                    } else {
                        console.log('Not in time window')
                    }
                }
            

	})

    .subscribedEventHandler('bathroomActive', (context, event) => {
        
                console.log("bathroomActive, status: ${state.status}")
                if (state.status == 'pending') {
                    let delay = threshold.toInteger() * 60
                    state.status = 'waiting'
                    console.log("runIn($delay)")
                    this.runIn(delay, sendMessage)
                }
            

	})
