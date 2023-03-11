
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('At this time every day...', section => {
            section.timeSetting('theTime').name('Time to execute every weekday');

        });


        page.section('... turn on these switches', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('Which?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('handler', delay);

    })

    .scheduledEventHandler('handler', (context, event) => {
        
        console.log("handler called at ${new Date()}")
        let day = Date.parse('yyyy-MM-dd', '2011-03-07').format('EEE')
        if (!(day == 'Sat') || day == 'Sun') {
        
        context.api.devices.sendCommands(context.config.theSwitch, 'switch', on)
    
        }
        

	})
