
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sensors', section => {
            section.deviceSetting('presenceSleepSensors').capability(['sleepSensor']).name('Presence+Sleep Sensors');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Presence Sensors');

        });


        page.section('Routines', section => {
            section.deviceSetting('arrivedWhenAway').capability(['switch']).name('Arrived when Away');
            section.deviceSetting('arrivedWhenAsleep').capability(['switch']).name('Arrived when Asleep');
            section.deviceSetting('departedWhenAway').capability(['switch']).name('Departed when Away');
            section.deviceSetting('departedWhenAsleep').capability(['switch']).name('Departed when Asleep');
            section.deviceSetting('awake').capability(['switch']).name('Awake');
            section.deviceSetting('asleep').capability(['switch']).name('Asleep');

        });


        page.section('Backup Times', section => {
            section.timeSetting('awakeTime').name('Awake Time');
            section.timeSetting('asleepTime').name('Asleep Time');

        });


        page.section('', section => {
            section.booleanSetting('logEnable').name('Enable debug logging?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('asleepTimeHandler', delay);

        context.api.schedules.schedule('awakeTimeHandler', delay);

    })

    .subscribedEventHandler('departedHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        let anyonePresent = false
        let anyoneAwake = false
        for (let sensor : presenceSleepSensors ) {
        if (sensor.currentValue('presence') == 'present') {
        anyonePresent = true
        if (sensor.currentValue('sleeping') == 'not sleeping') {
        anyoneAwake = true
        }
        }
        }
        for (let sensor : presenceSensors ) {
        if (sensor.currentValue('presence') == 'present') {
        anyonePresent = true
        }
        }
        if (anyonePresent == false) {
        if (location.mode != 'Away') {
        
        context.api.devices.sendCommands(context.config.departedWhenAway, 'switch', on)
    
        }
        } else {
        if (anyoneAwake == false) {
        if (location.mode != 'Sleep') {
        
        context.api.devices.sendCommands(context.config.departedWhenAsleep, 'switch', on)
    
        }
        }
        }
        

	})

    .subscribedEventHandler('arrivedHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        if (location.mode == 'Away') {
        
        context.api.devices.sendCommands(context.config.arrivedWhenAway, 'switch', on)
    
        } else {
        if (location.mode == 'Sleep') {
        
        context.api.devices.sendCommands(context.config.arrivedWhenAsleep, 'switch', on)
    
        }
        }
        

	})

    .subscribedEventHandler('asleepHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        if (event.device.currentValue('presence') == 'present') {
        let anyoneAwake = false
        for (let sensor : presenceSleepSensors ) {
        if (sensor.currentValue('presence') == 'present' && sensor.currentValue('sleeping') == 'not sleeping') {
        anyoneAwake = true
        }
        }
        if (anyoneAwake == false) {
        if (location.mode != 'Sleep') {
        
        context.api.devices.sendCommands(context.config.asleep, 'switch', on)
    
        }
        }
        }
        

	})

    .subscribedEventHandler('awakeHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        if (event.device.currentValue('presence') == 'present') {
        if (location.mode == 'Sleep') {
        
        context.api.devices.sendCommands(context.config.awake, 'switch', on)
    
        }
        }
        

	})

    .scheduledEventHandler('asleepTimeHandler', (context, event) => {
        
        this.logDebug('Received asleep time event')
        if (location.mode == 'Home') {
        
        context.api.devices.sendCommands(context.config.asleep, 'switch', on)
    
        }
        

	})

    .scheduledEventHandler('awakeTimeHandler', (context, event) => {
        
        this.logDebug('Received awake time event')
        if (location.mode == 'Sleep') {
        
        context.api.devices.sendCommands(context.config.awake, 'switch', on)
    
        }
        

	})
