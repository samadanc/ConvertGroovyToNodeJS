
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose thermostat... ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Schedule', section => {
            section.timeSetting('time_on').name('Turn on at...');
            section.timeSetting('time_off').name('Turn off at...');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('changeModeOff', delay);

        context.api.schedules.schedule('changeModeOn', delay);

    })

    .scheduledEventHandler('changeModeOn', (context, event) => {
        
        console.log('Set thermostat mode to HEAT')
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', heat)
    
        

	})

    .scheduledEventHandler('changeModeOff', (context, event) => {
        
        console.log('Set thermostat mode to OFF')
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', off)
    
        

	})
