
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Kid Wake Up', section => {
            section.numberSetting('kidWakeUpNumber').name('Button Number');
            section.timeSetting('kidWakeUpStartTime').name('Start Time');
            section.timeSetting('kidWakeUpEndTime').name('End Time');
            section.deviceSetting('kidWakeUpRoutine').capability(['switch']).name('Routine');

        });


        page.section('Kid Bedtime Soon', section => {
            section.numberSetting('kidBedtimeSoonNumber').name('Button Number');
            section.timeSetting('kidBedtimeSoonStartTime').name('Start Time');
            section.timeSetting('kidBedtimeSoonEndTime').name('End Time');
            section.deviceSetting('kidBedtimeSoonRoutine').capability(['switch']).name('Routine');

        });


        page.section('Kid Bedtime Now', section => {
            section.numberSetting('kidBedtimeNowNumber').name('Button Number');
            section.timeSetting('kidBedtimeNowStartTime').name('Start Time');
            section.timeSetting('kidBedtimeNowEndTime').name('End Time');
            section.deviceSetting('kidBedtimeNowRoutine').capability(['switch']).name('Routine');

        });


        page.section('Kid Light Off', section => {
            section.numberSetting('kidLightOffNumber').name('Button Number');
            section.timeSetting('kidLightOffStartTime').name('Start Time');
            section.timeSetting('kidLightOffEndTime').name('End Time');
            section.deviceSetting('kidLightOffRoutine').capability(['switch']).name('Routine');

        });


        page.section('Adult Bedtime', section => {
            section.deviceSetting('adultBedtimeDoor').capability(['contactSensor']).name('Door');
            section.timeSetting('adultBedtimeStartTime').name('Start Time');
            section.timeSetting('adultBedtimeEndTime').name('End Time');
            section.deviceSetting('adultBedtimeRoutine').capability(['switch']).name('Routine');

        });


        page.section('', section => {
            section.booleanSetting('logEnable').name('Enable debug logging?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.adultBedtimeDoor, 'contactSensor', 'contact.closed', 'adultBedtimeHandler')

    })

    .subscribedEventHandler('adultBedtimeHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        let startToday = this.timeToday(adultBedtimeStartTime)
        let endToday = this.timeToday(adultBedtimeEndTime)
        if (this.timeOfDayIsBetween(startToday, endToday, new Date(), location.timeZone)) {
        
        context.api.devices.sendCommands(context.config.adultBedtimeRoutine, 'switch', on)
    
        }
        

	})

    .subscribedEventHandler('kidWakeUpHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        let startToday = this.timeToday(kidWakeUpStartTime)
        let endToday = this.timeToday(kidWakeUpEndTime)
        if (this.timeOfDayIsBetween(startToday, endToday, new Date(), location.timeZone)) {
        
        context.api.devices.sendCommands(context.config.kidWakeUpRoutine, 'switch', on)
    
        }
        

	})

    .subscribedEventHandler('kidBedtimeSoonHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        let startToday = this.timeToday(kidBedtimeSoonStartTime)
        let endToday = this.timeToday(kidBedtimeSoonEndTime)
        if (this.timeOfDayIsBetween(startToday, endToday, new Date(), location.timeZone)) {
        
        context.api.devices.sendCommands(context.config.kidBedtimeSoonRoutine, 'switch', on)
    
        }
        

	})

    .subscribedEventHandler('kidLightOffHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        let startToday = this.timeToday(kidLightOffStartTime)
        let endToday = this.timeToday(kidLightOffEndTime)
        if (this.timeOfDayIsBetween(startToday, endToday, new Date(), location.timeZone)) {
        
        context.api.devices.sendCommands(context.config.kidLightOffRoutine, 'switch', on)
    
        }
        

	})

    .subscribedEventHandler('kidBedtimeNowHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        let startToday = this.timeToday(kidBedtimeNowStartTime)
        let endToday = this.timeToday(kidBedtimeNowEndTime)
        if (this.timeOfDayIsBetween(startToday, endToday, new Date(), location.timeZone)) {
        
        context.api.devices.sendCommands(context.config.kidBedtimeNowRoutine, 'switch', on)
    
        }
        

	})
