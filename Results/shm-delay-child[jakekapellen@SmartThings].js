
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'childalarmStatusHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'shmdelaytalk', 'delayTalkHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
                if (parent.globalDisable) {
                    return false
                }
                let triggerDevice = event.getDevice()
                console.log("motionActiveHandler called: $evt by device : ${triggerDevice.displayName}")
                let alarm = this.getSHMAlarmStatus()
                let alarmstatus = alarm?.value
                if (alarmstatus != 'away') {
                    return false
                }
                let alarmSecs = this.getSHMLastUpdateSeconds()
                let currSecs = this.getCurrentTimeSeconds()
                let kSecs = this.getKSeconds()
                if (parent.globalKeypadControl && theexitdelay > 0 && alarmSecs - kSecs > 4 && currSecs - alarmSecs < theexitdelay ) {
                    return false
                } else {
                    if (!parent?.globalKeypadControl && theexitdelay > 0 && currSecs - alarmSecs < theexitdelay ) {
                        return false
                    } else {
                        let open_seconds = this.getSecondsSinceLastOpenContact()
                        if (open_seconds > theentrydelay ) {
                            let aMap = ['data': ['lastupdt': lastupdt , 'shmtruedelay': false, 'motion': triggerDevice.displayName]]
                            if (themotiondelay > 0) {
                                let now = new Date()
                                let runTime = new Date(now.getTime() + themotiondelay * 1000)
                                this.runOnce(runTime, waitfordooropen, ['data': aMap ])
                            } else {
                                console.log('*****testing duplicate sensor flag*******')
                                if (parent?.globalDuplicateMotionSensors) {
                                    console.log('*****Calling checkOtherDelayProfile*******')
                                    contactList.each({ let oneContact ->
                                        if (this.checkOtherDelayProfiles(oneContact, triggerDevice, theentrydelay)) {
                                            return false
                                        }
                                    })
                                }
                                console.log("Away Mode: Intrusion caused by followed motion sensor at ${aMap.data.lastupdt}")
                                this.soundalarm(aMap.data)
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('childalarmStatusHandler', (context, event) => {
        
                if (parent.globalDisable) {
                    return false
                }
                let theAlarm = event.value
                let delayType = evt?.data
                if (delayType == 'shmtruedelay_rearm') {
                    return false
                } else {
                    if (delayType == 'shmtruedelay_away') {
                        this.prepare_to_soundalarm('away')
                        return false
                    } else {
                        if (delayType == 'shmtruedelay_stay') {
                            this.prepare_to_soundalarm('stay')
                            return false
                        }
                    }
                }
                if (theAlarm == 'night') {
                    return false
                }
                let locevent = ['name': 'shmdelaytalk', 'value': 'exitDelayNkypd', 'isStateChange': true, 'displayed': true, 'descriptionText': 'Issue exit delay talk event', 'linkText': 'Issue exit delay talk event', 'data': theexitdelay ]
                if (theAlarm == 'away' && theexitdelay > 0) {
                    if (parent?.globalKeypadControl) {
                        if (this.getSecondsSinceLastSHMUpdate() > theexitdelay + 4) {
                            this.sendLocationEvent(locevent)
                        }
                    } else {
                        this.sendLocationEvent(locevent)
                    }
                }
                let theMode = location.currentMode
                console.log("childalarmStatusHandler1 Alarm: $theAlarm Mode: $theMode FixMode: ${parent?.globalFixMode}")
                if (parent?.globalFixMode) {
                    let modefix = parent.findChildAppByName('SHM Delay ModeFix')
                    console.log("Modefix: ${modefix.id} ${modefix?.getInstallationState()}")
                    if (modefix?.getInstallationState() == 'COMPLETE') {
                        let evtMap = ['value': event.value, 'source': event.source, 'childid': 'childid']
                        theMode = modefix.alarmStatusHandler(evtMap)
                        console.log("returned from modefix alarmstatushandler mode: $theMode")
                        if (!theMode) {
                            theMode = location.currentMode
                        }
                    }
                }
                if (theAlarm == 'off') {
                    this.unschedule(soundalarm)
                    this.unschedule(scheduledBeepSirens)
                    this.killit()
                } else {
                    if (this.countopenContacts(contactList) == 0) {
                        this.killit()
                    } else {
                        this.new_monitor(false)
                    }
                }
            

	})

    .subscribedEventHandler('contactClosedHandler', (context, event) => {
        
                if (parent.globalDisable) {
                    return false
                }
                console.log("contactClosedHandler called: ${event.value}")
                if (this.countopenContacts(contactList) == 0) {
                    this.killit()
                }
            

	})

    .subscribedEventHandler('delayTalkHandler', (context, event) => {
        
                let value = event.value
                if (value == 'exitDelay') {
                    this.scheduledBeepSirens()
                } else {
                    if (value == 'exitAway') {
                        this.unschedule(scheduledBeepSirens)
                    }
                }
            

	})

    .subscribedEventHandler('doorOpensHandler', (context, event) => {
        
                if (parent.globalDisable) {
                    return false
                }
                let alarm = this.getSHMAlarmStatus()
                let alarmstatus = alarm?.value
                if (alarmstatus == 'off') {
                    thebeepers?.each({ 
                        if (settings.thesiren) {
                            this.beepSirens()
                        } else {
                            if (it?.currentValue('armMode') != 'exitDelay') {
                                it.beep()
                            }
                        }
                    })
                    return false
                }
                if (alarmstatus == 'stay') {
                    awayOnlyContacts.each({ let oneAwayOnlyContact ->
                        if (oneAwayOnlyContact == event.getDevice()) {
                            console.log("doorOpensHandler ignoring away-only contact: ${event.getDevice()}")
                            return false
                        }
                    })
                }
                let lastupdt = alarm?.date.time
                let theMode = location.currentMode
                console.log("doorOpensHandler called: ${event.value} $alarmstatus $lastupdt Mode: $theMode Truenight:${parent.globalTrueNight} ")
                let currSecs = this.getCurrentTimeSeconds()
                let alarmSecs = this.getSHMLastUpdateSeconds()
                let kSecs = this.getKSeconds()
                let currkeypadmode = ''
                if (parent?.globalKeypadControl) {
                    parent?.globalKeypadDevices?.each({ 
                        if (it.getModelName() == '3400' && currkeypadmode == '') {
                            currkeypadmode = it?.currentValue('armMode')
                            console.log("keypad set currkeypadmode to $currkeypadmode")
                        }
                    })
                }
                if (currkeypadmode == '') {
                    if (parent?.globalTrueNight) {
                        currkeypadmode = 'armedNight'
                    } else {
                        currkeypadmode = 'armedStay'
                    }
                    console.log("globalTrueNight set currkeypadmode to $currkeypadmode")
                }
                if (alarmstatus == 'away' && parent.globalKeypadControl && theexitdelay > 0 && alarmSecs - kSecs > 4 && currSecs - alarmSecs < theexitdelay ) {
                    this.scheduledBeepSirens()
                    this.new_monitor(true)
                } else {
                    if (alarmstatus == 'away' && !parent.globalKeypadControl && currSecs - alarmSecs < theexitdelay ) {
                        this.scheduledBeepSirens()
                        this.new_monitor(true)
                    } else {
                        if (theentrydelay < 1 || alarmstatus == 'stay' && currkeypadmode != 'armedStay') {
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
                }
            

	})
