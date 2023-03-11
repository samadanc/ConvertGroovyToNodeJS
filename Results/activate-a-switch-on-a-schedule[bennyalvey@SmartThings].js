
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on/off a switch...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('At what time?', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        console.log("scheduledCheck: $settings")
        let latestValue = switch1.currentSwitch
        if (latestValue == 'off') {
        console.log('Switch is currently off, switching on')
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        } else {
        if (latestValue == 'on') {
        console.log('Switch is currently on, switching off')
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        } else {
        console.log("Latest value is not on or off, by default turn switch off. Value: $latestValue")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        }
        

	})
