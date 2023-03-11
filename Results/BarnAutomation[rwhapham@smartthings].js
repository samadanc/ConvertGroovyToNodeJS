
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Audio notification on open/left open:', section => {
            section.deviceSetting('notifyOnOpenSensors').capability(['contactSensor']).name('Which?');
            section.deviceSetting('leftOpenSensors').capability(['contactSensor']).name('Which left open?');
            section.numberSetting('leftOpenDuration').name('For how long (mins)?');

        });


        page.section('Doorbell triggers:', section => {
            section.deviceSetting('doorbellSwitch').capability(['switch']).name('Which?');
            section.deviceSetting('doorbellSensors').capability(['contactSensor']).name('Which triggers?');
            section.booleanSetting('doorbellNotify').name('Push notfication?');
            section.deviceSetting('doorbellPausePlayers').capability(['musicPlayer']).name('Pause playback on?');

        });


        page.section('Monitor indoor temperature:', section => {
            section.deviceSetting('tempSensors').capability(['temperatureMeasurement']).name('Which?');
            section.numberSetting('tempLow').name('For temperatures below?');
            section.numberSetting('tempHigh').name('For temperatures above?');

        });


        page.section('Pipe freeze warning:', section => {
            section.deviceSetting('pipeTempSensors').capability(['temperatureMeasurement']).name('Which?');
            section.numberSetting('pipeTempLow').name('For temperatures below?');

        });


        page.section('Monitor outdoor temperature:', section => {
            section.deviceSetting('outdoorTempSensor').capability(['temperatureMeasurement']).name('Which?');
            section.numberSetting('outdoorTempLow').name('For temperatures below?');
            section.deviceSetting('outdoorTempLowSwitches').capability(['switch']).name('Turn on which switches?');
            section.deviceSetting('outdoorTempLowOutlets').capability(['outlet']).name('Turn on which outlets?');
            section.booleanSetting('outdoorTempLowNotify').name('Push notfication?');
            section.numberSetting('outdoorTempHigh').name('For temperatures above?');
            section.deviceSetting('outdoorTempHighSwitches').capability(['switch']).name('Turn on which switches?');
            section.deviceSetting('outdoorTempHighOutlets').capability(['outlet']).name('Turn on which outlets?');
            section.booleanSetting('outdoorTempHighNotify').name('Push notfication?');

        });


        page.section('Monitor smoke/CO2:', section => {
            section.deviceSetting('smokeSensors').capability(['smokeDetector']).name('Which?');
            section.deviceSetting('smokeStopPlayers').capability(['musicPlayer']).name('Stop playback on?');
            section.deviceSetting('smokeSwitches').capability(['switch']).name('Turn on which switches?');
            section.deviceSetting('smokeOutlets').capability(['outlet']).name('Turn on which outlets?');

        });


        page.section('Monitor leaks:', section => {
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('Which?');
            section.deviceSetting('waterStopPlayers').capability(['musicPlayer']).name('Stop playback on?');

        });


        page.section('Night lights:', section => {
            section.deviceSetting('nightLightSwitches').capability(['switch']).name('Which switches?');
            section.deviceSetting('nightLightOutlets').capability(['outlet']).name('Which outlets?');
            section.deviceSetting('nightLightLuxSensor').capability(['illuminanceMeasurement']).name('Use light sensor?');
            section.numberSetting('nightLightLuxLevel').name('On at light level (lux)?');
            section.numberSetting('nightLightOffLuxLevel').name('Off at light level (lux)?');
            section.deviceSetting('nightLightEntrySensors').capability(['contactSensor']).name('Entry lights for which?');

        });


        page.section('Audio notification player:', section => {
            section.deviceSetting('audioDevice').capability(['audioNotification']).name('Which?');

        });


        page.section('Do not disturb:', section => {
            section.booleanSetting('quietHoursEnabled').name('Quiet hours enabled?');
            section.timeSetting('quietHoursStart').name('Start at?');
            section.timeSetting('quietHoursEnd').name('End at?');

        });


        page.section('EventGhost logging:', section => {
            section.textSetting('egServer').name('Server?');
            section.numberSetting('egPort').name('Port?');
            section.textSetting('egPrefix').name('Command prefix?');
            section.deviceSetting('logContactSensors').capability(['contactSensor']).name('Which contact sensors?');
            section.deviceSetting('logTempSensors').capability(['temperatureMeasurement']).name('Which temperature sensors?');
            section.deviceSetting('logHumiditySensors').capability(['relativeHumidityMeasurement']).name('Which humidity sensors?');
            section.deviceSetting('logLuxSensors').capability(['illuminanceMeasurement']).name('Which light sensors?');
            section.deviceSetting('logSmokeSensors').capability(['smokeDetector']).name('Which smoke/CO2 sensors?');
            section.deviceSetting('logWaterSensors').capability(['waterSensor']).name('Which water sensors?');
            section.deviceSetting('logSwitches').capability(['switch']).name('Which switches?');
            section.deviceSetting('logOutlets').capability(['outlet']).name('Which outlets?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'logValueHandler')

        context.api.schedules.runIn('leftOpenHandler', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.tempSensors, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'nightLightSunriseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.pipeTempSensors, 'temperatureMeasurement', 'temperature', 'pipeTemperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.logContactSensors, 'contactSensor', 'contact', 'logValueHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.doorbellSwitch, 'switch', 'switch.on', 'doorbellHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.logTempSensors, 'temperatureMeasurement', 'temperature', 'logValueHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.doorbellSensors, 'contactSensor', 'contact.closed', 'doorbellSensorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.logSmokeSensors, 'smokeDetector', 'carbonMonoxide', 'logValueHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.nightLightEntrySensors, 'contactSensor', 'contact.open', 'nightLightEntryHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.leftOpenSensors, 'contactSensor', 'contact.open', 'startLeftOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.logHumiditySensors, 'relativeHumidityMeasurement', 'humidity', 'logValueHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.logSmokeSensors, 'smokeDetector', 'smoke', 'logValueHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.waterSensors, 'waterSensor', 'water', 'waterHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'nightLightSunsetHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.smokeSensors, 'smokeDetector', 'carbonMonoxide', 'smokeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.logWaterSensors, 'waterSensor', 'water', 'logValueHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.logLuxSensors, 'illuminanceMeasurement', 'illuminance', 'logValueHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.nightLightLuxSensor, 'illuminanceMeasurement', 'illuminance', 'nightLightLuxHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.logOutlets, 'outlet', 'switch', 'logValueHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.notifyOnOpenSensors, 'contactSensor', 'contact.open', 'onOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.smokeSensors, 'smokeDetector', 'smoke', 'smokeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.outdoorTempSensor, 'temperatureMeasurement', 'temperature', 'outdoorTemperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.logSwitches, 'switch', 'switch', 'logValueHandler')

    })

    .subscribedEventHandler('nightLightLuxHandler', (context, event) => {
        
        let luxOnThreshold = nightLightLuxLevel ? nightLightLuxLevel : 200
        let luxOffThreshold = nightLightOffLuxLevel ? nightLightOffLuxLevel : 300
        let luxHistory = atomicState.nightLightLuxHistory ? atomicState.nightLightLuxHistory : [-1, -1]
        let audioTrackName = null
        let audioTrack = null
        this.logTrace("Last lux values from ${event.displayName}: ${event.value}, ${luxHistory[0]}, ${luxHistory[1]}")
        if (event.integerValue <= luxOnThreshold && luxHistory[0] == -1 || luxHistory[0] > luxOnThreshold ) {
        this.logDebug("nightLightLuxHandler - below light threshold of $luxOnThreshold lux")
        atomicState.nightLightNight = true
        nightLightSwitches.each({
        if (it.latestValue('switch') == 'off') {
        this.logInfo("nightLightLuxHandler - turning on ${it.displayName}")
        it.on()
        }
        })
        nightLightOutlets.each({
        if (it.latestValue('switch') == 'off') {
        this.logInfo("nightLightLuxHandler - turning on ${it.displayName}")
        it.on()
        }
        })
        } else {
        if (event.integerValue >= luxOffThreshold && luxHistory[0] == -1 || luxHistory[0] < luxOffThreshold ) {
        this.logDebug("Above light threshold of $luxOffThreshold lux")
        atomicState.nightLightNight = false
        nightLightSwitches.each({
        if (it.latestValue('switch') == 'on') {
        this.logInfo("nightLightLuxHandler - turning off ${it.displayName}")
        it.off()
        }
        })
        nightLightOutlets.each({
        if (it.latestValue('switch') == 'on') {
        this.logInfo("nightLightLuxHandler - turning off ${it.displayName}")
        it.off()
        }
        })
        }
        }
        luxHistory[1] = luxHistory[0]
        luxHistory[0] = event.integerValue
        atomicState.nightLightLuxHistory = luxHistory
        

	})

    .subscribedEventHandler('waterHandler', (context, event) => {
        
        if (event.value != 'dry') {
        if (waterStopPlayers) {
        waterStopPlayers.each({
        if (it.latestValue('status') == 'playing') {
        this.logInfo("waterHandler - stopping ${it.displayName}")
        it.stop()
        }
        })
        }
        if (audioDevice) {
        let pos = waterSensors.findIndexOf({
        it.id == event.deviceId
        })
        if (pos >= 0) {
        let audioTrackName = 'leakAudioTrack' + pos
        let audioTrack = this."$audioTrackName"
        if (audioTrack) {
        this.playNotificationTrack(['audioTrack': audioTrack ])
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('nightLightEntryHandler', (context, event) => {
        
        let pos = nightLightEntrySensors.findIndexOf({
        it.id == event.deviceId
        })
        if (pos >= 0) {
        if (atomicState.nightLightNight) {
        let device = nightLightEntrySensors[ pos ]
        let switchesName = 'entryLightSwitches' + pos
        let outletsName = 'entryLightOutlets' + pos
        let switches = this."$switchesName"
        let outlets = this."$outletsName"
        if (switches || outlets ) {
        this.logDebug("nightLightEntryHandler - ${device.displayName} was opened")
        }
        if (switches) {
        switches.each({
        if (it.latestValue('switch') == 'off') {
        let switchState = it.currentState('switch')
        let elapsed = this.now() - switchState.rawDateCreated.time
        if (elapsed >= 10000) {
        if (it.hasCapability('Switch Level')) {
        let switchLevelName = 'entryLightSwitchLevel' + pos
        let switchLevel = this."$switchLevelName"
        let levelValue = switchLevel ? switchLevel : 50
        this.logInfo("nightLightEntryHandler - turning on ${it.displayName} to $levelValue%")
        it.setLevel(levelValue)
        } else {
        this.logInfo("nightLightEntryHandler - turning on ${it.displayName}")
        it.on()
        }
        }
        }
        })
        }
        if (outlets) {
        outlets.each({
        if (it.latestValue('switch') == 'off') {
        this.logInfo("nightLightEntryHandler - turning on ${it.displayName}")
        it.on()
        }
        })
        }
        }
        }
        

	})

    .subscribedEventHandler('outdoorTemperatureHandler', (context, event) => {
        
        let actualTempLow = outdoorTempLow ? outdoorTempLow : 35
        let actualTempHigh = outdoorTempHigh ? outdoorTempHigh : 85
        let cancelTempLow = actualTempLow + 5
        let cancelTempHigh = actualTempHigh - 5
        let tempHistory = atomicState.outdoorTempHistory ? atomicState.outdoorTempHistory : [-1, -1]
        this.logTrace("Last outdoor temperatures from ${event.displayName}: ${event.value}, ${tempHistory[0]}, ${tempHistory[1]}")
        if (event.integerValue <= actualTempLow && tempHistory[0] == -1 || tempHistory[0] > actualTempLow && tempHistory[1] == -1 || tempHistory[1] > actualTempLow ) {
        this.logInfo("Low outdoor temperature warning: ${event.value}")
        if (outdoorTempLowNotify) {
        this.sendPush("Low outdoor temperature warning: ${event.value}")
        }
        if (outdoorTempLowSwitches) {
        outdoorTempLowSwitches.each({
        if (it.latestValue('switch') == 'off') {
        this.logInfo("outdoorTemperatureHandler - turning on ${it.displayName}")
        it.on()
        }
        })
        }
        if (outdoorTempLowOutlets) {
        outdoorTempLowOutlets.each({
        if (it.latestValue('switch') == 'off') {
        this.logInfo("outdoorTemperatureHandler - turning on ${it.displayName}")
        it.on()
        }
        })
        }
        } else {
        if (event.integerValue > cancelTempLow && tempHistory[0] == -1 || tempHistory[0] <= cancelTempLow && tempHistory[1] == -1 || tempHistory[1] <= cancelTempLow ) {
        if (lastTemp != -1) {
        this.logInfo("Low outdoor temperature warning ended: ${event.value}")
        }
        if (outdoorTempLowSwitches) {
        outdoorTempLowSwitches.each({
        if (it.latestValue('switch') == 'on') {
        this.logInfo("outdoorTemperatureHandler - turning off ${it.displayName}")
        it.off()
        }
        })
        }
        if (outdoorTempLowOutlets) {
        outdoorTempLowOutlets.each({
        if (it.latestValue('switch') == 'on') {
        this.logInfo("outdoorTemperatureHandler - turning off ${it.displayName}")
        it.off()
        }
        })
        }
        }
        }
        if (event.integerValue >= actualTempHigh && tempHistory[0] == -1 || tempHistory[0] < actualTempHigh && tempHistory[1] == -1 || tempHistory[1] < actualTempHigh ) {
        this.logInfo("High outdoor temperature warning: ${event.value}")
        if (outdoorTempHighNotify) {
        this.sendPush("High outdoor temperature warning: ${event.value}")
        }
        if (outdoorTempHighSwitches) {
        outdoorTempHighSwitches.each({
        if (it.latestValue('switch') == 'off') {
        this.logInfo("outdoorTemperatureHandler - turning on ${it.displayName}")
        it.on()
        }
        })
        }
        if (outdoorTempHighOutlets) {
        outdoorTempHighOutlets.each({
        if (it.latestValue('switch') == 'off') {
        this.logInfo("outdoorTemperatureHandler - turning on ${it.displayName}")
        it.on()
        }
        })
        }
        } else {
        if (event.integerValue < cancelTempHigh && tempHistory[0] == -1 || tempHistory[0] >= cancelTempHigh && tempHistory[1] == -1 || tempHistory[1] >= cancelTempHigh ) {
        if (lastTemp != -1) {
        this.logInfo("High outdoor temperature warning ended: ${event.value}")
        }
        if (outdoorTempHighSwitches) {
        outdoorTempHighSwitches.each({
        if (it.latestValue('switch') == 'on') {
        this.logInfo("outdoorTemperatureHandler - turning off ${it.displayName}")
        it.off()
        }
        })
        }
        if (outdoorTempHighOutlets) {
        outdoorTempHighOutlets.each({
        if (it.latestValue('switch') == 'on') {
        this.logInfo("outdoorTemperatureHandler - turning off ${it.displayName}")
        it.off()
        }
        })
        }
        }
        }
        tempHistory[1] = tempHistory[0]
        tempHistory[0] = event.integerValue
        atomicState.outdoorTempHistory = tempHistory
        

	})

    .subscribedEventHandler('startLeftOpenHandler', (context, event) => {
        
        this.logDebug("Monitoring ${event.displayName} for left open")
        this.runIn(leftOpenDuration ? leftOpenDuration * 60 : 15 * 60, leftOpenHandler, ['overwrite': false, 'data': ['deviceId': event.deviceId]])
        

	})

    .subscribedEventHandler('onOpenHandler', (context, event) => {
        
        let stateKey = event.deviceId + '_onOpen'
        let elapsed = Integer.MAX_VALUE
        if (atomicState[ stateKey ]) {
        elapsed = this.now() - atomicState[ stateKey ]
        }
        if (elapsed >= 30000 && !(this.isDoNotDisturb())) {
        atomicState[ stateKey ] = this.now()
        if (audioDevice) {
        let pos = notifyOnOpenSensors.findIndexOf({
        it.id == event.deviceId
        })
        if (pos >= 0) {
        let audioTrackName = 'onOpenAudioTrack' + pos
        let audioTrack = this."$audioTrackName"
        if (audioTrack) {
        this.playNotificationTrack(['audioTrack': audioTrack ])
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('pipeTemperatureHandler', (context, event) => {
        
        let pos = pipeTempSensors.findIndexOf({
        it.id == event.deviceId
        })
        if (pos >= 0) {
        let recentTempEvents = event.device.events()?.findAll({
        it.name == 'temperature'
        })
        let actualTempLow = tempLow ? tempLow : 35
        let lastTemp = recentTempEvents && recentTempEvents.size() > 1 ? recentTempEvents[1].integerValue : -1
        let prevTemp = recentTempEvents && recentTempEvents.size() > 2 ? recentTempEvents[2].integerValue : -1
        let audioTrackName = null
        let audioTrack = null
        this.logTrace("Last pipe temperatures from ${event.displayName}: ${event.value}, $lastTemp, $prevTemp")
        if (event.integerValue <= actualTempLow && lastTemp == -1 || lastTemp > actualTempLow && prevTemp == -1 || prevTemp > actualTempLow ) {
        this.logInfo("Low pipe temperature warning from ${event.displayName}: ${event.value}")
        this.sendPush("Low pipe temperature warning from ${event.displayName}: ${event.value}")
        audioTrackName = 'lowPipeTempAudioTrack' + pos
        audioTrack = this."$audioTrackName"
        }
        if (audioDevice && audioTrack ) {
        this.playNotificationTrack(['audioTrack': audioTrack ])
        }
        }
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        let pos = tempSensors.findIndexOf({
        it.id == event.deviceId
        })
        if (pos >= 0) {
        let recentTempEvents = event.device.events()?.findAll({
        it.name == 'temperature'
        })
        let actualTempLow = tempLow ? tempLow : 45
        let actualTempHigh = tempHigh ? tempHigh : 85
        let lastTemp = recentTempEvents && recentTempEvents.size() > 1 ? recentTempEvents[1].integerValue : -1
        let prevTemp = recentTempEvents && recentTempEvents.size() > 2 ? recentTempEvents[2].integerValue : -1
        let audioTrackName = null
        let audioTrack = null
        this.logTrace("Last temperatures from ${event.displayName}: ${event.value}, $lastTemp, $prevTemp")
        if (event.integerValue <= actualTempLow && lastTemp == -1 || lastTemp > actualTempLow && prevTemp == -1 || prevTemp > actualTempLow ) {
        this.logInfo("Low temperature warning from ${event.displayName}: ${event.value}")
        this.sendPush("Low temperature warning from ${event.displayName}: ${event.value}")
        audioTrackName = 'lowTempAudioTrack' + pos
        audioTrack = this."$audioTrackName"
        } else {
        if (event.integerValue >= actualTempHigh && lastTemp == -1 || lastTemp < actualTempHigh && lastTemp == -1 || lastTemp < actualTempHigh ) {
        this.logInfo("High temperature warning from ${event.displayName}: ${event.value}")
        this.sendPush("High temperature warning from ${event.displayName}: ${event.value}")
        audioTrackName = 'highTempAudioTrack' + pos
        audioTrack = this."$audioTrackName"
        }
        }
        if (audioDevice && audioTrack ) {
        this.playNotificationTrack(['audioTrack': audioTrack ])
        }
        }
        

	})

    .subscribedEventHandler('smokeHandler', (context, event) => {
        
        if (event.value != 'clear') {
        if (smokeStopPlayers) {
        smokeStopPlayers.each({
        if (it.latestValue('status') == 'playing') {
        this.logInfo("smokeHandler - stopping ${it.displayName}")
        it.stop()
        }
        })
        }
        if (smokeSwitches) {
        smokeSwitches.each({
        if (it.latestValue('switch') == 'off') {
        if (it.hasCapability('Switch Level')) {
        this.logInfo("smokeHandler - turning on ${it.displayName} to 100%")
        it.setLevel(100)
        } else {
        this.logInfo("smokeHandler - turning on ${it.displayName}")
        it.on()
        }
        }
        })
        }
        if (smokeOutlets) {
        smokeOutlets.each({
        if (it.latestValue('switch') == 'off') {
        this.logInfo("smokeHandler - turning on ${it.displayName}")
        it.on()
        }
        })
        }
        }
        

	})

    .subscribedEventHandler('nightLightSunriseHandler', (context, event) => {
        
        this.logDebug('Sunrise has occurred')
        atomicState.nightLightNight = false
        if (nightLightSwitches) {
        nightLightSwitches.each({
        if (it.latestValue('switch') == 'on') {
        this.logInfo("sunriseHandler - turning off ${it.displayName}")
        it.off()
        }
        })
        }
        if (nightLightOutlets) {
        nightLightOutlets.each({
        if (it.latestValue('switch') == 'on') {
        this.logInfo("sunriseHandler - turning off ${it.displayName}")
        it.off()
        }
        })
        }
        

	})

    .subscribedEventHandler('doorbellHandler', (context, event) => {
        
        this.logTrace("doorbellHandler - triggerDoorbell: ${atomicState.triggerDoorbell}")
        if (atomicState.triggerDoorbell == false) {
        this.logInfo("${event.displayName} was pressed")
        if (doorbellPausePlayers) {
        doorbellPausePlayers.each({
        if (it.latestValue('status') == 'playing') {
        this.logInfo("doorbellHandler - pausing ${it.displayName}")
        it.pause()
        }
        })
        }
        if (doorbellNotify) {
        this.sendPushMessage("${event.displayName} was pressed")
        }
        } else {
        atomicState.triggerDoorbell = false
        }
        

	})

    .subscribedEventHandler('nightLightSunsetHandler', (context, event) => {
        
        this.logDebug('Sunset has occurred')
        atomicState.nightLightNight = true
        if (nightLightSwitches) {
        nightLightSwitches.each({
        if (it.latestValue('switch') == 'off') {
        this.logInfo("sunsetHandler - turning on ${it.displayName}")
        it.on()
        }
        })
        }
        if (nightLightOutlets) {
        nightLightOutlets.each({
        if (it.latestValue('switch') == 'off') {
        this.logInfo("sunsetHandler - turning on ${it.displayName}")
        it.on()
        }
        })
        }
        

	})

    .subscribedEventHandler('doorbellSensorHandler', (context, event) => {
        
        this.logInfo("${event.displayName} was pressed")
        if (doorbellSwitch) {
        this.logInfo("doorbellSensorHandler - triggering ${doorbellSwitch.displayName}")
        
        context.api.devices.sendCommands(context.config.doorbellSwitch, 'switch', on)
    
        }
        

	})

    .subscribedEventHandler('logValueHandler', (context, event) => {
        
        this.deviceLog(event.displayName, "${event.name}: ${event.value}")
        

	})

    .scheduledEventHandler('leftOpenHandler', (context, event) => {
        
        let pos = leftOpenSensors.findIndexOf({
        it.id == data.deviceId
        })
        if (pos >= 0) {
        let device = leftOpenSensors[ pos ]
        let contactState = device.currentState('contact')
        if (contactState.value == 'open') {
        let elapsed = this.now() - contactState.rawDateCreated.time
        if (elapsed >= leftOpenDuration * 60000 - 1000) {
        if (!(this.isDoNotDisturb())) {
        this.logInfo("${device.displayName} was left open")
        this.sendPush("${device.displayName} was left open")
        if (audioDevice) {
        let audioTrackName = 'leftOpenAudioTrack' + pos
        let audioTrack = this."$audioTrackName"
        if (audioTrack) {
        this.playNotificationTrack(['audioTrack': audioTrack ])
        }
        }
        }
        }
        }
        }
        

	})
