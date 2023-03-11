
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose Lights:', section => {
            section.deviceSetting('lights').capability(['switch']).name('Lights');

        });


        page.section('And turn them off at...', section => {
            section.timeSetting('stopTime').name('Turn Off Time?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetHandler')

        context.api.schedules.schedule('stopTimerCallback', delay);

    })

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
        console.log('it is sunset.  turn on lights')
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        

	})

    .scheduledEventHandler('stopTimerCallback', (context, event) => {
        
        console.log('Turning off switches')
        
        context.api.devices.sendCommands(context.config.lights, 'switch', off)
    
        

	})
