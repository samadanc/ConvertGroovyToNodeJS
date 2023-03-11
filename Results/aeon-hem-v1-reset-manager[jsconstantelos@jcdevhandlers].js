
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose an Aeon HEM v1 to reset:', section => {
            section.deviceSetting('meter').capability(['energyMeter']).name('Which Aeon HEM v1? (tap here)');

        });


        page.section('Reset Time of Day', section => {
            section.timeSetting('time').name('At this time of day');

        });


        page.section('Reset Day of Month', section => {
            section.numberSetting('day').name('On this day of the month');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('resetTheMeter', delay);

    })

    .scheduledEventHandler('resetTheMeter', (context, event) => {
        
        Calendar localCalendar = Calendar.getInstance(TimeZone.getDefault())
        let currentDayOfMonth = localCalendar.get(Calendar.DAY_OF_MONTH)
        console.log('Aeon HEM v1 meter reset schedule triggered...')
        console.log('...checking for the day of month requested by the user')
        console.log("...the day of the month right now is $currentDayOfMonth")
        console.log("...the day the user requested a reset is $day")
        if (currentDayOfMonth == day ) {
        console.log('...resetting the meter because it\'s when the user requested it.')
        
        context.api.devices.sendCommands(context.config.meter, 'energyMeter', resetMeter)
    
        } else {
        console.log('...meter reset not scheduled for today because it\'s not when the user requested it.')
        }
        console.log('Process completed, now schedule the reset to check on the next day.')
        this.initialize()
        

	})
