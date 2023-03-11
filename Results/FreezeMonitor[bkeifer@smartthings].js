
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery15Minutes('getForecast', delay);

        context.api.schedules.runEvery5Minutes('checkCondition', delay);

    })

    .scheduledEventHandler('checkCondition', (context, event) => {
        
                log.trace('checkForFreeze')
                if (this.getLowTemp() < lowtemp ) {
                    console.log('Freeze warning found, turning on lights.')
                    state.alerts['freeze'] = true
                } else {
                    state.alerts['freeze'] = false
                    console.log('The pipes are safe.  For now...')
                }
                log.trace(state)
            

	})

    .scheduledEventHandler('getForecast', (context, event) => {
        
                let params = ['uri': 'https://api.forecast.io', 'path': "/forecast/$apikey/40.496754,-75.438682"]
                try {
                    this.httpGet(params, { let resp ->
                        if (resp.data) {
                            resp.getData().each({ 
                                if (it.key == 'hourly') {
                                    let x = it.value
                                    x.each({ let xkey ->
                                        if (xkey.key == 'data') {
                                            let y = xkey.value
                                            let templist = y['temperature']
                                            for (java.lang.Integer i = 0; i <= 48; i++) {
                                                state.forecast[ i ] = templist[ i ]
                                            }
                                        }
                                    })
                                }
                            })
                        }
                        if (resp.status == 200) {
                            console.log('getForecast Request was OK')
                        } else {
                            log.error("getForecast Request got http status ${resp.status}")
                        }
                    })
                } 
                catch (let e) {
                    console.log(e)
                } 
            

	})
