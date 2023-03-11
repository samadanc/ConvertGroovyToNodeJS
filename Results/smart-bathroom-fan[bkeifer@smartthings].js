
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                let eventValue = Double.parseDouble(event.value.replace('%', ''))
                Float rollingAverage = state.ambientHumidity.sum() / state.ambientHumidity.size()
                if (eventValue >= rollingAverage + humidityHigh && fanSwitch.currentSwitch == 'off' && enabled ) {
                    if (enabled) {
                        this.log("Humidity ($eventValue) is more than $humidityHigh% above rolling average (${rollingAverage.round(1)}%).  Turning the fan ON.")
                        state.fanOn = this.now()
                        fanSwitch.on()
                        if (fanDelay) {
                            this.runIn(fanDelay * 60, fanOff)
                        }
                    } else {
                        this.log("Humidity ($eventValue) is more than $humidityHigh% above rolling average (${rollingAverage.round(1)}%).  APP is DISABLED, so not turning the fan ON.")
                    }
                } else {
                    if (eventValue <= rollingAverage + humidityLow && fanSwitch.currentSwitch == 'on') {
                        if (enabled) {
                            this.log("Humidity ($eventValue) is at most $humidityLow% above rolling average ($rollingAverage%).  Turning the fan OFF.")
                            this.fanOff()
                        } else {
                            this.log("Humidity ($eventValue) is at most $humidityLow% above rolling average ($rollingAverage%).  APP is DISABLED, so not turning the fan OFF.")
                        }
                    } else {
                        if (state.fanOn != null && fanDelay && state.fanOn + fanDelay * 60000 <= this.now()) {
                            this.log("Fan timer elapsed and the hamster in the wheel powering the scheduler died.  Turning the fan OFF.  Current humidity is $eventValue%.")
                            this.fanOff()
                        } else {
                            if (state.fanOn != null && fanSwitch.currentSwitch == 'off') {
                                this.log('Fan turned OFF by someone/something else.  Resetting.')
                                state.fanOn = null
                            }
                        }
                    }
                }
                if (this.now() - state.timestamp > 360000) {
                    this.log('Scheduler hamster died.  Spawning a new one.')
                    this.poke()
                }
            

	})
