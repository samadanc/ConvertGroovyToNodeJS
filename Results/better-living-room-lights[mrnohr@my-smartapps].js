
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these lights...', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('During these times...', section => {
            section.timeSetting('morningOn').name('Turn on at this time in the morning');
            section.timeSetting('midMorningOff').name('Turn off at this time in the morning if nobody is home');
            section.timeSetting('afternoonOn').name('Turn on at this time in the afternoon if nobody is home');
            section.timeSetting('eveningOff').name('Turn off at this time at night');

        });


        page.section('With these light levels...', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('Light sensor');
            section.numberSetting('turnOnBrightness').name('Turn on under this lux (default 100)');

        });


        page.section('Notifications for fine tuning', section => {
            section.enumSetting('debugLevel').name('Send notifications for fine tuning?');
            section.enumSetting('pushAndPhone').name('Both Push and SMS?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleHandler', delay);

    })

    .scheduledEventHandler('scheduleHandler', (context, event) => {
        
        java.lang.Boolean sendMessage = true
        java.lang.Boolean isStateChange = false
        
        context.api.devices.sendCommands(context.config.lightSensor, 'illuminanceMeasurement', currentValue)
    
        String logMessage = "Ran, No Change: lux $currentLux"
        if (this.withinOuterTime()) {
        if (this.isDarkEnough()) {
        if (this.isCurrentlyHomeMode() || !(this.withinInnerTime())) {
        isStateChange = this.turnOn()
        if (isStateChange) {
        logMessage = "Dark enough ($currentLux), turned on lights"
        }
        } else {
        isStateChange = this.turnOff()
        if (isStateChange) {
        logMessage = "Away ($currentLux), turned off lights"
        }
        }
        } else {
        isStateChange = this.turnOff()
        if (isStateChange) {
        logMessage = "Bright enough ($currentLux), turned off lights"
        }
        }
        } else {
        isStateChange = this.turnOff()
        if (isStateChange) {
        sendMessage = true
        logMessage = 'Outside of time window, turned off lights'
        } else {
        sendMessage = false
        }
        }
        log.trace("scheduleHandler: $logMessage (stateChange = $isStateChange, sendMessage = $sendMessage)")
        if (sendMessage) {
        this.messageMe(logMessage, isStateChange)
        }
        

	})
