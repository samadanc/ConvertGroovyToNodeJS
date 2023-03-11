
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switches to turn off indicator lights on...', section => {
            section.deviceSetting('indicators0').capability(['indicator']).name('Indicator On when On');
            section.deviceSetting('indicators1').capability(['indicator']).name('Indicator On when Off');
            section.timeSetting('time0').name('From what time?');
            section.timeSetting('time1').name('Until what time?');

        });


        page.section('Devices Alarming...', section => {
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Which sensor?');
            section.numberSetting('openThreshold').name('Alarm when open longer than...');
            section.deviceSetting('alarmIndicators').capability(['indicator']).name('Indicator Light will be Used as Alarm');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('turnOn', delay);

        context.api.schedules.schedule('turnOff', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensors, 'contactSensor', 'contact', 'deviceContact')

    })

    .subscribedEventHandler('deviceContact', (context, event) => {
        
        log.info("deviceContact, ${event.name}: ${event.value}")
        if (event.value == 'open') {
        this.schedule('* * * * * ?', 'contactOpenCheck')
        } else {
        this.unschedule('contactOpenCheck')
        
        context.api.devices.sendCommands(context.config.alarmIndicators, 'indicator', indicatorWhenOff)
    
        }
        

	})

    .scheduledEventHandler('turnOn', (context, event) => {
        
        log.info('Return indicator lights to original state')
        if (indicators0) {
        
        context.api.devices.sendCommands(context.config.indicators0, 'indicator', indicatorWhenOn)
    
        }
        if (indicators1) {
        
        context.api.devices.sendCommands(context.config.indicators1, 'indicator', indicatorWhenOff)
    
        }
        

	})

    .scheduledEventHandler('turnOff', (context, event) => {
        
        log.info('Turning indicator lights off')
        if (indicators0) {
        
        context.api.devices.sendCommands(context.config.indicators0, 'indicator', indicatorNever)
    
        }
        if (indicators1) {
        
        context.api.devices.sendCommands(context.config.indicators1, 'indicator', indicatorNever)
    
        }
        

	})
