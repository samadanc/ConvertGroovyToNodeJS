
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when there\'s activity...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Which motion sensor(s)?');
            section.deviceSetting('contact1').capability(['contactSensor']).name('Which contact sensor(s)?');

        });


        page.section('Settings When Mode is NOT Sleeping', section => {
            section.deviceSetting('switches').capability(['switchLevel']).name('Which Dimmers?');
            section.numberSetting('dimLevel').name('Set Dim Level To What %?');
            section.numberSetting('minutes1').name('Turn off how long after activity stops (minutes)?');

        });


        page.section('Settings When Mode IS Sleeping (optional - leave blank to use same settings as NOT sleeping', section => {
            section.deviceSetting('switchesSleep').capability(['switchLevel']).name('Which Dimmers?');
            section.numberSetting('dimLevelSleep').name('Set Dim Level To What %?');
            section.numberSetting('minutes1SleepSetting').name('Turn off how long after activity stops (minutes)?');
            section.timeSetting('fromTime').name('Start of allowed time window');
            section.timeSetting('toTime').name('End of allowed time window');
            section.numberSetting('onOffset').name('Start of allowed time based on Sunset offset (+ = after, - = before)');
            section.numberSetting('offOffset').name('End of allowed time based on Sunrise offset (+ = after, - = before)');
            section.enumSetting('sunStateTurnOnAllowed').name('Allowed Sun States');

        });


        page.section('Turn on between what times? Both absolute and sun event based times must be true to turn lights on.', section => {
            section.timeSetting('fromTime').name('Start of allowed time window');
            section.timeSetting('toTime').name('End of allowed time window');
            section.numberSetting('onOffset').name('Start of allowed time based on Sunset offset (+ = after, - = before)');
            section.numberSetting('offOffset').name('End of allowed time based on Sunrise offset (+ = after, - = before)');

        });


        page.section('Turn on during what modes?', section => {

        });


        page.section('Turn on allowed during what Sun States?', section => {
            section.enumSetting('sunStateTurnOnAllowed').name('Allowed Sun States');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'eventHandler')

        context.api.schedules.runEvery5Minutes('supervisorCheck', delay);

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        console.log("New Event: ${event.device},  ${event.name}: ${event.value}")
        let offSwitches = state.switchesToTurnOff
        let curMode = location.currentMode
        if (event.value == 'active' || event.value == 'open') {
        let timeOK = true
        if (fromTime && toTime ) {
        timeOK = this.timeOfDayIsBetween(fromTime, toTime, new Date(), location.timeZone)
        }
        if (onOffset && offOffset && timeOK ) {
        let sunTimes = this.getSunriseAndSunset()
        let sunsetTime = Date.parse('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'', sunTimes.sunset)
        let sunriseTime = Date.parse('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'', sunTimes.sunrise)
        let timeAfterSunset = new Date(sunsetTime.time + onOffset * 60 * 1000)
        let timeAfterSunrise = new Date(sunriseTime.time + offOffset * 60 * 1000)
        timeOK = this.timeOfDayIsBetween(timeAfterSunset, timeAfterSunrise, new Date(), location.timeZone)
        }
        
        context.api.devices.sendCommands(context.config.modesTurnOnAllowed, 'mode', contains)
    
        
        context.api.devices.sendCommands(context.config.sunStateTurnOnAllowed, 'enum', contains)
    
        console.log("Current Mode: $curMode, Turn on Mode OK: $modeOK, Turn On time frame OK: $timeOK, Turn On Sun State OK: $sunStateOK")
        if (timeOK & modeOK & sunStateOK ) {
        java.lang.Integer dimLevelFinal = dimLevel
        let switchesFinal = switches
        if (curMode == 'Sleeping') {
        if (dimLevelSleep) {
        dimLevelFinal = dimLevelSleep
        }
        if (switchesSleep) {
        switchesFinal = switchesSleep
        }
        }
        this.checkAndSetDimmers(switchesFinal, dimLevelFinal)
        }
        } else {
        if (event.value == 'inactive' || event.value == 'closed') {
        let allQuiet = this.allSensorsQuiet()
        console.log("All Quiet = $allQuiet")
        if (offSwitches && allQuiet ) {
        java.lang.Integer minutes1Final = minutes1
        if (curMode == 'Sleeping') {
        try {
        java.lang.Integer minutes1SleepSettingInt = minutes1SleepSetting
        minutes1Final = minutes1SleepSetting
        }
        catch (let e) {
        }
        }
        if (minutes1Final <= 0) {
        this.turnOffDimmers()
        console.log('Activity has stopped and desired hold time is zero, turning lights off')
        } else {
        this.runIn(minutes1Final * 60, scheduleCheck, ['overwrite': true])
        }
        }
        }
        }
        

	})

    .scheduledEventHandler('supervisorCheck', (context, event) => {
        
        console.log('Supervisor Check')
        let offSwitches = state.switchesToTurnOff
        let lastStates = []
        if (offSwitches) {
        motion1.each({
        lastStates << it.latestState('motion')
        })
        contact1.each({
        lastStates << it.latestState('contact')
        })
        let elapsed = 0
        let minElapsed = 600000000
        let bAllQuiet = true
        lastStates.each({
        if (bAllQuiet) {
        if (it.value == 'closed' || it.value == 'inactive') {
        elapsed = this.now() - it.rawDateCreated.time
        if (elapsed < minElapsed ) {
        minElapsed = elapsed
        }
        } else {
        console.log('ACTIVE SENSOR FOUND')
        bAllQuiet = false
        minElapsed = 0
        }
        }
        console.log("${it.date}-${it.name}-${it.value}-${it.device}-$elapsed")
        })
        if (bAllQuiet) {
        java.lang.Integer minutes1Final = minutes1
        if (curMode == 'Sleeping') {
        try {
        java.lang.Integer minutes1SleepSettingInt = minutes1SleepSetting
        minutes1Final = minutes1SleepSetting
        }
        catch (let e) {
        }
        }
        if (minElapsed > minutes1Final * 60 * 1000) {
        console.log('Timer has elapsed, lights should have turned off - Turn lights off')
        this.turnOffDimmers()
        } else {
        console.log('Timer has NOT elapsed, lights should still be on - DO Nothing')
        }
        } else {
        console.log('NOT all quiet - do nothing')
        }
        } else {
        console.log('No switches to be turned off - do nothing')
        }
        

	})
