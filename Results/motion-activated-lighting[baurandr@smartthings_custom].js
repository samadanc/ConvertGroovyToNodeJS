
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when there\'s movement...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Which motion sensor(s)?');

        });


        page.section('Turn on when a contact opens...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Which contact sensor(s)?');

        });


        page.section('And off when there\'s been no movement or contact has been closed for...', section => {
            section.numberSetting('minutes1').name('Minutes?');

        });


        page.section('Turn on/off light(s)...', section => {
            section.deviceSetting('switches').capability(['switchLevel']).name('');

        });


        page.section('Set dim level...', section => {
            section.numberSetting('dimLevel').name('%?');

        });


        page.section('Turn on between what times? Both absolute and sun event based times must be true to turn lights on.', section => {
            section.timeSetting('fromTime').name('Start of allowed time window');
            section.timeSetting('toTime').name('End of allowed time window');
            section.numberSetting('onOffset').name('Start of allowed time based on Sunset offset (+ = after, - = before)');
            section.numberSetting('offOffset').name('End of allowed time based on Sunrise offset (+ = after, - = before)');

        });


        page.section('Turn on during what modes?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        console.log("New Event: ${event.device},  ${event.name}: ${event.value}")
        let offSwitches = state.switchesToTurnOff
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
        let curMode = location.currentMode
        
        context.api.devices.sendCommands(context.config.modesTurnOnAllowed, 'mode', contains)
    
        console.log("Current Mode: $curMode, Turn on Mode OK: $modeOK, Turn On time frame OK: $timeOK")
        if (timeOK & modeOK ) {
        this.checkAndSetDimmers()
        }
        } else {
        if (event.value == 'inactive' || event.value == 'closed') {
        let allQuiet = this.allSensorsQuiet()
        console.log("All Quiet = $allQuiet")
        if (offSwitches && allQuiet ) {
        if (minutes1 <= 0) {
        this.turnOffDimmers()
        console.log('Activity has stopped and desired hold time is zero, turning lights off')
        } else {
        this.runIn(minutes1 * 60, scheduleCheck, ['overwrite': true])
        }
        }
        }
        }
        

	})
