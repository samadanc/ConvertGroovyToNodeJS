
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a temperature sensor... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Sensor');

        });


        page.section('Select the outlet(s)... ', section => {
            section.deviceSetting('outlets').capability(['switch']).name('Outlets');

        });


        page.section('Turn on when temp is above ...', section => {

        });


        page.section('Turn off when temp is above ...', section => {

        });


        page.section('Start after Date format (yyyymmdd)...', section => {
            section.numberSetting('startDate').name('Date?');

        });


        page.section('End after Date format (yyyymmdd)...', section => {
            section.numberSetting('endDate').name('Date?');

        });


        page.section('Time Zone Offset ie -5 etc....', section => {
            section.numberSetting('tzOffset').name('Offset?');

        });


        page.section('Disabled?', section => {
            section.booleanSetting('disabled').name('Disabled?');

        });


        page.section('Notifications', section => {
            section.deviceSetting('sendPushMessage').capability(['notification']).name('Notification Devices: Hubitat PhoneApp or Pushover');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        let currenttemp = sensor.currentTemperature
        console.log('in temp handler')
        console.log("current temp = $currenttemp")
        console.log("onSetPoint = $onSetPoint")
        console.log("offSetPoint = $offSetPoint")
        console.log("set offset = $tzOffset")
        console.log("disabled = $disabled")
        let today = new Date()
        let ltf = new java.text.SimpleDateFormat('yyyyMMdd')
        ltf.setTimeZone(TimeZone.getTimeZone("GMT$tzOffset"))
        String date1 = ltf.format(today)
        java.lang.Integer intdate = Integer.parseInt(date1)
        let currSwitches = outlets.currentSwitch
        let onOutlets = currSwitches.findAll({ let switchVal ->
        switchVal == 'on' ? true : false
        })
        let onsize = onOutlets.size()
        
        context.api.devices.sendCommands(context.config.outlets, 'switch', size)
    
        if (disabled == true) {
        console.log('Currently Disabled!')
        if (onsize > 0) {
        console.log('Is Disabled, but some are on...Turning them off!')
        
        context.api.devices.sendCommands(context.config.outlets, 'switch', off)
    
        }
        } else {
        if (intdate >= startDate && intdate <= endDate && currenttemp > onSetPoint && currenttemp < offSetPoint ) {
        console.log("In try turn on, number of outlets on = $onsize, total outlets = $allsize.")
        if (onsize != allsize ) {
        console.log("turning outlets On as ${sensor.displayName} is reporting $currenttemp which is between $onSetPoint and $offSetPoint, and we are within the date range ($startDate - $endDate)!")
        this.mysend("Turning device(s) On as ${sensor.displayName} is reporting a temperature of $currenttemp which is between $onSetPoint and $offSetPoint, and we are within the date range ($startDate - $endDate)!")
        
        context.api.devices.sendCommands(context.config.outlets, 'switch', on)
    
        } else {
        console.log('Not turning on again, all already on!')
        }
        } else {
        console.log("In try turn off, number of outlets  On = $onsize.")
        if (onsize != 0) {
        console.log("turning outlets Off! as ${sensor.displayName} is reporting $currenttemp which is Not between $onSetPoint and $offSetPoint, or we are no longer within the date range ($startDate - $endDate)!")
        this.mysend("Turning device(s) Off as ${sensor.displayName} is reporting a temperature of $currenttemp which is not between $onSetPoint and $offSetPoint, or we are no longer within the date range ($startDate - $endDate)!")
        
        context.api.devices.sendCommands(context.config.outlets, 'switch', off)
    
        } else {
        console.log('All outlets already off!')
        }
        }
        }
        

	})
