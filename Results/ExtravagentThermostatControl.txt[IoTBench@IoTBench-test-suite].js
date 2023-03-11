
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Set these thermostats', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Which?');

        });


        page.section('To these temperatures', section => {
            section.numberSetting('heatingSetpoint').name('When Heating');
            section.numberSetting('coolingSetpoint').name('When Cooling');

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

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'heatingSetpoint', 'heatingSetpointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'temperature', 'temperatureHandler')

        context.api.schedules.schedule('setTheTemp', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'coolingSetpoint', 'coolingSetpointHandler')

    })

    .subscribedEventHandler('heatingSetpointHandler', (context, event) => {
        
        console.log("heatingSetpoint: $evt, $settings")
        

	})

    .subscribedEventHandler('coolingSetpointHandler', (context, event) => {
        
        console.log("coolingSetpoint: $evt, $settings")
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        console.log("currentTemperature: $evt, $settings")
        

	})

    .scheduledEventHandler('setTheTemp', (context, event) => {
        
        let doChange = false
        Calendar localCalendar = Calendar.getInstance(TimeZone.getDefault())
        java.lang.Integer currentDayOfWeek = localCalendar.get(Calendar.DAY_OF_WEEK)
        if (dayOfWeek == 'All Week') {
        doChange = true
        } else {
        if (dayOfWeek == 'Monday' || dayOfWeek == 'Monday to Friday' && currentDayOfWeek == Calendar.instance.MONDAY) {
        doChange = true
        } else {
        if (dayOfWeek == 'Tuesday' || dayOfWeek == 'Monday to Friday' && currentDayOfWeek == Calendar.instance.TUESDAY) {
        doChange = true
        } else {
        if (dayOfWeek == 'Wednesday' || dayOfWeek == 'Monday to Friday' && currentDayOfWeek == Calendar.instance.WEDNESDAY) {
        doChange = true
        } else {
        if (dayOfWeek == 'Thursday' || dayOfWeek == 'Monday to Friday' && currentDayOfWeek == Calendar.instance.THURSDAY) {
        doChange = true
        } else {
        if (dayOfWeek == 'Friday' || dayOfWeek == 'Monday to Friday' && currentDayOfWeek == Calendar.instance.FRIDAY) {
        doChange = true
        } else {
        if (dayOfWeek == 'Saturday' || dayOfWeek == 'Saturday & Sunday' && currentDayOfWeek == Calendar.instance.SATURDAY) {
        doChange = true
        } else {
        if (dayOfWeek == 'Sunday' || dayOfWeek == 'Saturday & Sunday' && currentDayOfWeek == Calendar.instance.SUNDAY) {
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
        console.log('SET DOW: ' + dayOfWeek )
        if (doChange == true) {
        console.log("setTheTemp, location.mode = ${location.mode}, newMode = $newMode, location.modes = ${location.modes}")
        if (location.mode != 'Away') {
        console.log(' Entering the set part')
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setHeatingSetpoint)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setCoolingSetpoint)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', poll)
    
        this.send("$label has changed the heat to '$heatingSetpoint' and cooling to '$coolingSetpoint'")
        }
        } else {
        console.log('Temp change not scheduled for today.')
        }
        console.log('End of Fcn')
        

	})
