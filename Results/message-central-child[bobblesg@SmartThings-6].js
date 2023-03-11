
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'routineChanged')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

        context.api.schedules.schedule('timeTalkNow1', delay);

        context.api.schedules.schedule('timeTalkNow', delay);

    })

    .subscribedEventHandler('presenceTalkNow', (context, event) => {
        
                state.talkpresence = event.value
                state.msg1 = message1 
                state.msg2 = message2 
                if (state.msgType == 'Voice Message') {
                    if (state.talkpresence == 'present') {
                        state.msgNow = 'oneNow'
                    } else {
                        if (state.talkpresence == 'not present') {
                            state.msgNow = 'twoNow'
                        }
                    }
                    this.LOGDEBUG("$presenceSensor1 is ${state.talkpresence}")
                    let mydelay = triggerDelay 
                    this.checkVolume()
                    this.LOGDEBUG("Speaker(s) in use: $speaker set at: ${state.volume}% - waiting $mydelay seconds before continuing...")
                    this.runIn(mydelay, talkSwitch)
                }
                if (state.msgType == 'SMS/Push Message') {
                    if (state.talkpresence == 'present' && state.msg1 != null) {
                        let msg = message1 
                        this.LOGDEBUG("Presence - SMS/Push Message - Sending Message: $msg")
                        this.sendMessage(msg)
                    } else {
                        if (state.talkpresence == 'not present' && state.msg2 != null) {
                            let msg = message2 
                            this.LOGDEBUG("Presence - SMS/Push Message - Sending Message: $msg")
                            this.sendMessage(msg)
                        }
                    }
                }
            

	})

    .subscribedEventHandler('switchEnable', (context, event) => {
        
                state.sEnable = event.value
                this.LOGDEBUG("$enableSwitch = ${state.sEnable}")
                if (state.sEnable == 'on') {
                    state.appgo = true
                    this.LOGDEBUG("AppGo = ${state.appgo}")
                } else {
                    if (state.sEnable == 'off') {
                        state.appgo = false
                        this.LOGDEBUG("AppGo = ${state.appgo}")
                    }
                }
            

	})

    .subscribedEventHandler('tooLongOpen', (context, event) => {
        
                state.openContact = event.value
                if (state.openContact == 'open' && state.appgo == true && state.presenceRestriction == true) {
                    this.LOGDEBUG('tooLongOpen - Contact is open')
                    this.openContactTimer1()
                } else {
                    if (state.openContact == 'closed') {
                        this.LOGDEBUG('tooLongOpen - Contact is closed')
                    } else {
                        if (state.appgo == false) {
                            this.LOGDEBUG("App disabled by $enableswitch being off")
                        }
                    }
                }
            

	})

    .subscribedEventHandler('switchTalkNow', (context, event) => {
        
                state.talkswitch = event.value
                state.msg1 = message1 
                state.msg2 = message2 
                if (state.msgType == 'Weather Report') {
                    this.LOGDEBUG('Switch - Weather Report')
                    if (weatherSwitchMode == true && state.talkswitch == 'on') {
                        this.getWeatherReport()
                    }
                    if (weatherSwitchMode == false && state.talkswitch == 'off') {
                        this.getWeatherReport()
                    }
                }
                if (state.msgType == 'Voice Message') {
                    this.LOGDEBUG('Switch - Voice Message')
                    if (state.talkswitch == 'on') {
                        state.msgNow = 'oneNow'
                    } else {
                        if (state.talkswitch == 'off') {
                            state.msgNow = 'twoNow'
                        }
                    }
                    this.LOGDEBUG("$switch1 is ${state.talkswitch}")
                    let mydelay = triggerDelay 
                    this.checkVolume()
                    this.LOGDEBUG("Speaker(s) in use: $speaker set at: ${state.volume}% - waiting $mydelay seconds before continuing...")
                    this.runIn(mydelay, talkSwitch)
                }
                if (state.msgType == 'SMS/Push Message') {
                    this.LOGDEBUG('Switch - SMS/Push Message')
                    if (state.talkswitch == 'on' && state.msg1 != null) {
                        let msg = message1 
                        this.LOGDEBUG("Switch - SMS/Push Message - Sending Message: $msg")
                        this.sendMessage(msg)
                    }
                    if (state.talkswitch == 'off' && state.msg2 != null) {
                        let msg = message2 
                        this.LOGDEBUG("Switch - SMS/Push Message - Sending Message: $msg")
                        this.sendMessage(msg)
                    }
                }
            

	})

    .subscribedEventHandler('contactTalkNow', (context, event) => {
        
                state.talkcontact = event.value
                state.msg1 = message1 
                state.msg2 = message2 
                if (state.msgType == 'Weather Report') {
                    this.LOGDEBUG('Contact - Weather Report')
                    if (weatherSwitchMode == true && state.talkcontact == 'open') {
                        this.getWeatherReport()
                    }
                    if (weatherSwitchMode == false && state.talkcontact == 'closed') {
                        this.getWeatherReport()
                    }
                }
                if (state.msgType == 'Voice Message') {
                    if (state.talkcontact == 'open') {
                        state.msgNow = 'oneNow'
                    } else {
                        if (state.talkcontact == 'closed') {
                            state.msgNow = 'twoNow'
                        }
                    }
                    this.LOGDEBUG("$contactSensor is ${state.talkcontact}")
                    let mydelay = triggerDelay 
                    this.checkVolume()
                    this.LOGDEBUG("Speaker(s) in use: $speaker set at: ${state.volume}% - waiting $mydelay seconds before continuing...")
                    this.runIn(mydelay, talkSwitch)
                }
                if (state.msgType == 'SMS/Push Message') {
                    if (state.talkcontact == 'open' && state.msg1 != null) {
                        let msg = message1 
                        this.LOGDEBUG("Contact - SMS/Push Message - Sending Message: $msg")
                        this.sendMessage(msg)
                    } else {
                        if (state.talkcontact == 'closed' && state.msg2 != null) {
                            let msg = message2 
                            this.LOGDEBUG("Contact - SMS/Push Message - Sending Message: $msg")
                            this.sendMessage(msg)
                        }
                    }
                }
            

	})

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
                state.modeNow = event.value
                this.LOGDEBUG("state.modeNow = ${state.modeNow}")
                state.msg1 = message1 
                this.LOGDEBUG("state.msg1 = ${state.msg1}")
                state.msgNow = 'oneNow'
                if (event.isStateChange) {
                    this.LOGDEBUG(" State Change - The value of this event is different from its previous value: ${event.isStateChange()}")
                    let modeChangedTo = newMode1 
                    if (state.modeNow == modeChangedTo ) {
                        this.LOGDEBUG("Mode is now $modeChangedTo")
                        if (state.msgType == 'Voice Message') {
                            let mydelay = triggerDelay 
                            this.checkVolume()
                            this.LOGDEBUG("Speaker(s) in use: $speaker set at: ${state.volume}% - waiting $mydelay seconds before continuing...")
                            this.runIn(mydelay, talkSwitch)
                        }
                        if (state.msgType == 'SMS/Push Message') {
                            let msg = message1 
                            this.LOGDEBUG("Mode Change - SMS/Push Message - Sending Message: $msg")
                            this.sendMessage(msg)
                        }
                        if (state.msgType == 'Weather Report') {
                            this.LOGDEBUG('Mode - Weather Report')
                            this.getWeatherReport()
                        }
                    }
                }
            

	})

    .subscribedEventHandler('restrictPresenceSensorHandler', (context, event) => {
        
                state.presencestatus1 = event.value
                this.LOGDEBUG("Presence = ${state.presencestatus1}")
                let actionPresenceRestrict = restrictPresenceAction 
                if (state.presencestatus1 == 'present' && actionPresenceRestrict == true) {
                    this.LOGDEBUG('Presence ok')
                    state.presenceRestriction = true
                } else {
                    if (state.presencestatus1 == 'not present' && actionPresenceRestrict == true) {
                        this.LOGDEBUG('Presence not ok')
                        state.presenceRestriction = false
                    }
                }
                if (state.presencestatus1 == 'not present' && actionPresenceRestrict == false) {
                    this.LOGDEBUG('Presence ok')
                    state.presenceRestriction = true
                } else {
                    if (state.presencestatus1 == 'present' && actionPresenceRestrict == false) {
                        this.LOGDEBUG('Presence not ok')
                        state.presenceRestriction = false
                    }
                }
            

	})

    .subscribedEventHandler('powerTalkNow', (context, event) => {
        
                state.meterValue = (event.value as double)
                this.LOGDEBUG("$powerSensor shows ${state.meterValue} Watts")
                if (state.appgo == true) {
                    this.checkNow1()
                } else {
                    if (state.appgo == false) {
                        this.LOGDEBUG("App disabled by $enableswitch being off")
                    }
                }
            

	})

    .subscribedEventHandler('contact1Handler', (context, event) => {
        
                state.contact1SW = event.value
                this.LOGDEBUG("$contact1 = ${event.value}")
            

	})

    .subscribedEventHandler('waterTalkNow', (context, event) => {
        
                state.talkwater = event.value
                state.msg1 = message1 
                state.msg2 = message2 
                if (state.msgType == 'Weather Report') {
                    this.LOGDEBUG('Water - Weather Report')
                    if (weatherSwitchMode == true && state.talkwater == 'wet') {
                        this.getWeatherReport()
                    }
                    if (weatherSwitchMode == false && state.talkwater == 'dry') {
                        this.getWeatherReport()
                    }
                }
                if (state.msgType == 'Voice Message') {
                    if (state.talkwater == 'wet') {
                        state.msgNow = 'oneNow'
                    } else {
                        if (state.talkwater == 'dry') {
                            state.msgNow = 'twoNow'
                        }
                    }
                    this.LOGDEBUG("$water1 is ${state.talkwater}")
                    let mydelay = triggerDelay 
                    this.checkVolume()
                    this.LOGDEBUG("Speaker(s) in use: $speaker set at: ${state.volume}% - waiting $mydelay seconds before continuing...")
                    this.runIn(mydelay, talkSwitch)
                }
                if (state.msgType == 'SMS/Push Message') {
                    if (state.talkwater == 'wet' && state.msg1 != null) {
                        let msg = message1 
                        this.LOGDEBUG("Water - SMS/Push Message - Sending Message: $msg")
                        this.sendMessage(msg)
                    } else {
                        if (state.talkwater == 'dry' && state.msg2 != null) {
                            let msg = message2 
                            this.LOGDEBUG("Water - SMS/Push Message - Sending Message: $msg")
                            this.sendMessage(msg)
                        }
                    }
                }
            

	})

    .subscribedEventHandler('routineChanged', (context, event) => {
        
                state.newRoutine = event.displayName
                state.msg1 = message1 
                state.msgNow = 'oneNow'
                let routineToCheckRun = routine1 
                this.LOGDEBUG("state.newRoutine = ${state.newRoutine}")
                this.LOGDEBUG("state.msg1 = ${state.msg1}")
                if (state.newRoutine == routineToCheckRun ) {
                    this.LOGDEBUG("Routine running: ${state.newRoutine}")
                    if (state.msgType == 'Voice Message') {
                        let mydelay = triggerDelay 
                        this.checkVolume()
                        this.LOGDEBUG("Speaker(s) in use: $speaker set at: ${state.volume}% - waiting $mydelay seconds before continuing...")
                        this.runIn(mydelay, talkSwitch)
                    }
                    if (state.msgType == 'SMS/Push Message') {
                        let msg = message1 
                        this.LOGDEBUG("Routine running - SMS/Push Message - Sending Message: $msg")
                        this.sendMessage(msg)
                    }
                    if (state.msgType == 'Weather Report') {
                        this.LOGDEBUG('Routine - Weather Report')
                        this.getWeatherReport()
                    }
                }
            

	})

    .scheduledEventHandler('timeTalkNow1', (context, event) => {
        
                this.checkDay()
                this.LOGDEBUG("state.appgo = ${state.appgo} - state.dayCheck = ${state.dayCheck} - state.volume = ${state.volume} - runTime = $runTime")
                if (state.appgo == true && state.dayCheck == true && state.presenceRestriction == true && state.contact1SW == 'open') {
                    this.LOGDEBUG('Time trigger -  Activating now! ')
                    if (state.msgType == 'Voice Message') {
                        let msg = messageTime 
                        this.checkVolume()
                        this.LOGDEBUG("Speaker(s) in use: $speaker set at: ${state.volume}% - Message to play: $msg")
                        speaker.speak(msg)
                    }
                    if (state.msgType == 'SMS/Push Message') {
                        let msg = messageTime 
                        this.LOGDEBUG("Time - SMS/Push Message - Sending Message: $msg")
                        this.sendMessage(msg)
                    }
                } else {
                    if (state.appgo == false) {
                        this.LOGDEBUG("$enableSwitch is off so cannot continue")
                    } else {
                        if (state.dayCheck == false) {
                            this.LOGDEBUG('Cannot continue - Daycheck failed')
                        } else {
                            if (state.presenceRestriction == false) {
                                this.LOGDEBUG('Cannot continue - Presence failed')
                            } else {
                                if (state.contact1SW != 'open') {
                                    this.LOGDEBUG("Cannot continue - $contact1 is Closed")
                                }
                            }
                        }
                    }
                }
            

	})

    .scheduledEventHandler('timeTalkNow', (context, event) => {
        
                this.checkDay()
                this.LOGDEBUG("state.appgo = ${state.appgo} - state.dayCheck = ${state.dayCheck} - state.volume = ${state.volume} - runTime = $runTime")
                if (state.appgo == true && state.dayCheck == true && state.presenceRestriction == true) {
                    this.LOGDEBUG('Time trigger -  Activating now! ')
                    if (state.msgType == 'Voice Message') {
                        let msg = messageTime 
                        this.checkVolume()
                        this.LOGDEBUG("Speaker(s) in use: $speaker set at: ${state.volume}% - Message to play: $msg")
                        speaker.speak(msg)
                    }
                    if (state.msgType == 'SMS/Push Message') {
                        let msg = messageTime 
                        this.LOGDEBUG("Time - SMS/Push Message - Sending Message: $msg")
                        this.sendMessage(msg)
                    }
                    if (state.msgType == 'Weather Report') {
                        this.LOGDEBUG('Time - Weather Report')
                        this.getWeatherReport()
                    }
                } else {
                    if (state.appgo == false) {
                        this.LOGDEBUG("$enableSwitch is off so cannot continue")
                    } else {
                        if (state.dayCheck == false) {
                            this.LOGDEBUG('Cannot continue - Daycheck failed')
                        } else {
                            if (state.presenceRestriction == false) {
                                this.LOGDEBUG('Cannot continue - Presence failed')
                            }
                        }
                    }
                }
            

	})
