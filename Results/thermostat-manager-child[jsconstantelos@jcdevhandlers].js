
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


        page.section('To this Fan setting', section => {
            section.enumSetting('fanSetpoint').name('Which setting?');

        });


        page.section('Configuration', section => {
            section.enumSetting('dayOfWeek').name('Which day of the week?');
            section.timeSetting('time').name('At this time');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('setTheTemp', delay);

    })

    .scheduledEventHandler('setTheTemp', (context, event) => {
        
        let doChange = false
        Calendar localCalendar = Calendar.getInstance(TimeZone.getDefault())
        java.lang.Integer currentDayOfWeek = localCalendar.get(Calendar.DAY_OF_WEEK)
        console.log('Calendar DOW: ' + currentDayOfWeek )
        console.log('SET DOW: ' + dayOfWeek )
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
        if (doChange == true) {
        console.log("Setting temperature in $thermostat to $heatingSetpoint in heat and $coolingSetpoint in cool and the fan to $fanSetpoint")
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setHeatingSetpoint)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setCoolingSetpoint)
    
        if (fanSetpoint == 'On') {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', fanOn)
    
        }
        if (fanSetpoint == 'Auto') {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', fanAuto)
    
        }
        if (fanSetpoint == 'Circulate') {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', fanCirculate)
    
        }
        this.sendMessage("$thermostat heat set to '$heatingSetpoint' and cool to '$coolingSetpoint' and the fan to '$fanSetpoint'")
        } else {
        console.log('Temp change not scheduled for today.')
        }
        console.log('Scheduling next check')
        this.initialize()
        

	})
