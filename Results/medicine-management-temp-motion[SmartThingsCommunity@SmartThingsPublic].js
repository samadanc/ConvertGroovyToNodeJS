
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('My Medicine in the Refrigerator', section => {
            section.deviceSetting('deviceAccelerationSensor').capability(['accelerationSensor']).name('Movement');
            section.deviceSetting('deviceTemperatureMeasurement').capability(['temperatureMeasurement']).name('Temperature');

        });


        page.section('Temperature Threshold', section => {
            section.numberSetting('tempThreshold').name('Temperature Threshold');

        });


        page.section('Remind me to take my medicine at', section => {
            section.timeSetting('reminderTime').name('Time');

        });


        page.section('My LED Light', section => {
            section.deviceSetting('deviceLight').capability(['colorControl']).name('Smart light');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.deviceAccelerationSensor, 'accelerationSensor', 'acceleration.active', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.deviceTemperatureMeasurement, 'temperatureMeasurement', 'temperature', 'tempHandler')

        context.api.schedules.schedule('checkMotionInPast', delay);

    })

    .subscribedEventHandler('tempHandler', (context, event) => {
        
        if (event.doubleValue > tempThreshold ) {
        console.log("Fridge temp of ${event.value} exceeded threshold")
        this.sendNotification("WARNING: Fridge temp is ${event.value} with threshold of $tempThreshold")
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log('Medication moved. Send stop LED notification')
        this.resetLEDNotification()
        

	})

    .scheduledEventHandler('checkMotionInPast', (context, event) => {
        
        console.log("Checking past 60 minutes of activity from $reminderTime")
        let movement = this.isMoved(state.minutesToCheckPriorToReminder)
        console.log("Motion found: $movement")
        if (!movement) {
        this.sendNotification('Hi, please remember to take your meds in the fridge')
        let reminderTimePlus10 = new Date(this.now() + 10 * 60000)
        this.runOnce(reminderTimePlus10, checkMotionAfterReminder)
        }
        

	})
