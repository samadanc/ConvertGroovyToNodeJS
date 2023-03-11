
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the temperature...', section => {
            section.deviceSetting('temperatureSensor1').capability(['temperatureMeasurement']).name('');

        });


        page.section('When the temperature drops below...', section => {
            section.numberSetting('temperatureLow').name('Temperature?');
            section.numberSetting('temperatureLowThreshold').name('Rising Threshold?');

        });


        page.section('When the temperature rises above...', section => {
            section.numberSetting('temperatureHigh').name('Temperature?');
            section.numberSetting('temperatureHighThreshold').name('Dropping Threshold?');

        });


        page.section('Switches to control...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');
            section.enumSetting('switchNormally').name('Normal state of switch (between temps)');
            section.numberSetting('switchInterval').name('Minimum Switch Interval (Minutes)');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor1, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        log.trace("temperature: ${event.value}, $evt")
        let tooCold = temperatureLow
        let rise = temperatureLowThreshold
        let tooHot = temperatureHigh
        let drop = temperatureHighThreshold
        let mySwitch = settings.switch1
        let nextState = state.tempLocation
        let currentTemp = event.doubleValue
        let deltaMinutes = switchInterval
        switch ( nextState ) {
        case -2:
        nextState = 0
        deltaMinutes = 0
        break
        case -1:
        if (currentTemp >= tooCold + rise ) {
        nextState = 0
        }
        break
        case 0:
        if (currentTemp <= tooCold ) {
        nextState = -1
        } else {
        currentTemp >= tooHot .call({
        nextState = 1
        })
        }
        break
        case 1:
        if (currentTemp <= tooHot - drop ) {
        nextState = 0
        }
        break
        default:
        console.log('state.tempLocation is out of range')
        }
        if (state.tempLocation != nextState ) {
        console.log('Checking how long since the last time we changed states')
        let currentTime = this.now()
        let sinceLastChange = currentTime - state.lastChange
        if (sinceLastChange < deltaMinutes * 1000 * 60.toLong()) {
        console.log("Msg already sent to $phone1 within the last $deltaMinutes minutes")
        } else {
        let setTo = nextState == 0 ? switchNormally : switchNormally == 'On' ? 'Off' : 'On'
        state.tempLocation = nextState
        state.lastChange = currentTime
        console.log("Temperature $currentTemp: sending msg to $phone1 and turning $setTo $mySwitch")
        this.send("${temperatureSensor1.displayName} reporting ${event.value}${(event.unit) ? event.unit : F}, turning $setTo switches")
        if (setTo == 'On') {
        switch1*.on()
        } else {
        switch1*.off()
        }
        }
        }
        

	})
