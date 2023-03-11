
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkPresence', delay);

    })

    .subscribedEventHandler('checkProgram', (context, event) => {
        
                this.LOG("Check program: ${event.device.displayName} changed to ${event.value}", 4, null, 'trace')
                let multiple = false
                if (settings.onAway && settings.awayPrograms.contains(event.value) && this.anyoneIsHome() && this.getDaysOk() && this.getModeOk() && this.getStatModeOk()) {
                    this.checkHome()
                    let who = this.whoIsHome()
                    this.sendMessage("I reset ${this.getMsgTstat()} to the '${settings.homeProgram}' program because Thermostat ${event.device.displayName} changed to '${event.value}' and $who ${this.becauseText(who)}")
                    this.runIn(300, checkHome, ['overwrite': true])
                    if (ST && wfhPhrase ) {
                        location.helloHome.execute(wfhPhrase)
                        this.LOG("Executed $wfhPhrase", 4, null, 'trace')
                        this.sendMessage("I also executed '$wfhPhrase'")
                    }
                    if (settings.setMode) {
                        location.setMode(settings.setMode)
                        this.sendMessage("And I changed Location Mode to ${settings.setMode}")
                        multiple = true
                    }
                }
            

	})

    .scheduledEventHandler('checkPresence', (context, event) => {
        
                this.LOG('Check presence', 4, null, 'trace')
                if (this.anyoneIsHome() && this.getDaysOk() && this.getModeOk() && this.getStatModeOk()) {
                    let multiple = false
                    this.LOG('Someone is present', 2, null, 'trace')
                    if (ST && wfhPhrase ) {
                        location.helloHome.execute(wfhPhrase)
                        this.LOG("Executed $wfhPhrase", 4, null, 'trace')
                        let who = this.whoIsHome()
                        this.sendMessage("I executed '$wfhPhrase' because $who ${this.becaueText()}")
                        multiple = true
                    }
                    if (settings.setMode) {
                        location.setMode(settings.setMode)
                        this.sendMessage("I ${(multiple) ? also  : }changed Location Mode to ${settings.setMode}")
                        multiple = true
                    }
                    if (settings.setHome) {
                        let verified = true
                        String homeTarget = settings.homeProgram ? settings.homeProgram : 'Home'
                        myThermostats.each({ let tstat ->
                            String currentProgram = ST ? tstat.currentValue('currentProgram') : tstat.currentValue('currentProgram', true)
                            if (!currentProgram) {
                                currentProgram = 'null'
                            }
                            if (currentProgram && currentProgram != homeTarget ) {
                                String sendHoldType = this.whatHoldType(tstat)
                                Integer sendHoldHours = null
                                if (sendHoldType != null && sendHoldType.isInteger()) {
                                    sendHoldHours = sendHoldType.toInteger()
                                    sendHoldType = 'holdHours'
                                }
                                this.LOG("${app.label} checkPresence(): calling setThermostatProgram($homeTarget, $sendHoldType, $sendHoldHours)", 2, null, 'info')
                                tstat.setThermostatProgram(homeTarget, sendHoldType, sendHoldHours)
                                verified = false
                            }
                        })
                        let tc = myThermostats.size()
                        let also = multiple ? 'also ' : ''
                        let who = this.whoIsHome()
                        if (verified) {
                            this.sendMessage("I $alsoverified that ${this.getMsgTstat()} ${((tc > 1)) ? are : is} set to the '${settings.homeProgram}' program because $who ${this.becauseText(who)}")
                        } else {
                            this.sendMessage("I $alsochanged ${this.getMsgTstat()} to the '${settings.homeProgram}' program because $who ${this.becauseText(who)}")
                            this.runIn(300, checkHome, ['overwrite': true])
                        }
                    }
                }
            

	})
