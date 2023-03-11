
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this sensor detects movement', section => {
            section.deviceSetting('accelerationSensor').capability(['accelerationSensor']).name('Select a SmartThings Multi Sensor');

        });


        page.section('Change to this mode when Robot is cleaning', section => {

        });


        page.section('Change to this mode when Robot is finished', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensor, 'accelerationSensor', 'acceleration.active', 'RobotCleaningHandler')

    })

    .subscribedEventHandler('RobotCleaningHandler', (context, event) => {
        
        console.log("RobotCleaningHandler, location.mode = ${location.mode}, runningMode = $runningMode, location.modes = ${location.modes}")
        if (location.mode != runningMode ) {
        if (location.modes?.find({
        it.name == runningMode
        })) {
        this.setLocationMode(runningMode)
        this.sendNotificationEvent("Robot has begun cleaning. I changed mode to '$runningMode' as you requested.")
        console.log("Robot Vacuum Monitor has changed the mode to '$runningMode'")
        } else {
        log.warn("Robot Vacuum Monitor tried to change to undefined mode '$runningMode'")
        }
        }
        this.runIn(2 * 60, RobotCleaningFinished)
        

	})
