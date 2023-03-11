
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Use this Alarm...', section => {
            section.deviceSetting('simpliSafeAlarm').capability(['alarm']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.simpliSafeAlarm, 'alarm', 'alarm', 'changeAlarm')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'changeMode')

        await context.api.subscriptions.subscribeToDevices(context.config.simpliSafeAlarm, 'alarm', 'presence', 'changeAlarm')

    })

    .subscribedEventHandler('changeAlarm', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.simpliSafeAlarm, 'alarm', currentState)
    
        let monitorState = location.currentState('alarmSystemStatus').value.toLowerCase()
        let desiredMonitorState
        if (alarmState == 'off') {
        desiredMonitorState = 'off'
        } else {
        if (alarmState == 'home') {
        desiredMonitorState = 'stay'
        } else {
        if (presenceState == 'away') {
        desiredMonitorState = 'away'
        } else {
        log.error("Something went wrong: confused by SS state $alarmState")
        return null
        }
        }
        }
        console.log("Smart Home Monitor state: $monitorState")
        console.log("SimpliSafe current alarm state: $alarmState")
        if (monitorState != desiredMonitorState ) {
        log.info("Updating home monitor state to $desiredMonitorState from $monitorState")
        this.sendLocationEvent(['name': 'alarmSystemStatus', 'value': desiredMonitorState ])
        } else {
        log.info("No home monitor state update needed - SS: $alarmState, SHM: $monitorState / $desiredMonitorState")
        }
        

	})

    .subscribedEventHandler('changeMode', (context, event) => {
        
        if (evt == null || event.value == null) {
        log.info('Null event received.')
        return null
        }
        
        context.api.devices.sendCommands(context.config.simpliSafeAlarm, 'alarm', currentState)
    
        let alarmState = event.value.toLowerCase()
        console.log("Mode change triggered is: $alarmState")
        console.log("Current SimpliSafe state is: $currentState")
        if (alarmState == 'stay') {
        if (currentState == 'home') {
        log.info('No state change needed.')
        } else {
        
        context.api.devices.sendCommands(context.config.simpliSafeAlarm, 'alarm', home)
    
        console.log('Setting SimliSafe to HOME')
        }
        } else {
        if (currentState == alarmState ) {
        log.info('No state change needed.')
        } else {
        if (alarmState == 'away') {
        
        context.api.devices.sendCommands(context.config.simpliSafeAlarm, 'alarm', away)
    
        console.log('Setting SimliSafe to AWAY')
        } else {
        if (alarmState == 'off') {
        
        context.api.devices.sendCommands(context.config.simpliSafeAlarm, 'alarm', off)
    
        console.log('Setting SimliSafe to OFF')
        } else {
        log.error('Something broke and system status was not changed!')
        }
        }
        }
        }
        

	})
