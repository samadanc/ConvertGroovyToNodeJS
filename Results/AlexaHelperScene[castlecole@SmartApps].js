
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('timeStart').name('Starting');
            section.timeSetting('timeEnd').name('Ending');

        });


        page.section('', section => {
            section.deviceSetting('vDimmerBB').capability(['switchLevel']).name('Control Switch (Dimmer)');
            section.deviceSetting('tstatBB').capability(['thermostat']).name('Thermostat To Control');

        });


        page.section('Baseboard Temperature Limits', section => {
            section.numberSetting('upLimitTstatBB').name('Thermostat Upper Limit');
            section.numberSetting('lowLimitTstatBB').name('Thermostat Lower Limit');

        });


        page.section('Baseboard On/Off Setpoints', section => {
            section.numberSetting('setpointBBon').name('Setpoint When Control Switch Turned On');
            section.numberSetting('setpointBBoff').name('Setpoint When Control Switch Turned Off');

        });


        page.section('', section => {
            section.deviceSetting('voicePresence').capability(['presenceSensor']).name('Presence Sensors To Report Their Status...');
            section.booleanSetting('voicePresentOnly').name('Report Only Sensors That Are \');

        });


        page.section('', section => {
            section.deviceSetting('voiceSwitch').capability(['switch']).name('Switches To Report Their Status...');
            section.booleanSetting('voiceOnSwitchOnly').name('Report Only Switches That Are On');
            section.deviceSetting('voiceDimmer').capability(['switchLevel']).name('Dimmers To Report Their Status...');
            section.booleanSetting('voiceOnDimmerOnly').name('Report Only Dimmers That Are On');

        });


        page.section('', section => {
            section.deviceSetting('voiceDoorSensors').capability(['contactSensor']).name('Doors/Windows Sensors To Report Their Status...');
            section.deviceSetting('voiceDoorControls').capability(['doorControl']).name('Door Controls To Report Their Status...');
            section.deviceSetting('voiceDoorLocks').capability(['lock']).name('Locks To Report Their Status...');
            section.booleanSetting('voiceDoorAll').name('Report Door/Window Summary Even When All Are Closed And Locked');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.vDimmerBB, 'switchLevel', 'switch', 'BBOnOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.vDimmerBB, 'switchLevel', 'level', 'BBHandler')

    })

    .subscribedEventHandler('controlPrevHandler', (context, event) => {
        
        if (this.getOkToRun('Speaker previous track')) {
        speaker.previousTrack()
        }
        

	})

    .subscribedEventHandler('thermoHandler', (context, event) => {
        
        if (this.getOkToRun('Temperature change')) {
        let tstatMode = tstat.currentValue('thermostatMode')
        if (tstatMode != 'auto' || tstatMode == 'auto' && autoControlTstat ) {
        let tstatLevel = ((vDimmerTstat.currentValue('level')) as int)
        tstatLevel = upLimitTstat && vDimmerTstat.currentValue('level') > upLimitTstat ? upLimitTstat : lowLimitTstat && vDimmerTstat.currentValue('level') < lowLimitTstat ? lowLimitTstat : tstatLevel
        if (tstatMode == 'heat' || tstatMode == 'auto') {
        tstat.setHeatingSetpoint(tstatLevel)
        }
        if (tstatMode == 'cool' || tstatMode == 'auto') {
        tstat.setCoolingSetpoint(tstatLevel)
        }
        log.info("Thermostat set to $tstatLevel")
        }
        }
        

	})

    .subscribedEventHandler('speakerOnHandler', (context, event) => {
        
        if (this.getOkToRun('Speaker on/off')) {
        if (event.value == 'on' || event.value == 'off') {
        this.speakerControl(event.value, '', '', '')
        }
        }
        

	})

    .subscribedEventHandler('BBHandler', (context, event) => {
        
        if (this.getOkToRun('Baseboard Temperature change')) {
        let tstatBBLevel =
        
        context.api.devices.sendCommands(context.config.vDimmerBB, 'switchLevel', currentValue)
    
        tstatBB.each({
        it.setHeatingSetpoint(tstatBBLevel)
        log.info("$it set to '$tstatBBLevel'")
        if (it.name.contains('Stelpro')) {
        log.info("Applying $tstatBBLevel setpoint to StelPro thermostat:'$it'")
        it.applyNow()
        }
        })
        }
        

	})

    .subscribedEventHandler('thermoOffHandler', (context, event) => {
        
        if (this.getOkToRun('Thermostat turned off')) {
        tstat.off()
        }
        

	})

    .subscribedEventHandler('panicOff', (context, event) => {
        
        if (this.getOkToRun('Panic actions deactivated')) {
        if (alarmOff) {
        this.alarmTurnOff()
        if (alarmSonos && parent.getSonos() && alarmSonos.name.contains('Sonos') && alarmSonosSound ) {
        alarmSonos.stop()
        }
        }
        if (panicSMSnumberOff || panicPushOff || panicContactsOff ) {
        let smsTxt = panicSMSMsgOff ? panicSMSMsgOff : 'Panic was deactivated without message text input. Please investigate'
        this.sendMSG(panicSMSnumberOff, smsTxt, panicPushOff, panicContactsOff)
        }
        if (parent.getNotifyFeed()) {
        this.sendNotificationEvent("Alexa Helper Scenario: '${app.label}' PANIC OFF activated.")
        }
        }
        

	})

    .subscribedEventHandler('panicOn', (context, event) => {
        
        if (this.getOkToRun('Panic actions activated')) {
        if (alarm && alarmType ) {
        this.alarmTurnOn()
        if (alarmTimer && alarmTimer > 0) {
        let delayOff = (alarmTimer as int)
        this.runIn(delayOff * 60, alarmTurnOff, ['overwrite': true])
        }
        }
        if (alarmSonos && parent.getSonos() && alarmSonos.name.contains('Sonos') && alarmSonosSound ) {
        if (alarmSonosVolume) {
        alarmSonos.setLevel((alarmSonosVolume as int))
        }
        alarmSonos.playSoundAndTrack(state.alarmSound.uri, state.alarmSound.duration, '')
        }
        if (panicSMSnumberOn || panicPushOn || panicContactsOn ) {
        let smsTxt = panicSMSMsgOn ? panicSMSMsgOn : 'Panic was activated without message text input. Please investigate.'
        this.sendMSG(panicSMSnumberOn, smsTxt, panicPushOn, panicContactsOn)
        }
        if (parent.getNotifyFeed()) {
        this.sendNotificationEvent("Alexa Helper Scenario: '${app.label}' PANIC ON activated.")
        }
        }
        

	})

    .subscribedEventHandler('speakerVolHandler', (context, event) => {
        
        if (this.getOkToRun('Speaker volume change')) {
        let speakerLevel = ((vDimmerSpeaker.currentValue('level')) as int)
        if (speakerLevel == 0) {
        vDimmerSpeaker.off()
        } else {
        speakerLevel = upLimitSpeaker && vDimmerSpeaker.currentValue('level') > upLimitSpeaker ? upLimitSpeaker : lowLimitSpeaker && vDimmerSpeaker.currentValue('level') < lowLimitSpeaker ? lowLimitSpeaker : speakerLevel
        speaker.setLevel(speakerLevel)
        }
        }
        

	})

    .subscribedEventHandler('coolHandler', (context, event) => {
        
        if (this.getOkToRun('Thermostat mode:Cooling')) {
        tstat.cool()
        let setpoint = coolingSetpointSetpoint ? coolingSetpoint : tstat.currentValue('coolingSetpoint')
        vDimmerTstat.setLevel(setpoint)
        }
        

	})

    .subscribedEventHandler('controlSong', (context, event) => {
        
        let trigger = event.displayName
        if (this.getOkToRun("Speaker Saved Song/Station Trigger: $trigger")) {
        for (java.lang.Integer i = 1; i <= this.sonosSlots(); i++) {
        if (settings."song$iSwitch" && trigger == settings."song$iSwitch".label) {
        this.speakerControl('station', state."selectedSong$i", settings."song$iStation", settings."announce$iSong")
        }
        }
        }
        

	})

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (this.getOkToRun('Control Scenario on/off')) {
        if (event.value == 'on' && this.getOkOnOptions()) {
        if (!onDelay || onDelay == 0) {
        this.turnOnOff('on')
        } else {
        this.runIn(onDelay * 60, turnOn, ['overwrite': true])
        if (parent.getNotifyFeed()) {
        this.sendNotificationEvent("Alexa Helper Scenario: '${app.label}' ON triggered. Will activate in $onDelay minutes.")
        }
        }
        } else {
        if (event.value == 'off' && this.getOkOffOptions()) {
        if (!offDelay || offDelay == 0) {
        this.turnOnOff('off')
        } else {
        this.runIn(offDelay * 60, turnOff, ['overwrite': true])
        if (parent.getNotifyFeed()) {
        this.sendNotificationEvent("Alexa Helper Scenario: '${app.label}' OFF triggered. Will activate in $offDelay minutes.")
        }
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('nestHomeHandler', (context, event) => {
        
        if (this.getOkToRun('Thermostat mode:Home')) {
        tstat.present()
        }
        

	})

    .subscribedEventHandler('BBOnOffHandler', (context, event) => {
        
        if (this.getOkToRun("Baseboard(s) turned ${event.value}")) {
        this.BBOnOff(event.value)
        }
        

	})

    .subscribedEventHandler('voiceHandler', (context, event) => {
        
        if (!voiceDelay || voiceDelay == 0) {
        this.voiceReport()
        } else {
        this.runIn(voiceDelay * 60, voiceReport, ['overwrite': true])
        }
        

	})

    .subscribedEventHandler('controlNextHandler', (context, event) => {
        
        if (this.getOkToRun('Speaker next track')) {
        speaker.nextTrack()
        }
        

	})

    .subscribedEventHandler('autoHandler', (context, event) => {
        
        if (this.getOkToRun('Thermostat mode:Auto')) {
        tstat.auto()
        let setpointH = heatingSetpoint ? heatingSetpoint : tstat.currentValue('heatingSetpoint')
        let setpointC = coolingSetpoint ? coolingSetpoint : tstat.currentValue('coolingSetpoint')
        vDimmerTstat?.on()
        tstat.setHeatingSetpoint(setpointH)
        tstat.setCoolingSetpoint(setpointC)
        }
        

	})

    .subscribedEventHandler('heatHandler', (context, event) => {
        
        if (this.getOkToRun('Thermostat mode:Heating')) {
        tstat.heat()
        let setpoint = heatingSetpoint ? heatingSetpoint : tstat.currentValue('heatingSetpoint')
        vDimmerTstat.setLevel(setpoint)
        }
        

	})

    .subscribedEventHandler('nestAwayHandler', (context, event) => {
        
        if (this.getOkToRun('Thermostat mode:Away')) {
        tstat.away()
        }
        

	})
