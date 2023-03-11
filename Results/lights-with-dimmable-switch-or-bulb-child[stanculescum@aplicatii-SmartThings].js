
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
                if (event.value == 'open' && state.enabled && !state.active) {
                    let reset = 100
                    if (brightnessLevelContact != null) {
                        reset = brightnessLevelContact 
                    }
                    this.lightOnEvent(reset)
                    this.scheduleAutoOff()
                    this.helloHome(event.displayName + ' opened.  Lights with dimmable switch or bulb has turned your light' + this.plural(switches.size())[0] + ' on to ' + brightnessLevelContact + '%.')
                }
                this.verifySchedule()
            

	})

    .subscribedEventHandler('accelerationHandler', (context, event) => {
        
                if (event.value == 'active' && state.enabled && !state.active) {
                    let reset = 100
                    if (brightnessLevelAcceleration != null) {
                        reset = brightnessLevelAcceleration 
                    }
                    this.lightOnEvent(reset)
                    this.scheduleAutoOff()
                    this.helloHome('Someone knocked on ' + event.displayName + '.  Lights with dimmable switch or bulb has turned your light' + this.plural(switches.size())[0] + ' on to ' + brightnessLevelAcceleration + '%.')
                }
                this.verifySchedule()
            

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
                if (event.value == 'active' && state.enabled && !state.active) {
                    this.lightOnEvent(brightnessLevelMotion)
                    this.scheduleAutoOff()
                    this.helloHome(event.displayName + ' detected motion. Lights with dimmable switch or bulb has turned your light' + this.plural(switches.size())[0] + ' on to ' + brightnessLevelMotion + '%.')
                }
                this.verifySchedule()
            

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
                if (event.value == 'present' && state.enabled && !state.active) {
                    this.lightOnEvent(brightnessLevelPresence)
                    this.scheduleAutoOff()
                    this.helloHome(event.displayName + ' arrived. Lights with dimmable switch or bulb has turned your light' + this.plural(switches.size())[0] + ' on to ' + brightnessLevelPresence + '%.')
                }
                this.verifySchedule()
            

	})
