
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Alarm Server Settings', section => {
            section.textSetting('ip').name('IP');
            section.textSetting('port').name('Port');
            section.textSetting('alarmCodePanel').name('Alarm Code');
            section.enumSetting('smartMonitorInt').name('Integrate w/ Smart Monitor?');
            section.enumSetting('physicalMonitorInt').name('Integrate w/ Physical Panels?');

        });


        page.section('Button for Alarm', section => {
            section.deviceSetting('thecommand').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thecommand, 'switch', 'switch', 'switchUpdate')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'lanResponseHandler')

        context.api.schedules.runIn('checkAlarm', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmStatusUpdate')

    })

    .subscribedEventHandler('lanResponseHandler', (context, event) => {
        
        let jsonSlurper = new JsonSlurper()
        let systemArmed = false
        let systemEntryDelay = false
        let description = event.description
        try {
        if (description.count(',') > 4) {
        let bodyString = new String(description.split(',')[6].split(':')[1].decodeBase64())
        let resp = jsonSlurper.parseText(bodyString)
        if (resp.version != null) {
        console.log('Syncing Physical Panel with Smartthings (if needed)')
        let partitions = resp.partition
        partitions.each({ let k, let v ->
        if (v.status.armed || v.status.exit_delay) {
        systemArmed = true
        }
        if (v.status.entry_delay) {
        systemEntryDelay = true
        }
        })
        let messages = resp.partition.lastevents
        let found = false
        let filteredMsgs = messages.findAll({
        it.message.contains('Armed')
        })
        let lastMsg = filteredMsgs.last().message
        if (!systemEntryDelay) {
        if (!systemArmed) {
        console.log('Physical Panel Disarmed')
        this.setCommandSwitch('disarm')
        this.setSmartHomeMonitor('off')
        } else {
        if (lastMsg.contains('Away')) {
        console.log('Physical Panel Armed in Away Mode')
        this.setCommandSwitch('arm')
        this.setSmartHomeMonitor('away')
        } else {
        if (lastMsg.contains('Stay')) {
        console.log('Physical Panel Armed in Stay Mode')
        this.setCommandSwitch('stayarm')
        this.setSmartHomeMonitor('stay')
        }
        }
        }
        }
        }
        }
        }
        catch (let e) {
        log.error("something went wrong: $e")
        }
        

	})

    .subscribedEventHandler('alarmStatusUpdate', (context, event) => {
        
        let eventMap = ['stay': '/api/alarm/stayarm', 'off': '/api/alarm/disarm', 'away': '/api/alarm/armwithcode']
        let securityMonitorMap = ['stay': 'stayarm', 'off': 'disarm', 'away': 'arm']
        let command = securityMonitorMap."${event.value}"
        this.setCommandSwitch(command)
        let path = eventMap."${event.value}"
        this.callAlarmServer(path)
        

	})

    .subscribedEventHandler('switchUpdate', (context, event) => {
        
        let eventMap = ['stayarm': '/api/alarm/stayarm', 'disarm': '/api/alarm/disarm', 'arm': '/api/alarm/armwithcode']
        let securityMonitorMap = ['stayarm': 'stay', 'disarm': 'off', 'arm': 'away']
        let path = eventMap."${event.value}"
        this.setSmartHomeMonitor(securityMonitorMap."${event.value}")
        this.callAlarmServer(path)
        

	})

    .scheduledEventHandler('checkAlarm', (context, event) => {
        
        console.log('Check Alarm')
        this.runIn(15, checkAlarm)
        this.callAlarmServer('/api')
        

	})
