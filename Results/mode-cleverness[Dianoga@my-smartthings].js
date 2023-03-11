
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'checkThings')

        context.api.schedules.schedule('checkThings', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'checkThings')

    })

    .subscribedEventHandler('checkThings', (context, event) => {
        
                String present = people.find({ 
                    it.currentPresence == 'present'
                })
                let s = this.getSunriseAndSunset()
                let now = new Date()
                let tenpm = this.timeToday('22:00', location.timeZone)
                String mode 
                String action 
                String alarm 
                if (present) {
                    if (now.before(s.sunrise) || now.after(tenpm)) {
                        mode = settings.presentNightMode
                        action = settings.presentNightAction
                        alarm = settings.presentNightAlarm
                    } else {
                        if (now.after(s.sunset)) {
                            mode = settings.presentEveningMode
                            action = settings.presentEveningAction
                            alarm = settings.presentEveningAlarm
                        } else {
                            mode = settings.presentDayMode
                            action = settings.presentDayAction
                            alarm = settings.presentDayAlarm
                        }
                    }
                } else {
                    if (now.before(s.sunrise) || now.after(tenpm)) {
                        mode = settings.awayNightMode
                        action = settings.awayNightAction
                        alarm = settings.awayNightAlarm
                    } else {
                        if (now.after(s.sunset)) {
                            mode = settings.awayEveningMode
                            action = settings.awayEveningAction
                            alarm = settings.awayEveningAlarm
                        } else {
                            mode = settings.awayDayMode
                            action = settings.awayDayAction
                            alarm = settings.awayDayAlarm
                        }
                    }
                }
                console.log("Mode: $mode | Action: $action | Alarm: $alarm")
                location.setMode(mode)
                if (action) {
                    location.helloHome?.execute(action)
                }
                if (alarm) {
                    this.sendLocationEvent(['name': 'alarmSystemStatus', 'value': alarm ])
                }
            

	})

    .scheduledEventHandler('checkThings', (context, event) => {
        
                String present = people.find({ 
                    it.currentPresence == 'present'
                })
                let s = this.getSunriseAndSunset()
                let now = new Date()
                let tenpm = this.timeToday('22:00', location.timeZone)
                String mode 
                String action 
                String alarm 
                if (present) {
                    if (now.before(s.sunrise) || now.after(tenpm)) {
                        mode = settings.presentNightMode
                        action = settings.presentNightAction
                        alarm = settings.presentNightAlarm
                    } else {
                        if (now.after(s.sunset)) {
                            mode = settings.presentEveningMode
                            action = settings.presentEveningAction
                            alarm = settings.presentEveningAlarm
                        } else {
                            mode = settings.presentDayMode
                            action = settings.presentDayAction
                            alarm = settings.presentDayAlarm
                        }
                    }
                } else {
                    if (now.before(s.sunrise) || now.after(tenpm)) {
                        mode = settings.awayNightMode
                        action = settings.awayNightAction
                        alarm = settings.awayNightAlarm
                    } else {
                        if (now.after(s.sunset)) {
                            mode = settings.awayEveningMode
                            action = settings.awayEveningAction
                            alarm = settings.awayEveningAlarm
                        } else {
                            mode = settings.awayDayMode
                            action = settings.awayDayAction
                            alarm = settings.awayDayAlarm
                        }
                    }
                }
                console.log("Mode: $mode | Action: $action | Alarm: $alarm")
                location.setMode(mode)
                if (action) {
                    location.helloHome?.execute(action)
                }
                if (alarm) {
                    this.sendLocationEvent(['name': 'alarmSystemStatus', 'value': alarm ])
                }
            

	})
