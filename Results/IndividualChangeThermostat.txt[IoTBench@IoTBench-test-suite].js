
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Set these thermostats', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Which?');

        });


        page.section('To these temperatures', section => {

        });


        page.section('Configuration', section => {
            section.enumSetting('dayOfWeek').name('Which day of the week?');
            section.timeSetting('time').name('At this time');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('setTheTemp', delay);

    })

    .scheduledEventHandler('setTheTemp', (context, event) => {
        
        let doChange = false
        Calendar localCalendar = Calendar.getInstance(TimeZone.getDefault())
        java.lang.Integer currentDayOfWeek = localCalendar.get(Calendar.DAY_OF_WEEK)
        if
        doChange = true
        } else {
        if
        doChange = true
        } else {
        if
        doChange = true
        } else {
        if
        doChange = true
        } else {
        if
        doChange = true
        } else {
        if
        doChange = true
        } else {
        if
        doChange = true
        } else {
        if
        doChange = true
        }
        }
        }
        }
        }
        }
        }
        }
        console.log('Calendar DOW: ' + currentDayOfWeek )
        console.log('Configured DOW(s): ' + dayOfWeek )
        if (doChange == true) {
        console.log("setTheTemp, location.mode = ${location.mode}, newMode = $newMode, location.modes = ${location.modes}")
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setHeatingSetpoint)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setCoolingSetpoint)
    
        this.send("$thermostat heat set to '$heatingSetpoint' and cool to '$coolingSetpoint'")
        } else {
        console.log('Temp change not scheduled for today.')
        }
        console.log('Scheduling next check')
        this.initialize()
        

	})
