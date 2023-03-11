
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which Room?', section => {
            section.textSetting('roomName').name('Who\');

        });


        page.section('Select Devices', section => {
            section.deviceSetting('roomDoor').capability(['contactSensor']).name('Door');
            section.deviceSetting('lamps').capability(['switch']).name('Lamps');

        });


        page.section('Notification Settings', section => {
            section.booleanSetting('notifyWhenOpen').name('Notify when the door opens?');
            section.booleanSetting('notifyWithNoise').name('Notify when there is noise?');
            section.numberSetting('notifyNoiseThresholdCount').name('With noise, how many noises before notification?');
            section.numberSetting('notifyNoiseThresholdTimePeriod').name('With noise, the above count in how many minutes?');
            section.booleanSetting('notifyOffWhenClear').name('Notify when all clear?');

        });


        page.section('Lamp Settings', section => {
            section.booleanSetting('lampWhenOpen').name('Turn on when the door opens?');
            section.booleanSetting('lampWithNoise').name('Turn on when there is noise?');
            section.booleanSetting('lampOffWhenClear').name('Turn off when all clear?');
            section.numberSetting('lampAutoOffMinutes').name('Automatically turn off after this many minutes');

        });


        page.section('When To Monitor?', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


        page.section('Reset?', section => {
            section.numberSetting('resetMinutes').name('Reset after this many minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.roomDoor, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.roomSound, 'device.arduinoSoundShield', 'voiceStatus', 'noiseHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        if (this.getTimeOk()) {
        console.log("Door ${event.value}")
        if (event.value == 'open') {
        if (notifyWhenOpen) {
        let lastNotifyTime = state.lastDoorOpenNotify ? state.lastDoorOpenNotify : 0
        let notifyThreshold = 2 * 60 * 1000
        let timePast = this.now() - lastNotifyTime
        if (timePast > notifyThreshold ) {
        let message = "${this.getPossessive(roomName)} door is open"
        log.info(message)
        this.sendPush(message)
        state.lastDoorOpenNotify = this.now()
        } else {
        console.log("Not sending notifiction on door since only $timePast ms have elapsed")
        }
        }
        if (lampWhenOpen) {
        log.info("Turning on lamp due to ${this.getPossessive(roomName)} door opening")
        lamps?.on()
        if (lampAutoOffMinutes) {
        this.runIn(lampAutoOffMinutes * 60, 'lampsOffSchedule')
        }
        }
        } else {
        let resetStatus = true
        if (resetMinutes) {
        let resetMillis = resetMinutes * 60 * 1000
        
        context.api.devices.sendCommands(context.config.roomDoor, 'contactSensor', eventsSince)
    
        it.name == 'contact' && it.value == 'open'
        })
        console.log("Found ${recentOpens.size()} open events")
        resetStatus = recentOpens.size() > 0
        }
        if (resetStatus) {
        if (notifyOffWhenClear) {
        let message = "${this.getPossessive(roomName)} door is closed"
        log.info(message)
        this.sendPush(message)
        }
        if (lampOffWhenClear) {
        log.info("Turnng off lamp because ${this.getPossessive(roomName)} door is closed")
        lamps?.off()
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('noiseHandler', (context, event) => {
        
        if (roomSound && this.getTimeOk()) {
        console.log("Noise ${event.value}")
        
        context.api.devices.sendCommands(context.config.roomDoor, 'contactSensor', latestValue)
    
        if (!doorOpen) {
        if (event.value == 'active') {
        if (this.isNoiseThresholdMet()) {
        state.noiseAlert = true
        if (notifyWithNoise) {
        let message = "There is noise in ${this.getPossessive(roomName)} room"
        log.info(message)
        this.sendPush(message)
        }
        if (lampWithNoise) {
        log.info("Turning on lamp due to noise in ${this.getPossessive(roomName)} room")
        lamps?.on()
        if (lampAutoOffMinutes) {
        this.runIn(lampAutoOffMinutes * 60, 'lampsOffSchedule')
        }
        }
        }
        } else {
        if (state.noiseAlert) {
        state.noiseAlert = false
        if (notifyOffWhenClear) {
        let message = "It is all quiet in ${this.getPossessive(roomName)} room"
        log.info(message)
        this.sendPush(message)
        }
        if (lampOffWhenClear) {
        log.info("Turning off lamp because it is quiet in ${this.getPossessive(roomName)} room")
        lamps?.off()
        }
        }
        }
        }
        }
        

	})
