
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Device Notifications:', section => {
            section.booleanSetting('pushNotifications').name('Push notfications?');

        });


        page.section('Audio Notifications:', section => {
            section.deviceSetting('audioDevice').capability(['audioNotification']).name('Which audio device?');
            section.booleanSetting('quietHoursEnabled').name('Quiet hours enabled?');
            section.timeSetting('quietHoursStart').name('Start at?');
            section.timeSetting('quietHoursEnd').name('End at?');

        });


        page.section('Schedule:', section => {
            section.numberSetting('startMonth').name('Start month');
            section.numberSetting('startDay').name('Start day');
            section.numberSetting('startYear').name('Start year');
            section.numberSetting('activeDays').name('Active incubation days?');
            section.timeSetting('turnTime1').name('First turn at?');
            section.timeSetting('turnTime2').name('Second turn at?');
            section.timeSetting('turnTime3').name('Third turn at?');
            section.textSetting('turnTimeAudioTrack').name('Turn time audio track?');

        });


        page.section('Monitor temperature:', section => {
            section.deviceSetting('tempSensors').capability(['temperatureMeasurement']).name('Which?');
            section.numberSetting('initialTempLow').name('For initial temperatures below?');
            section.numberSetting('initialTempHigh').name('For initial temperatures above?');
            section.numberSetting('finalTempLow').name('For final temperatures below?');
            section.numberSetting('finalTempHigh').name('For final temperatures above?');
            section.textSetting('lowTempAudioTrack').name('Low temp audio track?');
            section.textSetting('highTempAudioTrack').name('High temp audio track?');

        });


        page.section('Monitor humidity:', section => {
            section.deviceSetting('humiditySensors').capability(['relativeHumidityMeasurement']).name('Which?');
            section.numberSetting('initialHumidityLow').name('For initial humidity below?');
            section.numberSetting('initialHumidityHigh').name('For initial humidity above?');
            section.numberSetting('finalHumidityLow').name('For final humidity below?');
            section.numberSetting('finalHumidityHigh').name('For final humidity above?');
            section.textSetting('lowHumidityAudioTrack').name('Low humidity audio track?');
            section.textSetting('highHumidityTempAudioTrack').name('High humidity audio track?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('turn2Handler', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.tempSensors, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensors, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

        context.api.schedules.schedule('turn1Handler', delay);

        context.api.schedules.schedule('turn3Handler', delay);

    })

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        let pos = humiditySensors.findIndexOf({
        it.id == event.deviceId
        })
        if (pos >= 0) {
        let recentHumidityEvents = event.device.events()?.findAll({
        it.name == 'humidity'
        })
        let actualHumidityLow = 0
        let actualHumidityHigh = 0
        let lastHumidity = recentHumidityEvents && recentHumidityEvents.size() > 1 ? recentHumidityEvents[1].floatValue : -1
        let prevHumidity = recentHumidityEvents && recentHumidityEvents.size() > 2 ? recentHumidityEvents[2].floatValue : -1
        this.logTrace("Last humidity readings from ${event.displayName}: ${event.value}, $lastHumidity, $prevHumidity")
        if (this.isActiveDay()) {
        actualHumidityLow = initialHumidityLow ? initialHumidityLow : 35
        actualHumidityHigh = initialHumidityHigh ? initialHumidityHigh : 55
        this.logTrace("Test humidity against active day: $actualHumidityLow - $actualHumidityHigh")
        } else {
        actualHumidityLow = finalHumidityLow ? finalHumidityLow : 60
        actualHumidityHigh = finalHumidityHigh ? finalHumidityHigh : 80
        this.logTrace("Test humidity against inactive day: $actualHumidityLow - $actualHumidityHigh")
        }
        if (event.floatValue <= actualHumidityLow && lastHumidity == -1 || lastHumidity > actualHumidityLow && prevHumidity == -1 || prevHumidity > actualHumidityLow ) {
        this.logInfo("Low incubator humidity warning from ${event.displayName}: ${event.value}")
        if (pushNotifications) {
        this.sendPush("Low incubator humidity warning: ${event.value}")
        }
        if (smsNumber) {
        this.sendSms(smsNumber, "Low incubator humidity warning: ${event.value}")
        }
        if (audioDevice && lowHumidityAudioTrack ) {
        
        context.api.devices.sendCommands(context.config.audioDevice, 'audioNotification', playTrack)
    
        }
        } else {
        if (event.floatValue >= actualHumidityHigh && lastHumidity == -1 || lastHumidity < actualHumidityHigh && prevHumidity == -1 || prevHumidity < actualHumidityHigh ) {
        this.logInfo("High incubator humidity warning from ${event.displayName}: ${event.value}")
        if (pushNotifications) {
        this.sendPush("High incubator humidity warning: ${event.value}")
        }
        if (smsNumber) {
        this.sendSms(smsNumber, "High incubator humidity warning: ${event.value}")
        }
        if (audioDevice && highHumidityAudioTrack ) {
        
        context.api.devices.sendCommands(context.config.audioDevice, 'audioNotification', playTrack)
    
        }
        }
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
        let actualTempLow = 0
        let actualTempHigh = 0
        let lastTemp = recentTempEvents && recentTempEvents.size() > 1 ? recentTempEvents[1].floatValue : -1
        let prevTemp = recentTempEvents && recentTempEvents.size() > 2 ? recentTempEvents[2].floatValue : -1
        this.logTrace("Last temperatures from ${event.displayName}: ${event.value}, $lastTemp, $prevTemp")
        if (this.isActiveDay()) {
        actualTempLow = initialTempLow ? initialTempLow : 97
        actualTempHigh = initialTempHigh ? initialTempHigh : 101
        this.logTrace("Test temperature against active day: $actualTempLow - $actualTempHigh")
        } else {
        actualTempLow = finalTempLow ? finalTempLow : 97
        actualTempHigh = finalTempHigh ? finalTempHigh : 101
        this.logTrace("Test temperature against inactive day: $actualTempLow - $actualTempHigh")
        }
        if (event.floatValue <= actualTempLow && lastTemp == -1 || lastTemp > actualTempLow && prevTemp == -1 || prevTemp > actualTempLow ) {
        this.logInfo("Low incubator temperature warning from ${event.displayName}: ${event.value}")
        if (pushNotifications) {
        this.sendPush("Low incubator temperature warning: ${event.value}")
        }
        if (smsNumber) {
        this.sendSms(smsNumber, "Low incubator temperature warning: ${event.value}")
        }
        if (audioDevice && lowTempAudioTrack && !(this.isDoNotDisturb())) {
        
        context.api.devices.sendCommands(context.config.audioDevice, 'audioNotification', playTrack)
    
        }
        } else {
        if (event.floatValue >= actualTempHigh && lastTemp == -1 || lastTemp < actualTempHigh && prevTemp == -1 || prevTemp < actualTempHigh ) {
        this.logInfo("High incubator temperature warning from ${event.displayName}: ${event.value}")
        if (pushNotifications) {
        this.sendPush("High incubator temperature warning: ${event.value}")
        }
        if (smsNumber) {
        this.sendSms(smsNumber, "High incubator temperature warning: ${event.value}")
        }
        if (audioDevice && highTempAudioTrack && !(this.isDoNotDisturb())) {
        
        context.api.devices.sendCommands(context.config.audioDevice, 'audioNotification', playTrack)
    
        }
        }
        }
        }
        

	})

    .scheduledEventHandler('turn1Handler', (context, event) => {
        
        this.turnHandler()
        

	})

    .scheduledEventHandler('turn2Handler', (context, event) => {
        
        this.turnHandler()
        

	})

    .scheduledEventHandler('turn3Handler', (context, event) => {
        
        this.turnHandler()
        

	})
