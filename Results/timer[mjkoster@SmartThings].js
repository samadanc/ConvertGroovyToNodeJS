
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switches to control', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');

        });


        page.section('Time Settings', section => {
            section.timeSetting('onTime').name('On Time');
            section.timeSetting('offTime').name('Off Time');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('switchOff', delay);

        context.api.schedules.schedule('switchOn', delay);

    })

    .scheduledEventHandler('switchOn', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        

	})

    .scheduledEventHandler('switchOff', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        

	})
