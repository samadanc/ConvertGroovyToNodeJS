
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'lanResponseHandler')

        context.api.schedules.runIn('discoverChildDevices', delay);

        context.api.schedules.runIn('alarmUpdate', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmHandler')

    })

    .subscribedEventHandler('lanResponseHandler', (context, event) => {
        
                let map = this.stringToMap(event.stringValue)
                if (map.ip == this.convertIPtoHex(settings.proxyAddress) && map.port == this.convertPortToHex(settings.proxyPort)) {
                    if (map.mac) {
                        state.proxyMac = map.mac
                    }
                }
                if (map.mac != state.proxyMac) {
                }
                let headers = this.getHttpHeaders(map.headers)
                let body = this.getHttpBody(map.body)
                if (headers.device != 'dscalarm') {
                    this.writeLog("DSCAlarmSmartAppV2 - Received event ${event.stringValue} but it didn't came from DSCAlarm")
                    this.writeLog("DSCAlarmSmartAppV2 - Received event but it didn't came from DSCAlarm headers:  $headers")
                    this.writeLog("DSCAlarmSmartAppV2 - Received event but it didn't came from DSCAlarm body: $body")
                    return null
                }
                this.writeLog("DSCAlarmSmartAppV2 - Received event headers:  $headers")
                this.writeLog("DSCAlarmSmartAppV2 - Received event body: $body")
                this.processEvent(body)
            

	})

    .subscribedEventHandler('alarmHandler', (context, event) => {
        
                if (!settings.enableSHM) {
                    return null
                }
                if (state.alarmSystemStatus == event.value) {
                    return null
                }
                state.alarmSystemStatus = event.value
                if (event.value == 'stay') {
                    this.sendCommand('/api/alarmArmStay')
                }
                if (event.value == 'away') {
                    this.sendCommand('/api/alarmArmAway')
                }
                if (event.value == 'off') {
                    this.sendCommand('/api/alarmDisarm')
                }
            

	})

    .scheduledEventHandler('discoverChildDevices', (context, event) => {
        
                this.sendCommand('/discover')
                this.writeLog('DSCAlarmSmartAppV2 - Sending discovery request')
            

	})

    .scheduledEventHandler('alarmUpdate', (context, event) => {
        
                this.sendCommand('/api/alarmUpdate')
                this.writeLog('DSCAlarmSmartAppV2 - Sending Alarm Update request')
            

	})
