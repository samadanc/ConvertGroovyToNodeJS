
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('turnOn', delay);

    })

    .scheduledEventHandler('turnOn', (context, event) => {
        
                let startTime = this.now()
                state.lastInitiatedExecution = ['time': startTime , 'name': 'turnOn()']
                this.debug('executing turnOn()', 'trace', 1)
                if (modeOk && presenceOk ) {
                    this.debug('conditions met; turning lights on', 'info')
                    theLights.on()
                    state.lightsOn = true
                    state.lightsOnTime = this.now()
                } else {
                    this.debug('conditions not met; wait for next call')
                }
                let elapsed = this.now() - startTime / 1000
                state.lastCompletedExecution = ['time': this.now(), 'name': 'turnOn()', 'duration': elapsed ]
                this.debug("turnOn() completed in $elapsed seconds", 'trace', -1)
            

	})
