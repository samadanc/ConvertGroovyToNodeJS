
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

    .subscribedEventHandler('powerHandler', (context, event) => {
        
                log.info("powerHandler found ${event.displayName} is outputting ${event.value} W, want it between $tooLow W & $tooHigh W")
                let powerValue = event.value.toDouble()
                if (!atomicState.msgSent) {
                    if (powerValue > tooHigh || powerValue < tooLow ) {
                        if (parent.loggingOn) {
                            console.log('Power out of limits and haven\'t sent a message yet, sending to eventHandler.')
                        }
                        this.eventHandler(evt)
                    } else {
                        if (parent.loggingOn) {
                            console.log('Power within limits and no messages sent, doing nothing.')
                        }
                    }
                } else {
                    if (powerValue <= tooHigh && powerValue >= tooLow ) {
                        if (parent.loggingOn) {
                            console.log('Power within limits and messages sent, sending to okHandler().')
                        }
                        this.okHandler(evt)
                    } else {
                        if (parent.loggingOn) {
                            console.log('Power still out of limits and messages sent, stillWrongMsger() will handle this.')
                        }
                    }
                }
            

	})

    .subscribedEventHandler('okHandler', (context, event) => {
        
                if (atomicState.msgSent) {
                    this.sendMessage("${event.device.displayName} is OK. Now ${event.value}.")
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

    .subscribedEventHandler('periodicNotifier', (context, event) => {
        
                if (parent.loggingOn) {
                    console.log("periodic notifier got ${event.descriptionText}, sending to stillWrong()")
                }
                this.stillWrong()
            

	})

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                let newWaitThreshold = waitThreshold > 0 ? waitThreshold : 0.1
                log.info("eventHandler has ${event.displayName}: ${event.name}: ${event.value}, scheduling stillWrong() in $newWaitThreshold minutes")
                this.runIn(newWaitThreshold * 60, stillWrong)
                atomicState.problemTime = this.now()
            

	})

    .subscribedEventHandler('tempHandler', (context, event) => {
        
                let tempState1 = temp.currentState('temperature').doubleValue
                log.info("tempHandler found ${event.displayName} is $tempState1 ${location.temperatureScale}.")
                if (!atomicState.msgSent) {
                    if (tempState1 > tooHot || tempState1 < tooCold ) {
                        if (parent.loggingOn) {
                            console.log('Temp out of limits and haven\'t sent a message yet, sending to eventHandler.')
                        }
                        this.eventHandler(evt)
                    } else {
                        if (parent.loggingOn) {
                            console.log('Temp within limits and no messages sent, doing nothing.')
                        }
                    }
                } else {
                    if (tempState1 <= tooHot && tempState1 >= tooCold ) {
                        if (parent.loggingOn) {
                            console.log('Temp within limits and messages sent, sending to okHandler().')
                        }
                        this.okHandler(evt)
                    } else {
                        if (parent.loggingOn) {
                            console.log('Temp still out of limits and messages sent, stillWrongMsger() will handle this.')
                        }
                    }
                }
            

	})
