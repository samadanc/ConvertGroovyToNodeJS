
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('resetLights', delay);

    })

    .scheduledEventHandler('resetLights', (context, event) => {
        
                for (java.lang.Integer n = 1; n <= numOfActions ; n++) {
                    let endDelay = state."a$n_endDelay"
                    console.log(this.now())
                    console.log("End Delay: $endDelay")
                    if (endDelay != null) {
                        if (this.now() >= endDelay ) {
                            console.log('End Delay Has Expired For Action')
                            let aDimmers = settings."a$n_nightDimmers"
                            aDimmers.each({ let dimmer ->
                                let lightDelay = state."d${dimmer.id}_endDelay"
                                if (lightDelay != null) {
                                    if (this.now() >= lightDelay ) {
                                        console.log("Light Delay Has Expired - Light End Delay: $lightDelay")
                                        console.log('Reseting Lights Now')
                                        dimmer.setLevel(settings."a$n_nightDimmerLevelAfter")
                                        console.log(state.previous[dimmer.id])
                                        state."d${dimmer.id}_endDelay" = null
                                    } else {
                                        console.log('Light Delay Has Not Expired')
                                    }
                                }
                            })
                            console.log('End Delay Has Expired')
                            state."a$n_endDelay" = null
                        } else {
                            console.log('End Delay Has Not Expired')
                        }
                    }
                }
            

	})
