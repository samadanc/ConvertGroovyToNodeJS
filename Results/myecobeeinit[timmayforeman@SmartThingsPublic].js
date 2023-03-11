
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('takeAction', delay);

        context.api.schedules.runIn('sendMsgWithDelay', delay);

    })

    .scheduledEventHandler('takeAction', (context, event) => {
        
                log.trace('takeAction>begin')
                let msg 
                let exceptionCheck 
                let MAX_EXCEPTION_COUNT = 5
                let devices = thermostats.collect({ let dni ->
                    let d = this.getChildDevice(dni)
                    console.log("takeAction>Looping thru thermostats, found id $dni, about to poll")
                    try {
                        d.poll()
                        exceptionCheck = d.currentVerboseTrace.toString()
                        if (exceptionCheck.contains('exception') || exceptionCheck.contains('error') && !(exceptionCheck.contains('Java.util.concurrent.TimeoutException'))) {
                            state.exceptionCount = state.exceptionCount + 1
                            log.error("found exception/error after polling, exceptionCount= ${state?.exceptionCount}: $exceptionCheck")
                        } else {
                            state?.exceptionCount = 0
                        }
                    } 
                    catch (let e) {
                        state.exceptionCount = state.exceptionCount + 1
                        log.error("MyEcobeeInit>exception $e while trying to poll the device $d, exceptionCount= ${state?.exceptionCount}")
                    } 
                })
                if (state?.exceptionCount >= MAX_EXCEPTION_COUNT || exceptionCheck.contains('Unauthorized')) {
                    atomicState.authToken = null
                    state?.oauthTokenProvided = false
                    msg = "too many exceptions/errors or unauthorized exception, $exceptionCheck (${state?.exceptionCount} errors), press on 'ecobee' and re-login..."
                    this.send("MyEcobeeInit> $msg")
                    log.error(msg)
                }
                log.trace('takeAction>end')
            

	})
