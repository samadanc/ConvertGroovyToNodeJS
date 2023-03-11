
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('forceOn', (context, event) => {
        
                console.log('Running \'forceOn\'')
                if (state.LastForceTime != null) {
                    this.runIn(myTimeoutMinutes * 60, timeout)
                    console.log('Multiple recent attempts, extending timeout')
                    return null
                }
                if (!(this.timeToRun())) {
                    console.log('Not time to run, skipping.')
                    return null
                }
                if (!(this.modeOk())) {
                    console.log('Mode mismatch, skipping.')
                    return null
                }
                console.log('Running \'Force On\'')
                this.subscribe(myContact, 'contact.closed', reset)
                state.LastForceTime = this.now()
                state.LastResetTime = null
                let delay = 1000 * myForceSeconds 
                let initialActionOn = mySwitches.collect({ 
                    it.currentSwitch == 'on'
                })
                mySwitches.eachWithIndex({ let s, let i ->
                    if (initialActionOn[ i ]) {
                        console.log('Turning off ' + s )
                        s.off()
                    }
                })
                this.pause(delay)
                mySwitches.eachWithIndex({ let s, let i ->
                    if (initialActionOn[ i ]) {
                        console.log('Turning on ' + s )
                        s.on()
                    }
                })
                this.runIn(myTimeoutMinutes * 60, timeout)
            

	})
