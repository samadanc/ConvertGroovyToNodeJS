
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on cameras at:', section => {
            section.timeSetting('onTime').name('Time to turn on every day');

        });


        page.section('Turn off cameras at:', section => {
            section.timeSetting('offTime').name('Time to turn off every day');

        });


        page.section('Turn on these cameras', section => {
            section.deviceSetting('theswitch1').capability(['switch']).name('');
            section.deviceSetting('theswitch2').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('armCameras', delay);

        context.api.schedules.schedule('disarmCameras', delay);

    })

    .scheduledEventHandler('disarmCameras', (context, event) => {
        
        console.log("disarmed cameras with event: $evt")
        if (theswitch1) {
        
        context.api.devices.sendCommands(context.config.theswitch1, 'switch', off)
    
        }
        if (theswitch2) {
        
        context.api.devices.sendCommands(context.config.theswitch2, 'switch', off)
    
        }
        

	})

    .scheduledEventHandler('armCameras', (context, event) => {
        
        console.log("armed cameras with event: $evt")
        if (theswitch1) {
        
        context.api.devices.sendCommands(context.config.theswitch1, 'switch', on)
    
        }
        if (theswitch2) {
        
        context.api.devices.sendCommands(context.config.theswitch2, 'switch', on)
    
        }
        

	})
