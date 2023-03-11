
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switch', section => {
            section.deviceSetting('swtches').capability(['switch']).name('Switch');

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.swtches, 'switch', 'switch.on', 'handleSwitchOn')

        await context.api.subscriptions.subscribeToDevices(context.config.swtches, 'switch', 'switch.off', 'handleSwitchOff')

    })

    .subscribedEventHandler('handleSwitchOn', (context, event) => {
        
        let workingMap = atomicState.switchInfo
        if (this.timeInRange(event.deviceId)) {
        workingMap["${event.deviceId}"] = new Date().time + ((settings["minutes-${event.deviceId}"]) as long) * 60 * 1000
        let list = workingMap.values().sort()
        let smallestTime = list[0]
        let smallestId = ''
        let result = this.getNextSwitchToSchedule(workingMap)
        if (result != null && result.id == event.deviceId) {
        let minutesToTurnOfFrom = this.millisecondsToMinutesFromNow(smallestTime)
        this.handleNotification(true, false, true, "TIMER App: Switch(${event.deviceId}) is the soonest switch to turn off.  Scheduling to turn of in $minutesToTurnOfFrom minutes.")
        this.unschedule('turnOffSwitch')
        this.runIn(60 * this.millisecondsToMinutesFromNow(smallestTime), turnOffSwitch)
        }
        }
        atomicState.switchInfo = workingMap
        

	})

    .subscribedEventHandler('handleSwitchOff', (context, event) => {
        
        let workingMap = atomicState.switchInfo
        let result = this.getNextSwitchToSchedule(workingMap)
        if (result != null && event.deviceId == result.id) {
        this.handleNotification(true, false, true, "TIMER App: Switch (${event.deviceId}) was the next switch to be turned off.")
        this.unschedule('turnOffSwitch')
        workingMap.remove(event.deviceId)
        atomicState.switchInfo = workingMap
        this.turnOffSwitch(null)
        } else {
        if (result != null) {
        this.handleNotification(true, false, true, "TIMER App: Removing switch (${event.deviceId}) from queue.")
        workingMap.remove(event.deviceId)
        }
        }
        atomicState.switchInfo = workingMap
        

	})
