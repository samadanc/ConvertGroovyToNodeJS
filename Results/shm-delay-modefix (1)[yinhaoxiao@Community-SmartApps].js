
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmStatusHandler')

    })

    .subscribedEventHandler('alarmStatusHandler', (context, event) => {
        
                let theAlarm = event.value
                if (theAlarm == 'night') {
                    let event = ['name': 'alarmSystemStatus', 'value': 'stay', 'displayed': true, 'description': 'SHM Delay Fix System Status from night to stay']
                    this.sendLocationEvent(event)
                    this.setLocationMode('Night')
                    log.warn('Change the Lock Manager Keypad module to version in github ARNBME lock-master SHMDelay ModeFix')
                    return 'Night'
                }
                if (parent && !parent.globalFixMode) {
                    return false
                }
                let theMode = location.currentMode
                let oldMode = theMode 
                let delaydata = evt?.data
                if (delaydata == null) {
                } else {
                    if (delaydata.startsWith('shmtruedelay')) {
                        console.log("Modefix ignoring True Entry Delay event, alarm state $theAlarm")
                        return false
                    }
                }
                console.log("ModeFix alarmStatusHandler entered alarm status change: $theAlarm Mode: $theMode ")
                let modeOK = false
                if (theAlarm == 'off') {
                    offModes.each({ let child ->
                        if (theMode == child ) {
                            modeOK = true
                        }
                    })
                    if (!modeOK) {
                        this.setLocationMode(offDefault)
                        theMode = offDefault 
                    }
                } else {
                    if (theAlarm == 'stay') {
                        stayModes.each({ let child ->
                            if (theMode == child ) {
                                modeOK = true
                            }
                        })
                        if (!modeOK) {
                            this.setLocationMode(stayDefault)
                            theMode = stayDefault 
                        }
                    } else {
                        if (theAlarm == 'away') {
                            awayModes.each({ let child ->
                                if (theMode == child ) {
                                    modeOK = true
                                }
                            })
                            if (!modeOK) {
                                this.setLocationMode(awayDefault)
                                theMode = awayDefault 
                            }
                        } else {
                            log.error("ModeFix alarmStatusHandler Unknown alarm mode: $theAlarm in ")
                        }
                    }
                }
                if (theMode != oldMode ) {
                    console.log("ModeFix alarmStatusHandler Mode was changed From:$oldMode To:$theMode")
                }
                return theMode 
            

	})
