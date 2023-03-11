
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Motion Sensor', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Which Motion Sensor?');

        });


        page.section('Select Light Source', section => {
            section.deviceSetting('light').capability(['switch']).name('Which Light Bulb?');

        });


        page.section('Time to wait before turning off the light if no motion is detected', section => {
            section.numberSetting('minutesToWait').name('How many Minutes?');

        });


        page.section('What time period should this app be active?', section => {
            section.timeSetting('fromTime').name('From');
            section.timeSetting('toTime').name('To');

        });


        page.section('On which days should this app be active?', section => {
            section.enumSetting('userDayEnable').name('Select the Days of the Week');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionDetection')

    })

    .subscribedEventHandler('motionDetection', (context, event) => {
        
        let dateFormat = new java.text.SimpleDateFormat('EEEE')
        dateFormat.setTimeZone(location.timeZone)
        let day = dateFormat.format(new Date())
        
        context.api.devices.sendCommands(context.config.userDayEnable, 'enum', contains)
    
        let active = this.timeOfDayIsBetween(fromTime, toTime, new Date(), location.timeZone)
        if (event.value == 'active') {
        console.log('Motion Sensor reported active')
        if (active & dayCheck ) {
        
        context.api.devices.sendCommands(context.config.light, 'switch', on)
    
        }
        } else {
        if (event.value == 'inactive') {
        console.log('Motion Sensor reported Inactive')
        if (active & dayCheck ) {
        this.runIn(60 * minutesToWait , checkIfInactive)
        }
        }
        }
        

	})
