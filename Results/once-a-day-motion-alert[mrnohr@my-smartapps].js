
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('');
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.active', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if (!(this.hasRunToday()) && timeOk ) {
        state.lastRun = this.now()
        this.sendPush("There was motion near ${motion1.displayName}")
        }
        

	})
