
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on which device?', section => {
            section.deviceSetting('switchOne').capability(['switch']).name('Select Light');

        });


        page.section('For Whom?', section => {
            section.deviceSetting('presenceOne').capability(['presenceSensor']).name('Select Person');

        });


        page.section('On which Days?', section => {
            section.enumSetting('dayOne').name('Select Days');

        });


        page.section('At what time?', section => {
            section.timeSetting('timeOne').name('Select Time');

        });


        page.section('For how long?', section => {
            section.numberSetting('timeTwo').name('Number of minutes');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('turnOnOne', delay);

    })

    .scheduledEventHandler('turnOnOne', (context, event) => {
        
        console.log('Smart Turn it ON')
        
        context.api.devices.sendCommands(context.config.dayOne, 'enum', contains)
    
        if (dayCheck) {
        
        context.api.devices.sendCommands(context.config.presenceOne, 'presenceSensor', latestValue)
    
        if (presenceTwo) {
        
        context.api.devices.sendCommands(context.config.switchOne, 'switch', on)
    
        let delay = timeTwo * 60
        this.runIn(delay, 'turnOffOne')
        }
        }
        

	})
