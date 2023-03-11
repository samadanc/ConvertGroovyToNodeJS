
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

    .subscribedEventHandler('PoweredPowerHandler', (context, event) => {
        
                log.trace("${event.value}: $evt")
                let msg = "${(motion1.label) ? motion1.label : motion1.name} sensed Power is Back On!"
                this.runIn(waitSeconds, switchChanger)
                console.log('sending push for power is back on')
                this.sendMessage(msg)
            

	})

    .subscribedEventHandler('periodicNotifier', (context, event) => {
        
                let myMotionPowerState = motion1.currentState('powerSource')
                if (myMotionPowerState.value == 'battery') {
                    java.lang.Integer timeSince = this.now() - atomicState.problemTime / 60000
                    if (timeSince > 180) {
                        java.lang.Integer timeMsg = timeSince / 60
                        this.sendMessage("Periodic Alert: ${(motion1.label) ? motion1.label : motion1.name} sensed power has been out for $timeMsg hours!")
                    } else {
                        this.sendMessage("Periodic Alert: ${(motion1.label) ? motion1.label : motion1.name} sensed power has been out for $timeSince minutes!")
                    }
                    if (waitMinutes) {
                        this.runIn(waitMinutes * 60, periodicNotifier)
                        console.log("periodic notifications is on, scheduling to run again in $waitMinutes minutes")
                    }
                }
            

	})

    .subscribedEventHandler('saveStates', (context, event) => {
        
                let switchStates = [:]
                returnSwitches?.each({ 
                    switchStates[it.id] = it.currentSwitch
                    console.log("${it.id} value ${it.currentSwitch}")
                    state.switches = switchStates 
                })
            

	})

    .subscribedEventHandler('onBatteryPowerHandler', (context, event) => {
        
                log.trace("${event.value}: $evt")
                atomicState.problemTime = this.now()
                let msg = "${(motion1.label) ? motion1.label : motion1.name} sensed Power is Out!"
                console.log('sending push for power is out')
                this.sendMessage(msg)
                if (periodicNotifications) {
                    if (waitMinutes) {
                        this.runIn(waitMinutes * 60, periodicNotifier)
                        console.log("periodic notifications is on, scheduling stillWrong() to run again in $waitMinutes minutes")
                    }
                }
            

	})
