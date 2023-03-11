
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a FortrezZ water meter to reset monthly:', section => {
            section.deviceSetting('meter').capability(['energyMeter']).name('Water Meter');

        });


        page.section('Reset Time', section => {
            section.timeSetting('time').name('At this time');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('resetTheMeter', delay);

    })

    .scheduledEventHandler('resetTheMeter', (context, event) => {
        
        Calendar localCalendar = Calendar.getInstance(TimeZone.getDefault())
        let currentDayOfMonth = localCalendar.get(Calendar.DAY_OF_MONTH)
        console.log('Check for 1st day of month...')
        console.log("...day of the month today is $currentDayOfMonth")
        if (currentDayOfMonth == 1) {
        console.log('...Resetting flow meter because it\'s the first day of the month.')
        
        context.api.devices.sendCommands(context.config.meter, 'energyMeter', resetMeter)
    
        } else {
        console.log('...Flow meter reset not scheduled for today because it\'s not the first day of the month.')
        }
        console.log('Check complete, now schedule the SmartApp to check the next day.')
        this.initialize()
        

	})
