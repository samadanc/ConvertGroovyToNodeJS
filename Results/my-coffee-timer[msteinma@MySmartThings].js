
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Configuration settings', section => {
            section.deviceSetting('coffeeSwitch').capability(['switch']).name('Which switch controls the coffee maker?');
            section.timeSetting('coffeeTime').name('When do you want the coffee maker to turn on?');
            section.booleanSetting('coffeeTimerEnabled').name('Enable?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('turniton', delay);

    })

    .scheduledEventHandler('turniton', (context, event) => {
        
        console.log("turniton called at ${new Date()}")
        
        context.api.devices.sendCommands(context.config.coffeeSwitch, 'switch', on)
    
        

	})
