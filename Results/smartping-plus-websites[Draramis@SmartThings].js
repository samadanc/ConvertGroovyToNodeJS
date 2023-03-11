
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('poll', delay);

    })

    .scheduledEventHandler('poll', (context, event) => {
        
                console.log("poll started, states are: state.downHost = ${state.downHost}, state.pollVerify = ${state.pollVerify}, state.timeDown = ${state.timeDown}, state.websiteDownMsgSent = ${state.websiteDownMsgSent}, state.sentPeriodMsg = ${state.sentPeriodMsg}")
                let reqParams = ['uri': "${state.website}"]
                try {
                    this.httpGet(reqParams, { let resp ->
                        if (resp.status == 200) {
                            if (state.downHost == true) {
                                this.turnOffHandler()
                                log.info("successful response from ${state.website}, turning off handlers")
                            } else {
                                log.info("successful response from ${state.website}, no handlers")
                            }
                        } else {
                            if (state.downHost == false) {
                                if (state.pollVerify == false) {
                                    this.runIn(60 * threshold , pollVerify)
                                    state.pollVerify = true
                                }
                                log.info("poll request failed to ${state.website}, calling pollVerify with a $threshold minute threshold")
                            } else {
                                console.log("periodicNotifications = $periodicNotifications")
                                if (periodicNotifications == 'Yes') {
                                    if (this.now() - state.sentPeriodMsg >= waitminutes * 60000) {
                                        console.log('long enough period, sending periodic message')
                                        let timeSinceDown = this.now() - state.timeDown / 60000
                                        console.log("timeSinceDown is $timeSinceDown minutes")
                                        this.send("${state.website} is still down, it's been down for $timeSinceDown minutes")
                                        console.log('sent still down message')
                                        state.sentPeriodMsg = this.now()
                                    }
                                    console.log('not enough time to send periodic message')
                                }
                                log.info('poll already called pollVerify')
                            }
                        }
                    })
                } 
                catch (let e) {
                    if (state.downHost == false) {
                        if (state.pollVerify == false) {
                            this.runIn(60 * threshold , pollVerify)
                            state.pollVerify = true
                        }
                        log.info("poll catch request failed to ${state.website}, calling pollVerify with a $threshold minute threshold")
                    } else {
                        console.log("catch periodicNotifications = $periodicNotifications")
                        if (periodicNotifications == 'Yes') {
                            if (this.now() - state.sentPeriodMsg >= waitminutes * 60000) {
                                console.log('catch long enough period, sending periodic message')
                                let timeSinceDown = this.now() - state.timeDown / 60000
                                console.log("catch timeSinceDown is $timeSinceDown minutes")
                                this.send("${state.website} is still down, it's been down for $timeSinceDown minutes")
                                console.log('catch sent still down message')
                                state.sentPeriodMsg = this.now()
                            }
                            console.log('catch not enough time to send periodic message')
                        }
                        log.info('catch poll already called pollVerify')
                    }
                } 
            

	})
