
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'childalarmStatusHandler')

    })

    .subscribedEventHandler('doorOpensHandler', (context, event) => {
        
                let alarm = location.currentState('alarmSystemStatus')
                let alarmstatus = alarm?.value
                if (alarmstatus == 'off') {
                    return false
                }
                let lastupdt = alarm?.date.time
                let theMode = location.currentMode
                console.log("doorOpensHandler called: ${event.value} $alarmstatus $lastupdt Mode: $theMode Truenight:${parent.globalTrueNight} ")
                let currT = this.now()
                let currSecs = Math.round(currT / 1000)
                let alarmSecs = Math.round(lastupdt / 1000)
                if (alarmstatus == 'away' && currSecs - alarmSecs < theexitdelay ) {
                    this.new_monitor()
                } else {
                    if (theentrydelay < 1 || alarmstatus == 'stay' && parent?.globalTrueNight && theMode == 'Night') {
                        let aMap = ['data': ['lastupdt': lastupdt , 'shmtruedelay': false]]
                        if (theentrydelay < 1) {
                            console.log("EntryDelay is ${settings.theentrydelay}, instant on for alarm ${aMap.data.lastupdt}")
                        } else {
                            console.log("Night Mode instant on for alarm ${aMap.data.lastupdt}")
                        }
                        this.soundalarm(aMap.data)
                    } else {
                        if (alarmstatus == 'stay' || alarmstatus == 'away') {
                            if (themotiondelay > 0) {
                                this.unschedule(waitfordooropen)
                            }
                            if (parent?.globalTrueEntryDelay) {
                                console.log('True Entry Mode enabled issuing event SmartHome off')
                                let event = ['name': 'alarmSystemStatus', 'value': 'off', 'displayed': true, 'description': 'SHM Delay True Entry Delay', 'data': 'shmtruedelay_' + alarmstatus ]
                                console.log("event $event")
                                this.sendLocationEvent(event)
                            } else {
                                this.prepare_to_soundalarm(false)
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
                let triggerDevice = event.getDevice()
                let alarm = location.currentState('alarmSystemStatus')
                let alarmstatus = alarm?.value
                if (alarmstatus != 'away') {
                    return false
                }
                let lastupdt = alarm?.date.time
                let alarmSecs = Math.round(lastupdt / 1000)
                let currT = this.now()
                let currSecs = Math.round(currT / 1000)
                if (theexitdelay > 0 && currSecs - alarmSecs < theexitdelay ) {
                    return false
                } else {
                    let events = thecontact.events()
                    let esize = events.size()
                    let i = 0
                    let open_seconds = 999999
                    for ( i ; i < esize ; i++) {
                        if (events[ i ].value == 'open') {
                            open_seconds = Math.round(this.now() - events[ i ].date.getTime() / 1000)
                            console.log("value: ${events[i].value} now: ${this.now()} startTime: ${events[i].date.getTime()} seconds $open_seconds")
                            break
                        }
                    }
                    if (open_seconds > theentrydelay ) {
                        let aMap = ['data': ['lastupdt': lastupdt , 'shmtruedelay': false, 'motion': triggerDevice.displayName]]
                        console.log("Away Mode: Intrusion caused by followed motion sensor at ${aMap.data.lastupdt}")
                        if (themotiondelay > 0) {
                            let now = new Date()
                            let runTime = new Date(now.getTime() + themotiondelay * 1000)
                            this.runOnce(runTime, waitfordooropen, ['data': aMap ])
                        } else {
                            this.soundalarm(aMap.data)
                        }
                    }
                }
            

	})

    .subscribedEventHandler('contactClosedHandler', (context, event) => {
        
                console.log("contactClosedHandler called: ${event.value}")
                if (this.countopenContacts() == 0) {
                    this.killit()
                }
            

	})

    .subscribedEventHandler('childalarmStatusHandler', (context, event) => {
        
                let theAlarm = event.value
                let delaydata = evt?.data
                if (delaydata == 'shmtruedelay_rearm') {
                    return false
                } else {
                    if (delaydata == 'shmtruedelay_away') {
                        this.prepare_to_soundalarm('away')
                        return false
                    } else {
                        if (delaydata == 'shmtruedelay_stay') {
                            this.prepare_to_soundalarm('stay')
                            return false
                        }
                    }
                }
                if (theAlarm == 'night') {
                    return false
                }
                let theMode = location.currentMode
                console.log("childalarmStatusHandler1 Alarm: $theAlarm Mode: $theMode FixMode: ${parent?.globalFixMode}")
                if (parent?.globalFixMode) {
                    let modefix = parent.findChildAppByName('SHM Delay ModeFix')
                    console.log("Modefix: ${modefix.id} ${modefix?.getInstallationState()}")
                    if (modefix?.getInstallationState() == 'COMPLETE') {
                        theMode = modefix.alarmStatusHandler(evt)
                        console.log("returned from modefix alarmstatushandler mode: $theMode")
                        if (!theMode) {
                            theMode = location.currentMode
                        }
                    }
                }
                if (theAlarm == 'off') {
                    this.unschedule(soundalarm)
                    this.killit()
                } else {
                    if (this.countopenContacts() == 0) {
                        this.killit()
                    } else {
                        this.new_monitor()
                    }
                    if (parent?.globalKeypad && theAlarm == 'stay' && parent?.globalTrueNight && theMode == 'Night' && thekeypad ) {
                        thekeypad.each({ 
                            if (it.getModelName() == '3400' && it.getManufacturerName() == 'CentraLite') {
                                console.log("matched, set armrednight issued: ${it.getModelName()} ${it.getManufacturerName()}")
                                thekeypad.setArmedNight(['delay': 2000])
                            }
                        })
                    }
                }
            

	})
