
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'guardTriggerEvtHandler')

        context.api.schedules.runIn('postInitialize', delay);

        context.api.schedules.runEvery10Minutes('getEchoDevices', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', '${(this.isST()) ? hsmStatus : alarmSystemStatus}', 'guardTriggerEvtHandler')

    })

    .subscribedEventHandler('guardTriggerEvtHandler', (context, event) => {
        
                let evtDelay = this.now() - evt?.date?.getTime()
                this.logDebug("${evt?.name.toUpperCase()} Event | Device: ${evt?.displayName} | Value: (${this.strCapitalize(evt?.value)}) with a delay of $evtDelayms")
                if (!(this.guardRestrictOk())) {
                    this.logDebug('guardTriggerEvtHandler | Skipping Guard Changes because Restriction are Active.')
                    return null
                }
                String newState = null
                String curState = state?.alexaGuardState ? state?.alexaGuardState : null
                switch ((evt?.name as String)) {
                    case 'mode':
                        Boolean inAwayMode = this.isInMode(settings?.guardAwayModes)
                        Boolean inHomeMode = this.isInMode(settings?.guardHomeModes)
                        if (inAwayMode && inHomeMode ) {
                            this.logError('Guard Control Trigger can\'t act because same mode is in both Home and Away input')
                            return null
                        }
                        if (inAwayMode && !inHomeMode) {
                            newState = 'ARMED_AWAY'
                        }
                        if (!inAwayMode && inHomeMode ) {
                            newState = 'ARMED_STAY'
                        }
                        break
                    case 'switch':
                        Boolean inAwaySw = this.isSwitchOn(settings?.guardAwaySwitch)
                        Boolean inHomeSw = this.isSwitchOn(settings?.guardHomeSwitch)
                        if (inAwaySw && inHomeSw ) {
                            this.logError('Guard Control Trigger can\'t act because both switch groups are in both Home and Away input')
                            return null
                        }
                        if (inAwaySw && !inHomeSw) {
                            newState = 'ARMED_AWAY'
                        }
                        if (!inAwaySw && inHomeSw ) {
                            newState = 'ARMED_STAY'
                        }
                        break
                    case 'presence':
                        newState = this.isSomebodyHome(settings?.guardAwayPresence) ? 'ARMED_STAY' : 'ARMED_AWAY'
                        break
                    case 'alarmSystemStatus':
                    case 'hsmStatus':
                        Boolean inAlarmHome = this.isInAlarmMode(settings?.guardHomeAlarm)
                        Boolean inAlarmAway = this.isInAlarmMode(settings?.guardAwayAlarm)
                        if (inAlarmAway && !inAlarmHome) {
                            newState = 'ARMED_AWAY'
                        }
                        if (!inAlarmAway && inAlarmHome ) {
                            newState = 'ARMED_STAY'
                        }
                        break
                }
                if (curState == newState ) {
                    this.logInfo("Skipping Guard Change... New Guard State is the same as current state: ($curState)")
                }
                if (newState && curState != newState ) {
                    if (newState == 'ARMED_STAY') {
                        this.unschedule('setGuardAway')
                        this.logInfo('Setting Alexa Guard Mode to Home...')
                        this.setGuardHome()
                    }
                    if (newState == 'ARMED_AWAY') {
                        if (settings?.guardAwayDelay) {
                            this.logWarn("Setting Alexa Guard Mode to Away in (${settings?.guardAwayDelay} seconds)", true)
                            this.runIn(settings?.guardAwayDelay, 'setGuardAway')
                        } else {
                            this.setGuardAway()
                            this.logWarn('Setting Alexa Guard Mode to Away...', true)
                        }
                    }
                }
            

	})
