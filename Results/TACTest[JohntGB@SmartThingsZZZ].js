
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Dim the following...');
            section.enumSetting('dimmersLevel').name('Set dimmers to this level');

        });


        page.section('', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('Thermostat to control...');

        });


        page.section('', section => {
            section.numberSetting('temperatureH').name('Heating setpoint');
            section.numberSetting('temperatureC').name('Cooling setpoint');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('alarmHandler', delay);

    })

    .subscribedEventHandler('alarmHandler', (context, event) => {
        
        console.log('Alarm time: Evaluating restrictions')
        if (parent.getSchedStatus(app.id) && !alarmMode || alarmMode.contains(location.mode) && this.getDayOk() && this.everyoneIsPresent() && this.switchesOnStatus() && this.switchesOffStatus()) {
        if (switches || dimmers || thermostats ) {
        let dimLevel = (dimmersLevel as Integer)
        switches?.on()
        dimmers?.setLevel(dimLevel)
        if (thermostats) {
        let thermostatState = thermostats.currentThermostatMode
        if (thermostatState == 'auto') {
        
        context.api.devices.sendCommands(context.config.thermostats, 'thermostat', setHeatingSetpoint)
    
        
        context.api.devices.sendCommands(context.config.thermostats, 'thermostat', setCoolingSetpoint)
    
        } else {
        if (thermostatState == 'heat') {
        
        context.api.devices.sendCommands(context.config.thermostats, 'thermostat', setHeatingSetpoint)
    
        log.info("Set $thermostats Heat $temperatureH°")
        } else {
        
        context.api.devices.sendCommands(context.config.thermostats, 'thermostat', setCoolingSetpoint)
    
        log.info("Set $thermostats Cool $temperatureC°")
        }
        }
        }
        }
        if (triggerPhrase) {
        location.helloHome.execute(triggerPhrase)
        }
        if (triggerMode && location.mode != triggerMode ) {
        if (location.modes?.find({
        it.name == triggerMode
        })) {
        this.setLocationMode(triggerMode)
        } else {
        console.log("Unable to change to undefined mode '$triggerMode'")
        }
        }
        if (alarmVolume) {
        alarmSpeaker.setLevel(alarmVolume)
        }
        if (alarmType == '2' || alarmType == '1' && secondAlarm == '1') {
        state.fullMsg = ''
        if (wakeMsg) {
        this.getGreeting(wakeMsg)
        }
        if (speakWeather || LocalHumidity || includeTemp || localTemp ) {
        this.getWeatherReport()
        }
        if (includeSunrise || includeSunset ) {
        this.getSunriseSunset()
        }
        if (switches || dimmers || thermostats && confirmSwitches ) {
        let msg = ''
        if (switches || dimmers && !thermostats) {
        msg = 'All switches'
        }
        if (!switches && !dimmers && thermostats ) {
        msg = 'All Thermostats'
        }
        if (switches || dimmers && thermostats ) {
        msg = 'All switches and thermostats'
        }
        msg = "$msg are now on and set. "
        this.compileMsg(msg)
        }
        if (triggerPhrase && confirmPhrase ) {
        let msg = "The Smart Things routine, $triggerPhrase, has been activated. "
        this.compileMsg(msg)
        }
        if (triggerMode && confirmMode ) {
        let msg = "The Smart Things mode is now being set to, $triggerMode. "
        this.compileMsg(msg)
        }
        }
        if (alarmType == '1') {
        if (secondAlarm == '1' && state.soundAlarm) {
        alarmSpeaker.playSoundAndTrack(state.soundAlarm.uri, state.soundAlarm.duration, state.sound.uri)
        }
        if (secondAlarm == '2' && state.selectedSong && state.soundAlarm) {
        alarmSpeaker.playSoundAndTrack(state.soundAlarm.uri, state.soundAlarm.duration, state.selectedSong)
        }
        if (!secondAlarm) {
        alarmSpeaker.playSoundAndTrack(state.soundAlarm.uri, state.soundAlarm.duration, '')
        }
        }
        if (alarmType == '2') {
        if (secondAlarmMusic && state.selectedSong) {
        alarmSpeaker.playSoundAndTrack(state.sound.uri, state.sound.duration, state.selectedSong)
        } else {
        alarmSpeaker.playText(state.fullMsg)
        }
        }
        if (alarmType == '3') {
        alarmSpeaker.playTrack(state.selectedSong)
        }
        }
        

	})

    .scheduledEventHandler('alarmHandler', (context, event) => {
        
        console.log('Alarm time: Evaluating restrictions')
        if (parent.getSchedStatus(app.id) && !alarmMode || alarmMode.contains(location.mode) && this.getDayOk() && this.everyoneIsPresent() && this.switchesOnStatus() && this.switchesOffStatus()) {
        if (switches || dimmers || thermostats ) {
        let dimLevel = (dimmersLevel as Integer)
        switches?.on()
        dimmers?.setLevel(dimLevel)
        if (thermostats) {
        let thermostatState = thermostats.currentThermostatMode
        if (thermostatState == 'auto') {
        
        context.api.devices.sendCommands(context.config.thermostats, 'thermostat', setHeatingSetpoint)
    
        
        context.api.devices.sendCommands(context.config.thermostats, 'thermostat', setCoolingSetpoint)
    
        } else {
        if (thermostatState == 'heat') {
        
        context.api.devices.sendCommands(context.config.thermostats, 'thermostat', setHeatingSetpoint)
    
        log.info("Set $thermostats Heat $temperatureH°")
        } else {
        
        context.api.devices.sendCommands(context.config.thermostats, 'thermostat', setCoolingSetpoint)
    
        log.info("Set $thermostats Cool $temperatureC°")
        }
        }
        }
        }
        if (triggerPhrase) {
        location.helloHome.execute(triggerPhrase)
        }
        if (triggerMode && location.mode != triggerMode ) {
        if (location.modes?.find({
        it.name == triggerMode
        })) {
        this.setLocationMode(triggerMode)
        } else {
        console.log("Unable to change to undefined mode '$triggerMode'")
        }
        }
        if (alarmVolume) {
        alarmSpeaker.setLevel(alarmVolume)
        }
        if (alarmType == '2' || alarmType == '1' && secondAlarm == '1') {
        state.fullMsg = ''
        if (wakeMsg) {
        this.getGreeting(wakeMsg)
        }
        if (speakWeather || LocalHumidity || includeTemp || localTemp ) {
        this.getWeatherReport()
        }
        if (includeSunrise || includeSunset ) {
        this.getSunriseSunset()
        }
        if (switches || dimmers || thermostats && confirmSwitches ) {
        let msg = ''
        if (switches || dimmers && !thermostats) {
        msg = 'All switches'
        }
        if (!switches && !dimmers && thermostats ) {
        msg = 'All Thermostats'
        }
        if (switches || dimmers && thermostats ) {
        msg = 'All switches and thermostats'
        }
        msg = "$msg are now on and set. "
        this.compileMsg(msg)
        }
        if (triggerPhrase && confirmPhrase ) {
        let msg = "The Smart Things routine, $triggerPhrase, has been activated. "
        this.compileMsg(msg)
        }
        if (triggerMode && confirmMode ) {
        let msg = "The Smart Things mode is now being set to, $triggerMode. "
        this.compileMsg(msg)
        }
        }
        if (alarmType == '1') {
        if (secondAlarm == '1' && state.soundAlarm) {
        alarmSpeaker.playSoundAndTrack(state.soundAlarm.uri, state.soundAlarm.duration, state.sound.uri)
        }
        if (secondAlarm == '2' && state.selectedSong && state.soundAlarm) {
        alarmSpeaker.playSoundAndTrack(state.soundAlarm.uri, state.soundAlarm.duration, state.selectedSong)
        }
        if (!secondAlarm) {
        alarmSpeaker.playSoundAndTrack(state.soundAlarm.uri, state.soundAlarm.duration, '')
        }
        }
        if (alarmType == '2') {
        if (secondAlarmMusic && state.selectedSong) {
        alarmSpeaker.playSoundAndTrack(state.sound.uri, state.sound.duration, state.selectedSong)
        } else {
        alarmSpeaker.playText(state.fullMsg)
        }
        }
        if (alarmType == '3') {
        alarmSpeaker.playTrack(state.selectedSong)
        }
        }
        

	})
