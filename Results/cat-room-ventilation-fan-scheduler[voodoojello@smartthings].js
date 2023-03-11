
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section('', section => {
            section.deviceSetting('catfanDevice').capability(['switch']).name('Select device to control cat room ventilation fan:');

        });


        page.section('', section => {
            section.numberSetting('runTime').name('Run time in minutes (1-60):');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('fanOff', delay);

        context.api.schedules.schedule('fanOn', delay);

    })

    .scheduledEventHandler('fanOff', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.catfanDevice, 'switch', off)
    
        

	})

    .scheduledEventHandler('fanOn', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.catfanDevice, 'switch', on)
    
        

	})
