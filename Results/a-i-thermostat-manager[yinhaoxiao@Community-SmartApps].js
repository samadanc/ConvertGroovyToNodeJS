
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'ChangedModeHandler')

    })

    .subscribedEventHandler('contactExceptionHandlerOpen', (context, event) => {
        
                state.ThermOff = false
                this.runIn(TimeBeforeClosing, TurnOffThermostats)
            

	})

    .subscribedEventHandler('contactExceptionHandlerClosed', (context, event) => {
        
                state.ThermOff = false
                this.Evaluate()
            

	})

    .subscribedEventHandler('contactHandlerOpen', (context, event) => {
        
                this.runIn(TimeBeforeClosing, TurnOffThermostats)
                let message = ''
                if (state.OpenByApp == false && state.ClosedByApp == true && event.value == 'open') {
                    message = "Windows ${event.value} manualy and will not close again until you close them yourself"
                    log.info(message)
                    this.send(message)
                }
            

	})

    .subscribedEventHandler('contactHandlerClosed', (context, event) => {
        
                let message = ''
                log.info("List of devices' status is $CurrentContactsState")
                if (!(this.AllContactsAreClosed())) {
                } else {
                    this.unschedule(TurnOffThermostats)
                    if (state.ClosedByApp == false && state.OpenByApp == true && event.value == 'closed') {
                        message = "Windows ${event.value} manualy and they will not open again until you open them yourself"
                        log.info(message)
                        this.send(message)
                    }
                }
                if (this.AllContactsAreClosed()) {
                    this.updated()
                }
            

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
                let doorsOk = this.AllContactsAreClosed()
                if (event.device == XtraTempSensor ) {
                    state.Inside = event.value
                }
                let currentTemp = state.Inside
                log.info("
        current temperature value for ${event.device} is ${event.value}
        Xtra Sensor (for critical temp) is $XtraTempSensor and its current value is $currentTemp and CriticalTemp is $CriticalTemp
        ")
                if (currentTemp <= CriticalTemp ) {
                    log.info('EMERGENCY HEATING - TEMPERATURE IS TOO LOW!')
                    Thermostats.setThermostatMode('heat')
                    state.CRITICAL = true
                    let message = ''
                    if (Actuators && !doorsOk) {
                        if (state.windowswereopenandclosedalready == false) {
                            message = "Closing windows because ${state.causeClosed}"
                            this.send(message)
                            let ActuatorsVentingCOLL = ActuatorsVenting.collect({ 
                                it.toString()
                            })
                            let ActuatorsCOLL = Actuators.collect({ 
                                it.toString()
                            })
                            let Intersection = ActuatorsVentingCOLL.intersect(ActuatorsCOLL)
                            let Same = Intersection.size() != 0
                            if (Same) {
                                if (state.coldbutneedcool == 0) {
                                    Actuators?.off()
                                    ActuatorException?.off()
                                    state.ventingrun = 0
                                    state.more = 0
                                    state.windowswereopenandclosedalready = true
                                } else {
                                }
                            } else {
                                Actuators?.off()
                                ActuatorException?.off()
                                state.ventingrun = 0
                                state.more = 0
                                state.windowswereopenandclosedalready = true
                            }
                        } else {
                            message = 'doors and windows already reopened by user so not running emergency closing. BEWARE! these windows will not close again'
                            log.info(message)
                            this.send(message)
                        }
                    }
                    state.TheresBeenCriticalEvent = true
                } else {
                    state.CRITICAL = false
                    state.windowswereopenandclosedalready = false
                    state.TheresBeenCriticalEvent = false
                }
                this.Evaluate()
            

	})

    .subscribedEventHandler('ChangedModeHandler', (context, event) => {
        
                let ContactsClosed = this.MainContactsClosed()
                if (ContactsClosed) {
                    state.ClosedByApp = true
                    state.OpenByApp = false
                    state.ThermOff = false
                }
                state.recentModeChange = true
                state.ventingrun = 0
                this.updated()
            

	})
