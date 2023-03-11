
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('poll', delay);

    })

    .scheduledEventHandler('poll', (context, event) => {
        
                let reqParams = ['uri': "http://${state.website}"]
                if (state.validURL == 'true') {
                    try {
                        this.httpGet(reqParams, { let resp ->
                            if (resp.status == 200) {
                                if (state.downHost == 'true') {
                                    this.turnOffHandler()
                                    log.info("successful response from ${state.website}, turning off handlers")
                                } else {
                                    log.info("successful response from ${state.website}, no handlers")
                                }
                            } else {
                                if (state.downHost == 'false') {
                                    if (state.pollVerify == 'false') {
                                        this.runIn(60 * threshold , pollVerify)
                                        state.pollVerify = 'true'
                                    }
                                    log.info("request failed to ${state.website}, calling pollVerify with a $threshold minute threshold")
                                } else {
                                    log.info('pollVerify already called')
                                }
                            }
                        })
                    } 
                    catch (let e) {
                        if (state.downHost == 'false') {
                            if (state.pollVerify == 'false') {
                                this.runIn(60 * threshold , pollVerify)
                                state.pollVerify = 'true'
                            }
                            log.info("request failed to ${state.website}, calling pollVerify with a $threshold minute threshold")
                        } else {
                            log.info('pollVerify already called')
                        }
                    } 
                }
                this.schedule('0 0/5 * * * ?', poll)
            

	})
