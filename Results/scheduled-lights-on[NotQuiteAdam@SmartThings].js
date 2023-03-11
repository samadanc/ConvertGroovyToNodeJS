
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('On time...', section => {
            section.timeSetting('theTime').name('Time to execute every day');

        });


        page.section('On which Days?', section => {
            section.enumSetting('dayOfWeek').name('Select Days');

        });


        page.section('Turn on these devices', section => {
            section.deviceSetting('theSwitches').capability(['switch']).name('');

        });


        page.section('Off time...', section => {
            section.timeSetting('offTime').name('Time to execute every day');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('offHandler', delay);

        context.api.schedules.schedule('handler', delay);

    })

    .scheduledEventHandler('handler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.dayOfWeek, 'enum', contains)
    
        if (dayCheck) {
        
        context.api.devices.sendCommands(context.config.theSwitches, 'switch', on)
    
        }
        

	})

    .scheduledEventHandler('offHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.dayOfWeek, 'enum', contains)
    
        if (dayCheck) {
        
        context.api.devices.sendCommands(context.config.theSwitches, 'switch', off)
    
        }
        

	})
