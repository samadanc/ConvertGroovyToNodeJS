
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery30Minutes('replayRecover', delay);

    })

    .scheduledEventHandler('replayRecover', (context, event) => {
        
                let nowTime = this.now()
                let prvRSt = null
                let removeHHmm 
                let stateStoreSize = 0
                for (let vRD : state.vacaRoomDevices) {
                    removeHHmm = []
                    for (let i = 1; i <= 7; i++) {
                        for (let rSt : state.rSH[vRD.key]?."$i") {
                            if (rSt.value == 'v' && !(['a', 'e', 'o'].contains(prvRSt))) {
                                removeHHmm << [i.toString(), rSt.key]
                            } else {
                                stateStoreSize = stateStoreSize + 8
                            }
                            prvRSt = rSt.value
                        }
                    }
                    console.log(removeHHmm)
                    for (let rmv : removeHHmm ) {
                        state.rSH[vRD.key]."${rmv[0]}".remove(rmv[1])}
                }
                if (stateStoreSize > 81920) {
                    this.ifDebug('App state size is greater than 80,000 characters, there may be too many rooms selected for vacation replay. Check with @bangali if not sure.', 'warn')
                }
                if (nowTime - state.lastRun >= 1980000) {
                    if (replayAsIs) {
                        this.runEvery1Minute(replaySchedule)
                    } else {
                        this.runEvery30Minutes(replayRandom)
                    }
                }
                console.log("perf replayRecover: ${(this.now() - nowTime)} ms")
            

	})
