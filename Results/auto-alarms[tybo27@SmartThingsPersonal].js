
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Person1', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Using whose presence');
            section.deviceSetting('alarm1').capability(['switch']).name('Using which Alarm');

        });


        page.section('Person2', section => {
            section.deviceSetting('presence2').capability(['presenceSensor']).name('Using whose presence');
            section.deviceSetting('alarm2').capability(['switch']).name('Using which Alarm');

        });


        page.section('General', section => {
            section.timeSetting('resetTime').name('Scheduled time for alarm count reset');

        });


        page.section('Turn on these things', section => {
            section.deviceSetting('switches').capability(['switch']).name('On/Off Devices');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Dimmer Devices');
            section.numberSetting('dimmerInterval').name('Dimmer Interval');
            section.numberSetting('dimmerMax').name('Dimmer Max Level');
            section.numberSetting('dimmerRampRate').name('Dimmer Ramp Rate');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('reset', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.alarm1, 'switch', 'switch.on', 'switchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.alarm2, 'switch', 'switch.on', 'switchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.alarm1, 'switch', 'resetState.reset', 'switchResetHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.alarm2, 'switch', 'resetState.reset', 'switchResetHandler')

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log("${event.displayName} has triggered turned on! ${event.value}")
        let eventDevice = event.device
        let curJointCount = atomicState.jointCount
        let person1 = presence1.currentPresence
        let person2 = presence2.currentPresence
        let newMode = jointMode
        console.log("${presence1.displayName} is $person1")
        console.log("${presence2.displayName} is $person2")
        if (person1 == 'present' && person2 == 'present') {
        console.log('Both people confirmed present')
        let alarm1Count = alarm1.currentCount
        let alarm2Count = alarm2.currentCount
        console.log("${alarm1.displayName} count = $alarm1Count")
        console.log("${alarm2.displayName} count = $alarm2Count")
        if (alarm1Count > 0 && alarm2Count > 0) {
        curJointCount++
        console.log("Both alarms>0, jointCount=$curJointCount")
        }
        newMode = jointMode
        } else {
        if (person1 == 'present') {
        curJointCount = alarm1.currentCount
        console.log("Only ${presence1.displayName} present, jointCount=$curJointCount")
        newMode = mode1
        } else {
        if (person2 == 'present') {
        curJointCount = alarm2.currentCount
        console.log("Only ${presence2.displayName} present, jointCount=$curJointCount")
        newMode = mode2
        }
        }
        }
        console.log("Joint Count = $curJointCount")
        atomicState.jointCount = curJointCount
        if (curJointCount == 1) {
        console.log('Determined Joint Count = 1, turning on first switches')
        for (let aSwitch : switches ) {
        console.log("Turning on ${aSwitch.displayName}")
        aSwitch.on()
        }
        console.log('Changing Modes as applicable')
        if (location.modes?.find({
        it.name == newMode
        })) {
        this.setLocationMode(newMode)
        } else {
        log.warn("Tried to change to undefined mode '$newMode'")
        }
        }
        if (curJointCount > 0) {
        let curLevel = atomicState.dimmerLevel
        console.log("Determined Joint Count > 0, Dimmers are currently set to $curLevel, dimmerMax = $dimmerMax")
        if (curLevel < dimmerMax ) {
        for (let aDimmer : dimmers ) {
        let newLevel = dimmerInterval * curJointCount
        if (newLevel > dimmerMax ) {
        newLevel = dimmerMax
        }
        atomicState.dimmerLevel = newLevel
        console.log("Setting ${aDimmer.name} to $newLevel")
        if (curLevel != newLevel ) {
        aDimmer.setLevel(newLevel, dimmerRampRate)
        }
        }
        }
        }
        console.log("Turning off event.device: $eventDevice")
        eventDevice.off()
        

	})

    .subscribedEventHandler('switchResetHandler', (context, event) => {
        
        atomicState.jointCount = 0
        atomicState.dimmerLevel = 0
        console.log("Resetting because ${event.displayName} alarm reset, jointCount = ${atomicState.jointCount}, dimmerLevel = ${atomicState.dimmerLevel}")
        

	})

    .scheduledEventHandler('reset', (context, event) => {
        
        console.log("Resetting on scehdule, starting at jointCount = ${atomicState.jointCount}, dimmerLevel = ${atomicState.dimmerLevel}")
        atomicState.jointCount = 0
        atomicState.dimmerLevel = 0
        
        context.api.devices.sendCommands(context.config.alarm1, 'switch', reset)
    
        
        context.api.devices.sendCommands(context.config.alarm2, 'switch', reset)
    
        console.log("Reset Complete, jointCount = ${atomicState.jointCount}, dimmerLevel = ${atomicState.dimmerLevel}")
        

	})
