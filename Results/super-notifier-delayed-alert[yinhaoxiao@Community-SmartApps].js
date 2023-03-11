
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'periodicNotifier')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'periodicNotifier')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'periodicNotifier')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                log.info("eventHandler has ${event.displayName}: ${event.name}: ${event.value}, scheduling stillWrong() in $waitThreshold minutes")
                this.runIn(waitThreshold * 60, stillWrong)
                atomicState.problemTime = this.now()
            

	})

    .subscribedEventHandler('tempHandler', (context, event) => {
        
                log.info("tempHandler has ${event.displayName} and ${temp?.currentState(temperature)}")
                if (!atomicState.msgSent) {
                    let tempState1 = temp.currentState('temperature')
                    if (tempState1.doubleValue > tooHot || tempState1.doubleValue < tooCold ) {
                        if (parent.loggingOn) {
                            console.log('Temp out of limits, sending to eventHandler')
                        }
                        this.eventHandler(evt)
                    } else {
                        if (parent.loggingOn) {
                            console.log('Temp within limits, no action taken.')
                        }
                    }
                }
            

	})

    .subscribedEventHandler('periodicNotifier', (context, event) => {
        
                if (parent.loggingOn) {
                    console.log("periodic notifier got ${event.descriptionText}, sending to stillWrong()")
                }
                this.stillWrong()
            

	})

    .subscribedEventHandler('okHandler', (context, event) => {
        
                if (atomicState.msgSent) {
                    this.sendMessage("${event.device.displayName} is now ${event.value}.")
                    atomicState.msgSent = false
                    if (parent.loggingOn) {
                        console.log("okHandler() evoked, message sent, atomicState.msgSent is now: ${atomicState.msgSent}")
                    }
                } else {
                    if (parent.loggingOn) {
                        console.log('it\'s okay now, and never sent left open/closed/on/off message, so no need to send an \'ok\' message')
                    }
                }
            

	})
