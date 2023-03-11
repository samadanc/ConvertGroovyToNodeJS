
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Disable?', section => {
            section.booleanSetting('disableLogic').name('Disable Logic?');

        });


        page.section('Debug?', section => {
            section.booleanSetting('debugMessages').name('Debug Messages?');

        });


        page.section('Load up the triggers..', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Which Motion?');
            section.deviceSetting('temp').capability(['temperatureMeasurement']).name('Temp Sensor');
            section.deviceSetting('hum').capability(['relativeHumidityMeasurement']).name('Humidity Sensor(s)');
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('');

        });


        page.section('When this device stops drawing power', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('');
            section.numberSetting('DeviceNotRunning').name('Device not running when power drops below (W)');
            section.timeSetting('timeBegin').name('Time of Day to start');
            section.timeSetting('timeEnd').name('Time of Day to stop');

        });


        page.section('Turn off these switches...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temp, 'temperatureMeasurement', 'temperature', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.hum, 'relativeHumidityMeasurement', 'humidity', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion.active', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lightSensor, 'illuminanceMeasurement', 'illuminance', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        if (!disableLogic) {
        
        context.api.devices.sendCommands(context.config.meter, 'powerMeter', currentValue)
    
        if (latestPower <= DeviceNotRunning ) {
        state.deviceInStandby = 1
        } else {
        state.deviceInStandby = 0
        }
        let now = new Date()
        let startCheck = this.timeToday(timeBegin)
        let stopCheck = this.timeToday(timeEnd)
        let between = this.timeOfDayIsBetween(startCheck, stopCheck, now, location.timeZone)
        if (state.deviceInStandby == 1 && between ) {
        switches?.off()
        console.log("ST Turned off the $switches")
        if (debugMessages) {
        this.sendNotificationEvent("ST Turned off the $switches")
        }
        } else {
        if (state.deviceInStandby == 0) {
        console.log('Device was not turned off because: Not in standby')
        if (debugMessages) {
        this.sendNotificationEvent('Device was not turned off because: Not in standby')
        }
        }
        if (!between) {
        console.log('Device was not turned off because: Not between quiet hours')
        if (debugMessages) {
        this.sendNotificationEvent('Device was not turned off because: Not between quiet hours')
        }
        }
        }
        }
        

	})
