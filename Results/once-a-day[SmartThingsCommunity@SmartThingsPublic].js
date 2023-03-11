
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select switches to control...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Turn them all on at...', section => {
            section.timeSetting('startTime').name('Turn On Time?');

        });


        page.section('And turn them off at...', section => {
            section.timeSetting('stopTime').name('Turn Off Time?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('startTimerCallback', delay);

        context.api.schedules.schedule('stopTimerCallback', delay);

    })

    .scheduledEventHandler('startTimerCallback', (context, event) => {
        
        console.log('Turning on switches')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        

	})

    .scheduledEventHandler('stopTimerCallback', (context, event) => {
        
        console.log('Turning off switches')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        

	})
