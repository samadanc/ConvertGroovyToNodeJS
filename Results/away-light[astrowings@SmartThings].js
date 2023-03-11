
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('schedTurnOn', delay);

    })

    .scheduledEventHandler('schedTurnOn', (context, event) => {
        
                let mName = 'schedTurnOn()'
                let startTime = this.now()
                state.lastInitiatedExecution = ['time': startTime , 'name': mName ]
                this.debug("executing schedTurnOn(offForDelayMS: $offForDelayMS)", 'trace', 1)
                let tz = location.timeZone
                let random = new Random()
                let nowDate = new Date()
                if (offForDelayMS) {
                    let onDate = new Date(this.now() + offForDelayMS )
                    this.debug("calculated ON time for turning the light back on after the 'off for' delay of ${this.convertToHMS(offForDelayMS)} : ${onDate.format(dd MMM HH:mm:ss, tz)}", 'info')
                    state.scheduled.turnOn = onDate.time
                    java.lang.Integer offForDelayS = ((int) offForDelayMS / 1000)
                    this.runIn(offForDelayS, turnOn)
                } else {
                    let onDate = userOnTime ? this.timeToday(userOnTime, tz) : null
                    if (randomMinutes && onDate ) {
                        java.lang.Integer rdmOffset = random.nextInt(randomMinutes)
                        onDate = new Date(onDate.time - randomMinutes * 30000 + rdmOffset * 60000)
                        this.debug("random-adjusted turn-on time : ${onDate.format(dd MMM HH:mm:ss, tz)}")
                    } else {
                        this.debug('no random factor configured in preferences')
                    }
                    java.lang.Integer onNowRandom = this.C_ON_NOW_RANDOM()
                    java.lang.Integer onNowRandomMS = onNowRandom * 60 * 1000
                    java.lang.Integer onNowDelayMS = random.nextInt(onNowRandomMS)
                    if (!onDate) {
                        this.debug("no turn-on time specified; calling to turn the light on in ${this.convertToHMS(onNowDelayMS)}", 'info')
                        state.scheduled.turnOn = this.now()
                        this.turnOn(onNowDelayMS)
                    } else {
                        if (onDate < nowDate ) {
                            this.debug("scheduled turn-on time of ${onDate.format(dd MMM HH:mm:ss, tz)} has already passed; calling to turn the light on in ${this.convertToHMS(onNowDelayMS)}", 'info')
                            state.scheduled.turnOn = this.now()
                            this.turnOn(onNowDelayMS)
                        } else {
                            this.debug("scheduling the light to turn on at ${onDate.format(dd MMM HH:mm:ss, tz)}", 'info')
                            state.scheduled.turnOn = onDate.time
                            this.runOnce(onDate, turnOn)
                        }
                    }
                }
                let elapsed = this.now() - startTime / 1000
                state.lastCompletedExecution = ['time': this.now(), 'name': mName , 'duration': elapsed ]
                this.debug("$mName completed in $elapsed seconds", 'trace', -1)
            

	})
