
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('init', delay);

    })

    .scheduledEventHandler('init', (context, event) => {
        
                log.info('init() -> initializing')
                state.preventRougeAuthRequest = false
                this.subscribe(app, onAppTouchHandler)
                log.trace('init() -> subscribe(app, onAppTouch)')
                this.subscribe(location, 'mode', modeHandler)
                log.trace('init() ->  subscribe(location, mode, modeHandler)')
                this.subscribe(alarmsystem, 'alarm', alarmStateHandler)
                log.trace('init() -> subscribe(alarmsystem, alarm, alarmStateHandler)')
                state.ringAlarmStatus = 'UNKNOWN'
                this.runIn(3, getRingAccountDetails)
                this.runIn(15, addChildDevices)
                this.runIn(40, scheduleDeviceRefresh)
                this.runEvery15Minutes(addChildDevices)
            

	})
