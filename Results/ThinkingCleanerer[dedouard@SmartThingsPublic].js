
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('pollOff', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'pollRestart')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'pollRestart')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                let msg 
                switch (event.value) {
                    case 'error':
                        this.sendEvent(['linkText': app.label, 'name': "${event.displayName}", 'value': 'error', 'descriptionText': "${event.displayName} has an error", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                        log.trace("${event.displayName} has an error")
                        msg = "${event.displayName} has an error"
                        if (sendRoombaError == true) {
                            if (settings.sendSMS != null) {
                                this.sendSms(sendSMS, msg)
                            }
                            if (settings.sendPush == true) {
                                this.sendPush(msg)
                            }
                        }
                        this.schedule('39 0/15 * 1/1 * ?', pollErr)
                        break
                    case 'on':
                        this.sendEvent(['linkText': app.label, 'name': "${event.displayName}", 'value': 'on', 'descriptionText': "${event.displayName} is on", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                        log.trace("${event.displayName} is on")
                        msg = "${event.displayName} is on"
                        this.schedule('15 0/1 * 1/1 * ?', pollOn)
                        if (sendRoombaOn == true) {
                            if (settings.sendSMS != null) {
                                this.sendSms(sendSMS, msg)
                            }
                            if (settings.sendPush == true) {
                                this.sendPush(msg)
                            }
                        }
                        if (settings.autoSHM.contains('true')) {
                            if (location.currentState('alarmSystemStatus')?.value == 'away') {
                                this.sendEvent(['linkText': app.label, 'name': 'Smart Home Monitor', 'value': 'stay', 'descriptionText': 'Smart Home Monitor was set to stay', 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                                log.trace('Smart Home Monitor was set to stay')
                                this.sendLocationEvent(['name': 'alarmSystemStatus', 'value': 'stay'])
                                state.autoSHMchange = 'y'
                            }
                        }
                        break
                    case 'full':
                        this.sendEvent(['linkText': app.label, 'name': "${event.displayName}", 'value': 'bin full', 'descriptionText': "${event.displayName} bin is full", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                        log.trace("${event.displayName} bin is full")
                        msg = "${event.displayName} bin is full"
                        if (sendRoombaBin == true) {
                            if (settings.sendSMS != null) {
                                this.sendSms(sendSMS, msg)
                            }
                            if (settings.sendPush == true) {
                                this.sendPush(msg)
                            }
                        }
                        break
                    case 'off':
                        this.sendEvent(['linkText': app.label, 'name': "${event.displayName}", 'value': 'off', 'descriptionText': "${event.displayName} is off", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                        log.trace("${event.displayName} is off")
                        msg = "${event.displayName} is off"
                        if (sendRoombaOff == true) {
                            if (settings.sendSMS != null) {
                                this.sendSms(sendSMS, msg)
                            }
                            if (settings.sendPush == true) {
                                this.sendPush(msg)
                            }
                        }
                        this.schedule('22 4 0/1 1/1 * ? *', pollOff)
                        break
                }
            

	})

    .subscribedEventHandler('pollRestart', (context, event) => {
        
                let t = this.now() - state.pollState
                if (t > 4200000) {
                    this.unschedule(pollOff)
                    this.schedule('23 4 0/1 1/1 * ? *', pollOff)
                    this.sendEvent(['linkText': app.label, 'name': 'Poll', 'value': 'Restart', 'descriptionText': 'Polling Restarted', 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                    log.trace('Polling Restarted')
                }
            

	})

    .scheduledEventHandler('pollOff', (context, event) => {
        
                let offSwitch1 = settings.switch1.currentSwitch.findAll({ let switchVal ->
                    switchVal == 'off' ? true : false
                })
                settings.switch1.each({ 
                    if (it.currentSwitch == 'off') {
                        state.pollState = this.now()
                        it.poll()
                        this.runIn(3660, pollRestart, ['overwrite': true])
                    }
                })
                if (offSwitch1.size() == 0) {
                    this.unschedule(pollOff)
                }
            

	})
