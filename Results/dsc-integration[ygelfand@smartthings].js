
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Alarm Server Settings', section => {
            section.textSetting('ip').name('IP');
            section.textSetting('port').name('Port');
            section.textSetting('alarmCodePanel').name('Alarm Code');
            section.booleanSetting('smartMonitorInt').name('Integrate w/ Smart Monitor?');
            section.booleanSetting('stayIsInstant').name('Make Stay Arm Instant arm?');
            section.booleanSetting('pushNotify').name('Send Push Notification?');
            section.booleanSetting('enableVoiceNotify').name('Enable Voice Notifications');
            section.deviceSetting('Speakers').capability(['musicPlayer']).name('Speaker');
            section.numberSetting('SpeakerVolume').name('Set volume to (1-100%):');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmStatusUpdate')

    })

    .subscribedEventHandler('alarmStatusUpdate', (context, event) => {
        
        let eventMap = ['stay': '/api/alarm/stayarm', 'off': '/api/alarm/disarm', 'away': '/api/alarm/armwithcode', 'instant': '/api/alarm/instantarm']
        let securityMonitorMap = ['stay': 'stayarm', 'off': 'disarm', 'away': 'arm']
        let command = securityMonitorMap."${event.value}"
        this.setCommandSwitch(command)
        let path = eventMap."${event.value}"
        if (stayIsInstant && event.value == 'stay') {
        path = eventMap.instant
        }
        this.callAlarmServer(path)
        

	})
