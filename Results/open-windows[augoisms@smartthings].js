
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the temperature', section => {
            section.deviceSetting('tempSensorInside').capability(['temperatureMeasurement']).name('Inside Temp');
            section.deviceSetting('tempSensorOutside').capability(['temperatureMeasurement']).name('Outside Temp');

        });


        page.section('When to trigger notification', section => {
            section.numberSetting('tempDelta').name('Temperature delta');
            section.timeSetting('afterTimeInput').name('After this time');
            section.booleanSetting('notifyClose').name('Also notify to close the windows?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Then flash...', section => {
            section.deviceSetting('switches').capability(['switch']).name('These lights');
            section.numberSetting('numFlashes').name('This number of times (default 3)');

        });


        page.section('Time settings in milliseconds (optional)...', section => {
            section.numberSetting('onFor').name('On for (default 1000)');
            section.numberSetting('offFor').name('Off for (default 1000)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.tempSensorOutside, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.tempSensorInside, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        log.trace("temperature: ${event.value}, $evt")
        let insideTemp = tempSensorInside.currentTemperature
        console.log("Inside temp: $insideTemp")
        let outsideTemp = tempSensorOutside.currentTemperature
        console.log("Outside temp: $outsideTemp")
        let lastOutsideTemp = state.lastOutsideTemp ? state.lastOutsideTemp : outsideTemp
        if (Math.abs(lastOutsideTemp - outsideTemp ) > 5) {
        console.log('outside temp has changed more than 5 degrees. Ignoring')
        return null
        }
        state.lastOutsideTemp = outsideTemp
        let tempDiff = insideTemp - outsideTemp
        let afterTimeToday = this.timeToday(afterTimeInput)
        let isAfterTime = this.now() > afterTimeToday.time
        if (tempDiff >= tempDelta && isAfterTime ) {
        console.log('Temperature is below the threshold')
        if (state.notificationOpenWindowsSent) {
        console.log('Notification already sent today')
        } else {
        console.log("Temperature delta is >= $tempDelta:  sending notification")
        let tempScale = location.temperatureScale ? location.temperatureScale : 'F'
        this.send("It's $outsideTemp$tempScale outside. Open the windows", 'notificationOpenWindowsSent')
        this.flashLights()
        }
        }
        if (outsideTemp >= insideTemp ) {
        console.log('Inside temp is now at or above outside temp')
        if (!notifyClose || state.notificationOpenWindowsSent || state.notificationCloseWindowsSent) {
        console.log('Notification already sent today or is disabled')
        } else {
        console.log('Sending close windows notification')
        let tempScale = location.temperatureScale ? location.temperatureScale : 'F'
        this.send("It's $insideTemp$tempScale inside and $outsideTemp$tempScale outside. Close the windows", 'notificationCloseWindowsSent')
        this.flashLights()
        }
        }
        

	})
