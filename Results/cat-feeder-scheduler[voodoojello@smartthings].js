
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section('', section => {
            section.deviceSetting('catfeederDevice').capability(['switch']).name('Select device to control cat feeder:');

        });


        page.section('', section => {
            section.timeSetting('firstFeeding').name('First Feeding:');

        });


        page.section('', section => {
            section.timeSetting('secondFeeding').name('Second Feeding:');

        });


        page.section('', section => {
            section.timeSetting('thirdFeeding').name('Third Feeding:');

        });


        page.section('', section => {
            section.numberSetting('runTime').name('Motor run time in minutes:');

        });


        page.section('', section => {
            section.numberSetting('minOffset').name('Cron offset minutes (0-60):');
            section.numberSetting('secOffset').name('Cron offset seconds (0-60):');

        });


        page.section('', section => {
            section.textSetting('msgText').name('Notification message:');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('firstFeedingOn', delay);

        context.api.schedules.schedule('firstFeedingOff', delay);

        context.api.schedules.schedule('thirdFeedingOn', delay);

        context.api.schedules.schedule('secondFeedingOff', delay);

        context.api.schedules.schedule('secondFeedingOn', delay);

        context.api.schedules.schedule('thirdFeedingOff', delay);

    })

    .scheduledEventHandler('secondFeedingOn', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.catfeederDevice, 'switch', on)
    
        this.sendPush("$msgText")
        

	})

    .scheduledEventHandler('secondFeedingOff', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.catfeederDevice, 'switch', off)
    
        

	})

    .scheduledEventHandler('firstFeedingOff', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.catfeederDevice, 'switch', off)
    
        

	})

    .scheduledEventHandler('thirdFeedingOn', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.catfeederDevice, 'switch', on)
    
        this.sendPush("$msgText")
        

	})

    .scheduledEventHandler('firstFeedingOn', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.catfeederDevice, 'switch', on)
    
        this.sendPush("$msgText")
        

	})

    .scheduledEventHandler('thirdFeedingOff', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.catfeederDevice, 'switch', off)
    
        

	})
