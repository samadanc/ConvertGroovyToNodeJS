
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('turnOn', delay);

        context.api.schedules.schedule('turnOff', delay);

    })

    .scheduledEventHandler('turnOff', (context, event) => {
        
                let mName = 'turnOff()'
                let startTime = this.now()
                state.lastInitiatedExecution = ['time': startTime , 'name': mName ]
                this.debug("executing $mName", 'trace', 1)
                java.lang.Boolean appOn = state.appOn
                if (appOn) {
                    this.debug("turning the ${theOutlet.label} off", 'info')
                    this.unsubscribe(theOutlet)
                    state.appOn = false
                    theOutlet.off()
                } else {
                    this.debug("the ${theOutlet.label} wasn't turned on by this app; doing nothing")
                }
                let elapsed = this.now() - startTime / 1000
                state.lastCompletedExecution = ['time': this.now(), 'name': mName , 'duration': elapsed ]
                this.debug("$mName completed in $elapsed seconds", 'trace', -1)
            

	})

    .scheduledEventHandler('turnOn', (context, event) => {
        
                let mName = 'turnOn()'
                let startTime = this.now()
                state.lastInitiatedExecution = ['time': startTime , 'name': mName ]
                this.debug("executing $mName", 'trace', 1)
                if (turnOnOk) {
                    this.debug("turn-on conditions met; turning the ${theOutlet.label} on", 'info')
                    state.appOn = true
                    theOutlet.on()
                    this.watchTriggers()
                } else {
                    this.debug('turn-on conditions not met; doing nothing')
                }
                let elapsed = this.now() - startTime / 1000
                state.lastCompletedExecution = ['time': this.now(), 'name': mName , 'duration': elapsed ]
                this.debug("$mName completed in $elapsed seconds", 'trace', -1)
            

	})
