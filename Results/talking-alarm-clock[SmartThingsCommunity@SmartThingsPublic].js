
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('summarySonos').capability(['musicPlayer']).name('Choose a Sonos speaker');
            section.numberSetting('summaryVolume').name('Set the summary volume');
            section.booleanSetting('summaryDisabled').name('Include disabled or unconfigured alarms in summary');

        });


        page.section('', section => {
            section.deviceSetting('A_dimmers').capability(['switchLevel']).name('Dim the following...');
            section.enumSetting('A_level').name('Set dimmers to this level');

        });


        page.section('', section => {
            section.deviceSetting('A_thermostats').capability(['thermostat']).name('Thermostat to control...');

        });


        page.section('', section => {
            section.numberSetting('A_temperatureH').name('Heating setpoint');
            section.numberSetting('A_temperatureC').name('Cooling setpoint');

        });


        page.section('', section => {
            section.deviceSetting('B_dimmers').capability(['switchLevel']).name('Dim the following...');
            section.enumSetting('B_level').name('Set dimmers to this level');

        });


        page.section('', section => {
            section.deviceSetting('B_thermostats').capability(['thermostat']).name('Thermostat to control...');

        });


        page.section('', section => {
            section.numberSetting('B_temperatureH').name('Heating setpoint');
            section.numberSetting('B_temperatureC').name('Cooling setpoint');

        });


        page.section('', section => {
            section.deviceSetting('C_dimmers').capability(['switchLevel']).name('Dim the following...');
            section.enumSetting('C_level').name('Set dimmers to this level');

        });


        page.section('', section => {
            section.deviceSetting('C_thermostats').capability(['thermostat']).name('Thermostat to control...');

        });


        page.section('', section => {
            section.numberSetting('C_temperatureH').name('Heating setpoint');
            section.numberSetting('C_temperatureC').name('Cooling setpoint');

        });


        page.section('', section => {
            section.deviceSetting('D_dimmers').capability(['switchLevel']).name('Dim the following...');
            section.enumSetting('D_level').name('Set dimmers to this level');

        });


        page.section('', section => {
            section.deviceSetting('D_thermostats').capability(['thermostat']).name('Thermostat to control...');

        });


        page.section('', section => {
            section.numberSetting('D_temperatureH').name('Heating setpoint');
            section.numberSetting('D_temperatureC').name('Cooling setpoint');

        });


        page.section('', section => {

        });


        page.section(''Instructions'', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('alarm_A', delay);

        context.api.schedules.schedule('alarm_B', delay);

        context.api.schedules.schedule('alarm_D', delay);

        context.api.schedules.schedule('alarm_C', delay);

    })

    .scheduledEventHandler('alarm_B', (context, event) => {
        
        if (!B_mode || B_mode.contains(location.mode) && this.getDayOk(B_day)) {
        if (B_switches || B_dimmers || B_thermostats ) {
        let dimLevel = (B_level as Integer)
        B_switches?.on()
        B_dimmers?.setLevel(dimLevel)
        if (B_thermostats) {
        let thermostatState = B_thermostats.currentThermostatMode
        if (thermostatState == 'auto') {
        
        context.api.devices.sendCommands(context.config.B_thermostats, 'thermostat', setHeatingSetpoint)
    
        
        context.api.devices.sendCommands(context.config.B_thermostats, 'thermostat', setCoolingSetpoint)
    
        } else {
        if (thermostatState == 'heat') {
        
        context.api.devices.sendCommands(context.config.B_thermostats, 'thermostat', setHeatingSetpoint)
    
        log.info("Set $B_thermostats Heat $B_temperatureH°")
        } else {
        
        context.api.devices.sendCommands(context.config.B_thermostats, 'thermostat', setCoolingSetpoint)
    
        log.info("Set $B_thermostats Cool $B_temperatureC°")
        }
        }
        }
        }
        if (B_phrase) {
        location.helloHome.execute(B_phrase)
        }
        if (B_triggerMode && location.mode != B_triggerMode ) {
        if (location.modes?.find({
        it.name == B_triggerMode
        })) {
        this.setLocationMode(B_triggerMode)
        } else {
        console.log("Unable to change to undefined mode '$B_triggerMode'")
        }
        }
        if (B_volume) {
        B_sonos.setLevel(B_volume)
        }
        if (B_alarmType == '2' || B_alarmType == '1' && B_secondAlarm == '1') {
        state.fullMsgB = ''
        if (B_wakeMsg) {
        this.getGreeting(B_wakeMsg, 2)
        }
        if (B_weatherReport || B_humidity || B_includeTemp || B_localTemp ) {
        this.getWeatherReport(2, B_weatherReport, B_humidity, B_includeTemp, B_localTemp)
        }
        if (B_includeSunrise || B_includeSunset ) {
        this.getSunriseSunset(2, B_includeSunrise, B_includeSunset)
        }
        if (B_switches || B_dimmers || B_thermostats && B_confirmSwitches ) {
        this.getOnConfimation(B_switches, B_dimmers, B_thermostats, 2)
        }
        if (B_phrase && B_confirmPhrase ) {
        this.getPhraseConfirmation(2, B_phrase)
        }
        if (B_triggerMode && B_confirmMode ) {
        this.getModeConfirmation(B_triggerMode, 2)
        }
        state.soundB = this.textToSpeech(state.fullMsgB, true)
        }
        if (B_alarmType == '1') {
        if (B_secondAlarm == '1' && state.soundAlarmB) {
        B_sonos.playSoundAndTrack(state.soundAlarmB.uri, state.soundAlarmB.duration, state.soundB.uri)
        }
        if (B_secondAlarm == '2' && state.selectedSongB && state.soundAlarmB) {
        B_sonos.playSoundAndTrack(state.soundAlarmB.uri, state.soundAlarmB.duration, state.selectedSongB)
        }
        if (!B_secondAlarm) {
        B_sonos.playTrack(state.soundAlarmB.uri)
        }
        }
        if (B_alarmType == '2') {
        if (B_secondAlarmMusic && state.selectedSongB) {
        B_sonos.playSoundAndTrack(state.soundB.uri, state.soundB.duration, state.selectedSongB)
        } else {
        B_sonos.playTrack(state.soundB.uri)
        }
        }
        if (B_alarmType == '3') {
        B_sonos.playTrack(state.selectedSongB)
        }
        }
        

	})

    .scheduledEventHandler('alarm_C', (context, event) => {
        
        if (!C_mode || C_mode.contains(location.mode) && this.getDayOk(C_day)) {
        if (C_switches || C_dimmers || C_thermostats ) {
        let dimLevel = (C_level as Integer)
        C_switches?.on()
        C_dimmers?.setLevel(dimLevel)
        if (C_thermostats) {
        let thermostatState = C_thermostats.currentThermostatMode
        if (thermostatState == 'auto') {
        
        context.api.devices.sendCommands(context.config.C_thermostats, 'thermostat', setHeatingSetpoint)
    
        
        context.api.devices.sendCommands(context.config.C_thermostats, 'thermostat', setCoolingSetpoint)
    
        } else {
        if (thermostatState == 'heat') {
        
        context.api.devices.sendCommands(context.config.C_thermostats, 'thermostat', setHeatingSetpoint)
    
        log.info("Set $C_thermostats Heat $C_temperatureH°")
        } else {
        
        context.api.devices.sendCommands(context.config.C_thermostats, 'thermostat', setCoolingSetpoint)
    
        log.info("Set $C_thermostats Cool $C_temperatureC°")
        }
        }
        }
        }
        if (C_phrase) {
        location.helloHome.execute(C_phrase)
        }
        if (C_triggerMode && location.mode != C_triggerMode ) {
        if (location.modes?.find({
        it.name == C_triggerMode
        })) {
        this.setLocationMode(C_triggerMode)
        } else {
        console.log("Unable to change to undefined mode '$C_triggerMode'")
        }
        }
        if (C_volume) {
        C_sonos.setLevel(C_volume)
        }
        if (C_alarmType == '2' || C_alarmType == '1' && C_secondAlarm == '1') {
        state.fullMsgC = ''
        if (C_wakeMsg) {
        this.getGreeting(C_wakeMsg, 3)
        }
        if (C_weatherReport || C_humidity || C_includeTemp || C_localTemp ) {
        this.getWeatherReport(3, C_weatherReport, C_humidity, C_includeTemp, C_localTemp)
        }
        if (C_includeSunrise || C_includeSunset ) {
        this.getSunriseSunset(3, C_includeSunrise, C_includeSunset)
        }
        if (C_switches || C_dimmers || C_thermostats && C_confirmSwitches ) {
        this.getOnConfimation(C_switches, C_dimmers, C_thermostats, 3)
        }
        if (C_phrase && C_confirmPhrase ) {
        this.getPhraseConfirmation(3, C_phrase)
        }
        if (C_triggerMode && C_confirmMode ) {
        this.getModeConfirmation(C_triggerMode, 3)
        }
        state.soundC = this.textToSpeech(state.fullMsgC, true)
        }
        if (C_alarmType == '1') {
        if (C_secondAlarm == '1' && state.soundAlarmC) {
        C_sonos.playSoundAndTrack(state.soundAlarmC.uri, state.soundAlarmC.duration, state.soundC.uri)
        }
        if (C_secondAlarm == '2' && state.selectedSongC && state.soundAlarmC) {
        C_sonos.playSoundAndTrack(state.soundAlarmC.uri, state.soundAlarmC.duration, state.selectedSongC)
        }
        if (!C_secondAlarm) {
        C_sonos.playTrack(state.soundAlarmC.uri)
        }
        }
        if (C_alarmType == '2') {
        if (C_secondAlarmMusic && state.selectedSongC) {
        C_sonos.playSoundAndTrack(state.soundC.uri, state.soundC.duration, state.selectedSongC)
        } else {
        C_sonos.playTrack(state.soundC.uri)
        }
        }
        if (C_alarmType == '3') {
        C_sonos.playTrack(state.selectedSongC)
        }
        }
        

	})

    .scheduledEventHandler('alarm_A', (context, event) => {
        
        if (!A_mode || A_mode.contains(location.mode) && this.getDayOk(A_day)) {
        if (A_switches || A_dimmers || A_thermostats ) {
        let dimLevel = (A_level as Integer)
        A_switches?.on()
        A_dimmers?.setLevel(dimLevel)
        if (A_thermostats) {
        let thermostatState = A_thermostats.currentThermostatMode
        if (thermostatState == 'auto') {
        
        context.api.devices.sendCommands(context.config.A_thermostats, 'thermostat', setHeatingSetpoint)
    
        
        context.api.devices.sendCommands(context.config.A_thermostats, 'thermostat', setCoolingSetpoint)
    
        } else {
        if (thermostatState == 'heat') {
        
        context.api.devices.sendCommands(context.config.A_thermostats, 'thermostat', setHeatingSetpoint)
    
        log.info("Set $A_thermostats Heat $A_temperatureH°")
        } else {
        
        context.api.devices.sendCommands(context.config.A_thermostats, 'thermostat', setCoolingSetpoint)
    
        log.info("Set $A_thermostats Cool $A_temperatureC°")
        }
        }
        }
        }
        if (A_phrase) {
        location.helloHome.execute(A_phrase)
        }
        if (A_triggerMode && location.mode != A_triggerMode ) {
        if (location.modes?.find({
        it.name == A_triggerMode
        })) {
        this.setLocationMode(A_triggerMode)
        } else {
        console.log("Unable to change to undefined mode '$A_triggerMode'")
        }
        }
        if (A_volume) {
        A_sonos.setLevel(A_volume)
        }
        if (A_alarmType == '2' || A_alarmType == '1' && A_secondAlarm == '1') {
        state.fullMsgA = ''
        if (A_wakeMsg) {
        this.getGreeting(A_wakeMsg, 1)
        }
        if (A_weatherReport || A_humidity || A_includeTemp || A_localTemp ) {
        this.getWeatherReport(1, A_weatherReport, A_humidity, A_includeTemp, A_localTemp)
        }
        if (A_includeSunrise || A_includeSunset ) {
        this.getSunriseSunset(1, A_includeSunrise, A_includeSunset)
        }
        if (A_switches || A_dimmers || A_thermostats && A_confirmSwitches ) {
        this.getOnConfimation(A_switches, A_dimmers, A_thermostats, 1)
        }
        if (A_phrase && A_confirmPhrase ) {
        this.getPhraseConfirmation(1, A_phrase)
        }
        if (A_triggerMode && A_confirmMode ) {
        this.getModeConfirmation(A_triggerMode, 1)
        }
        state.soundA = this.textToSpeech(state.fullMsgA, true)
        }
        if (A_alarmType == '1') {
        if (A_secondAlarm == '1' && state.soundAlarmA) {
        A_sonos.playSoundAndTrack(state.soundAlarmA.uri, state.soundAlarmA.duration, state.soundA.uri)
        }
        if (A_secondAlarm == '2' && state.selectedSongA && state.soundAlarmA) {
        A_sonos.playSoundAndTrack(state.soundAlarmA.uri, state.soundAlarmA.duration, state.selectedSongA)
        }
        if (!A_secondAlarm) {
        A_sonos.playTrack(state.soundAlarmA.uri)
        }
        }
        if (A_alarmType == '2') {
        if (A_secondAlarmMusic && state.selectedSongA) {
        A_sonos.playSoundAndTrack(state.soundA.uri, state.soundA.duration, state.selectedSongA)
        } else {
        A_sonos.playTrack(state.soundA.uri)
        }
        }
        if (A_alarmType == '3') {
        A_sonos.playTrack(state.selectedSongA)
        }
        }
        

	})

    .scheduledEventHandler('alarm_D', (context, event) => {
        
        if (!D_mode || D_mode.contains(location.mode) && this.getDayOk(D_day)) {
        if (D_switches || D_dimmers || D_thermostats ) {
        let dimLevel = (D_level as Integer)
        D_switches?.on()
        D_dimmers?.setLevel(dimLevel)
        if (D_thermostats) {
        let thermostatState = D_thermostats.currentThermostatMode
        if (thermostatState == 'auto') {
        
        context.api.devices.sendCommands(context.config.D_thermostats, 'thermostat', setHeatingSetpoint)
    
        
        context.api.devices.sendCommands(context.config.D_thermostats, 'thermostat', setCoolingSetpoint)
    
        } else {
        if (thermostatState == 'heat') {
        
        context.api.devices.sendCommands(context.config.D_thermostats, 'thermostat', setHeatingSetpoint)
    
        log.info("Set $D_thermostats Heat $D_temperatureH°")
        } else {
        
        context.api.devices.sendCommands(context.config.D_thermostats, 'thermostat', setCoolingSetpoint)
    
        log.info("Set $D_thermostats Cool $D_temperatureC°")
        }
        }
        }
        }
        if (D_phrase) {
        location.helloHome.execute(D_phrase)
        }
        if (D_triggerMode && location.mode != D_triggerMode ) {
        if (location.modes?.find({
        it.name == D_triggerMode
        })) {
        this.setLocationMode(D_triggerMode)
        } else {
        console.log("Unable to change to undefined mode '$D_triggerMode'")
        }
        }
        if (D_volume) {
        D_sonos.setLevel(D_volume)
        }
        if (D_alarmType == '2' || D_alarmType == '1' && D_secondAlarm == '1') {
        state.fullMsgD = ''
        if (D_wakeMsg) {
        this.getGreeting(D_wakeMsg, 4)
        }
        if (D_weatherReport || D_humidity || D_includeTemp || D_localTemp ) {
        this.getWeatherReport(4, D_weatherReport, D_humidity, D_includeTemp, D_localTemp)
        }
        if (D_includeSunrise || D_includeSunset ) {
        this.getSunriseSunset(4, D_includeSunrise, D_includeSunset)
        }
        if (D_switches || D_dimmers || D_thermostats && D_confirmSwitches ) {
        this.getOnConfimation(D_switches, D_dimmers, D_thermostats, 4)
        }
        if (D_phrase && D_confirmPhrase ) {
        this.getPhraseConfirmation(4, D_phrase)
        }
        if (D_triggerMode && D_confirmMode ) {
        this.getModeConfirmation(D_triggerMode, 4)
        }
        state.soundD = this.textToSpeech(state.fullMsgD, true)
        }
        if (D_alarmType == '1') {
        if (D_secondAlarm == '1' && state.soundAlarmD) {
        D_sonos.playSoundAndTrack(state.soundAlarmD.uri, state.soundAlarmD.duration, state.soundD.uri)
        }
        if (D_secondAlarm == '2' && state.selectedSongD && state.soundAlarmD) {
        D_sonos.playSoundAndTrack(state.soundAlarmD.uri, state.soundAlarmD.duration, state.selectedSongD)
        }
        if (!D_secondAlarm) {
        D_sonos.playTrack(state.soundAlarmD.uri)
        }
        }
        if (D_alarmType == '2') {
        if (D_secondAlarmMusic && state.selectedSongD) {
        D_sonos.playSoundAndTrack(state.soundD.uri, state.soundD.duration, state.selectedSongD)
        } else {
        D_sonos.playTrack(state.soundD.uri)
        }
        }
        if (D_alarmType == '3') {
        D_sonos.playTrack(state.selectedSongD)
        }
        }
        

	})
