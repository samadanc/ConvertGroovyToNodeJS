
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select devices', section => {
            section.deviceSetting('DesktopPower').capability(['switch']).name('Desktop Power');
            section.deviceSetting('MotionSensor').capability(['motionSensor']).name('Motion Sensor');

        });


        page.section('WeekDay Turn on between what times?', section => {
            section.timeSetting('fromTime').name('From');
            section.timeSetting('toTime').name('To');

        });


        page.section('Weekend Turn on between what times?', section => {
            section.timeSetting('fromTime').name('From');
            section.timeSetting('toTime').name('To');

        });


        page.section('Turn off when there\'s been no movement for', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('generalSystemsCheck', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.MotionSensor, 'motionSensor', 'motion', 'MotionHandler')

    })

    .subscribedEventHandler('MotionHandler', (context, event) => {
        
        console.log(event.value)
        if (event.value == 'active') {
        console.log('Motion')
        
        context.api.devices.sendCommands(context.config.DesktopPower, 'switch', on)
    
        } else {
        if (event.value == 'inactive') {
        this.checkMotion()
        console.log('No Motion')
        }
        }
        

	})

    .scheduledEventHandler('generalSystemsCheck', (context, event) => {
        
        console.log('generalSystemsCheck')
        let between = this.timeOfDayIsBetween(fromTime, toTime, new Date(), location.timeZone)
        if (between) {
        } else {
        
        context.api.devices.sendCommands(context.config.DesktopPower, 'switch', off)
    
        }
        

	})
