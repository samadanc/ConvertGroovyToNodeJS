
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section('', section => {
            section.deviceSetting('hottubDevice').capability(['switch']).name('Select device to control hot tub:');

        });


        page.section('', section => {
            section.enumSetting('startDay').name('Start Day');
            section.timeSetting('startTime').name('Start Time:');

        });


        page.section('', section => {
            section.enumSetting('stopDay').name('Stop Day');
            section.timeSetting('stopTime').name('Stop Time:');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('hotTubOff', delay);

        context.api.schedules.schedule('hotTubOn', delay);

    })

    .scheduledEventHandler('hotTubOn', (context, event) => {
        
        this.sendNotificationEvent("Turned on hot tub at: $startTime")
        
        context.api.devices.sendCommands(context.config.hottubDevice, 'switch', on)
    
        

	})

    .scheduledEventHandler('hotTubOff', (context, event) => {
        
        this.sendNotificationEvent("Turned off hot tub at: $stopTime")
        
        context.api.devices.sendCommands(context.config.hottubDevice, 'switch', off)
    
        

	})
