
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the Orbit timer', section => {
            section.deviceSetting('timer').capability(['switch']).name('');

        });


        page.section('Define a schedule', section => {
            section.timeSetting('timerTime').name('Select start time');
            section.enumSetting('timerDays').name('Select day(s) of week');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('timerSchedule', delay);

    })

    .scheduledEventHandler('timerSchedule', (context, event) => {
        
        console.log('Running timerSchedule...')
        let turnOnTimer = false
        Calendar timerCalendar = Calendar.getInstance(location.timeZone)
        java.lang.Integer currentDayOfWeek = timerCalendar.get(Calendar.DAY_OF_WEEK)
        if 
        turnOnTimer = true
        } else {
        if 
        turnOnTimer = true
        } else {
        if 
        turnOnTimer = true
        } else {
        if 
        turnOnTimer = true
        } else {
        if 
        turnOnTimer = true
        } else {
        if 
        turnOnTimer = true
        } else {
        if 
        turnOnTimer = true
        }
        }
        }
        }
        }
        }
        }
        if (turnOnTimer == true) {
        console.log('Turning on the water timer per schedule...')
        settings.timer.on
        this.sendMessage()
        } else {
        console.log('Today is not on the schedule to turn on the water timer...')
        }
        

	})
