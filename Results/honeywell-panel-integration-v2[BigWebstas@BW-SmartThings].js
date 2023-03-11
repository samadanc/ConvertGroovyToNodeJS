
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Alarm Panel:', section => {
            section.deviceSetting('paneldevices').capability(['polling']).name('Partition Devies');

        });


        page.section('Zone Devices:', section => {
            section.deviceSetting('zonedevices').capability(['polling']).name('Honeywell Zone Devices');

        });


        page.section('Alarm Server Settings', section => {
            section.textSetting('ip').name('IP');
            section.textSetting('port').name('Port');

        });


        page.section('SHM sync ', section => {
            section.enumSetting('syncshm').name('SHM<->Partiton');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'shmtopartition')

        await context.api.subscriptions.subscribeToDevices(context.config.paneldevices, 'polling', 'dscpartition', 'partitiontoshm')

    })

    .subscribedEventHandler('shmtopartition', (context, event) => {
        
        let eventMap = ['stay': '/api/alarm/stayarm', 'off': '/api/alarm/disarm', 'away': '/api/alarm/arm']
        let securityMonitorMap = ['stay': 'armed-stay', 'off': 'ready', 'away': 'armed-away']
        let path = eventMap."${event.value}"
        let panelstate = securityMonitorMap."${event.value}"
        
        context.api.devices.sendCommands(context.config.paneldevices, 'polling', currentState)
    
        console.log(["$panelstate": "$currstate"])
        if (currstate != panelstate && path != null) {
        console.log('States dont match!')
        this.callAlarmServer(path)
        } else {
        console.log('States Match')
        }
        

	})

    .subscribedEventHandler('partitiontoshm', (context, event) => {
        
        let securityMonitorMap = ['armed-stay': 'stay', 'exit/entry-delay': 'off', 'armed-away': 'away', 'ready': 'off', 'notready': 'off', 'ready-bypass': 'off']
        this.SetSHM(securityMonitorMap."${event.value}")
        

	})
