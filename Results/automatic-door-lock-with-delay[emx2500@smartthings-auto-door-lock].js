
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the door to lock:', section => {
            section.deviceSetting('theLock').capability(['lock']).name('Which lock?');

        });


        page.section('Select the sensor to use:', section => {
            section.deviceSetting('theSensor').capability(['contactSensor']).name('Which sensor?');

        });


        page.section('Delay in minutes before locking:', section => {
            section.numberSetting('delayTime').name('Delay (in minutes)?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSensor, 'contactSensor', 'contact.closed', 'sensorClosedHandler')

    })

    .subscribedEventHandler('sensorClosedHandler', (context, event) => {
        
        console.log("sensorClosedHandler called: $evt")
        this.runIn(60 * delayTime , delayedLockHandler)
        

	})
