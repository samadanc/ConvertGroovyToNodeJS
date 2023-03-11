
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Motion sensor(s) to monitor for inactivity', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('');

        });


        page.section('Garage door(s) to monitor and close', section => {
            section.deviceSetting('garageDoors').capability(['garageDoorControl']).name('');

        });


        page.section('Close after how many minutes of inactivity', section => {
            section.numberSetting('minutes').name('Minutes');

        });


        page.section('Send push notification?', section => {
            section.booleanSetting('sendPush').name('Send push notification on close');

        });


        page.section('Notify if garage door(s) fail to close?', section => {
            section.booleanSetting('sendPushOnDoorFailure').name('Send push notification if garage door(s) fail to close');
            section.numberSetting('checkDoorFailureMinutes').name('Check door(s) closed after this many minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.garageDoors, 'garageDoorControl', 'door.open', 'activityHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion.inactive', 'activityHandler')

    })

    .subscribedEventHandler('activityHandler', (context, event) => {
        
        console.log("activityHandler called: $evt")
        this.runIn(60 * minutes , checkMotion)
        

	})
