
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('takeAction', delay);

        context.api.schedules.runIn('sendMsgWithDelay', delay);

        context.api.schedules.schedule('watchdogTask', delay);

    })

    .scheduledEventHandler('watchdogTask', (context, event) => {
        
                log.info('watchdogTask()')
                if (settings.givenInterval && atomicState.lastpoll) {
                    let t = this.now() - atomicState.lastpoll
                    if (t > settings.givenInterval * 120000) {
                        log.warn('GarageioServiceMgr is toast. Restarting...')
                        this.sendNotification('GarageioServiceMgr is toast. Restarting...')
                        this.updated()
                        return null
                    }
                }
            

	})

    .scheduledEventHandler('takeAction', (context, event) => {
        
                log.trace('takeAction> begin')
                let MAX_EXCEPTION_COUNT = 5
                let msg 
                String exceptionCheck 
                let devices = GarageioDoors.collect({ let dni ->
                    let d = this.getChildDevice(dni)
                    console.log("takeAction> looping thru Garageio Doors, found id $dni, about to poll")
                    try {
                        d.poll()
                        exceptionCheck = d.currentVerboseTrace.toString()
                        if (exceptionCheck.contains('exception') || exceptionCheck.contains('error') && !(exceptionCheck.contains('Java.util.concurrent.TimeoutException'))) {
                            atomicState.exceptionCount = atomicState.exceptionCount + 1
                            log.error("found exception after polling, exceptionCount= ${atomicState?.exceptionCount}: $exceptionCheck")
                        } else {
                            atomicState?.exceptionCount = 0
                        }
                    } 
                    catch (let e) {
                    } 
                    if (atomicState?.exceptionCount >= MAX_EXCEPTION_COUNT ) {
                        atomicState.token = null
                        msg = "GarageioServiceMgr> too many exceptions/errors or unauthorized exception, $exceptionCheck (${atomicState?.exceptionCount} errors), need to re-authenticate at Garageio..."
                        log.error(msg)
                        this.send(msg)
                        this.getAuthToken()
                    }
                })
                log.trace('takeAction> end')
            

	})
