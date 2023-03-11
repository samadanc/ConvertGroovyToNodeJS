
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the motion sensors you\'d like to monitor.', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion sensor(s)');

        });


        page.section('Choose the thermostat to change when appropriate.', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'motionChangeHandler')

    })

    .subscribedEventHandler('motionChangeHandler', (context, event) => {
        
        this.setCurrentMotions()
        let current_motions = this.getCurrentMotions(true)
        this.sendNotificationEvent("[MOTION] Current motion: $current_motions")
        let parser = new JsonSlurper()
        if (event.value == 'inactive') {
        let tracking_list = parser.parseText(appSettings.notification_motions)
        if (tracking_list.contains(event.device.getLabel())) {
        let label = event.device.getLabel().toString().replace('(Ecobee) ', '')
        let df = new java.text.SimpleDateFormat('H')
        df.setTimeZone(location.timeZone)
        let hour = df.format(new Date())
        if (hour.toInteger() >= 8 && hour.toInteger() <= 23) {
        }
        }
        if
        
        context.api.devices.sendCommands(context.config.thermostat, 'device.myEcobeeDevice', currentValue)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'device.myEcobeeDevice', currentValue)
    
        this.sendNotificationEvent("[MOTION] Set climate: $set_climate, program type: $program_type")
        if (set_climate != 'Sleep' && program_type != 'hold' || set_climate != 'Away') {
        if (location.currentMode.toString() != 'Away') {
        this.sendNotificationEvent('[MOTION] ACTION: Thermostat going into Away mode.')
        try {
        
        context.api.devices.sendCommands(context.config.thermostat, 'device.myEcobeeDevice', setThisTstatClimate)
    
        let current_timestamp = new Date().getTime() / 1000
        if (atomicState.sms_timestamp == null || current_timestamp - atomicState.sms_timestamp > 30) {
        atomicState.sms_timestamp = current_timestamp
        parser = new JsonSlurper()
        let notification_list = parser.parseText(appSettings.notification_recipients)
        notification_list.each({ let phone_number ->
        this.sendSms(phone_number, 'All motion sensors are idle. Thermostat is going into Away mode.')
        })
        }
        }
        catch (let e) {
        this.sendNotificationEvent("[MOTION] ERROR: $e")
        }
        }
        }
        }
        } else {
        if (event.value == 'active') {
        
        context.api.devices.sendCommands(context.config.thermostat, 'device.myEcobeeDevice', currentValue)
    
        let current_presence = this.getCurrentPresence(true)
        this.sendNotificationEvent("[MOTION] Current presence: $current_presence")
        this.sendNotificationEvent("[MOTION] Current climate: $set_climate")
        if (location.mode != 'Ignore Motion') {
        if (set_climate == 'Away') {
        if (current_presence.size() > 0) {
        this.sendNotificationEvent('[MOTION] ACTION: Thermostat is resuming its normal program.')
        try {
        
        context.api.devices.sendCommands(context.config.thermostat, 'device.myEcobeeDevice', resumeProgram)
    
        }
        catch (let e) {
        this.sendNotificationEvent("[MOTION] ERROR: $e")
        }
        } else {
        if (location.currentMode.toString() != 'Away') {
        this.sendNotificationEvent('[MOTION] ACTION: Thermostat going into Home mode.')
        try {
        try {
        
        context.api.devices.sendCommands(context.config.thermostat, 'device.myEcobeeDevice', setThisTstatClimate)
    
        }
        catch (let e) {
        this.sendNotificationEvent("[MOTION] ERROR: $e")
        }
        let current_timestamp = new Date().getTime() / 1000
        if (atomicState.sms_timestamp == null || current_timestamp - atomicState.sms_timestamp > 30) {
        atomicState.sms_timestamp = current_timestamp
        parser = new JsonSlurper()
        let notification_list = parser.parseText(appSettings.notification_recipients)
        notification_list.each({ let phone_number ->
        this.sendSms(phone_number, 'Motion has been detected at home. Thermostat is going into Home mode.')
        })
        }
        }
        catch (let e) {
        this.sendNotificationEvent("[MOTION] ERROR: $e")
        }
        }
        }
        }
        } else {
        this.sendNotificationEvent('[MOTION] Thermostat is not taking any action due to the Ignore Motion mode being set.')
        }
        }
        }
        

	})
