
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('alldevices').capability(['beacon']).name('All Devices');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('poll_devices', delay);

    })

    .scheduledEventHandler('poll_devices', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.alldevices, 'beacon', poll)
    
        

	})
