
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when motion detected:', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Where?');

        });


        page.section('Set Mode when there\'s been  movement for', section => {
            section.numberSetting('ActiveMinutes').name('Minutes?');

        });


        page.section('Turn On switch...', section => {
            section.deviceSetting('switchOn').capability(['switch']).name('');

        });


        page.section('Turn Off switch...', section => {
            section.deviceSetting('switchOff').capability(['switch']).name('');

        });


        page.section('Change home to this mode', section => {

        });


        page.section('Run When Mode is...', section => {

        });


        page.section('Select the operating mode time and days (optional)', section => {
            section.timeSetting('startTime').name('Start Time');
            section.timeSetting('endTime').name('End Time');
            section.enumSetting('dayOfWeek').name('Which day of the week?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("Active motion detected from ${evt?.displayName}")
        if (location.mode == CurrentMode && this.operation_time() && this.day_week()) {
        this.runIn(ActiveMinutes * 60, checkMotion)
        }
        

	})
