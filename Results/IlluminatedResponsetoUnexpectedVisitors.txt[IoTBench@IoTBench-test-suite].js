
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Detect initial motion', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('When motion has been detected by...');
            section.timeSetting('time0').name('Starting from this time...');
            section.timeSetting('time1').name('Until this time...');
            section.deviceSetting('switch1').capability(['switch']).name('Turn on this light');

        });


        page.section('First Escalation', section => {
            section.deviceSetting('switch2').capability(['switch']).name('Turn on a light');

        });


        page.section('Second Escalation', section => {
            section.deviceSetting('switch3').capability(['switch']).name('Turn on this light');
            section.deviceSetting('switch4').capability(['switch']).name('And (optionally) another light');

        });


        page.section('Deactivation', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion.active', 'motionActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion.inactive', 'motionInactiveHandler')

        context.api.schedules.schedule('inactiveTimeoutHandler', delay);

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        if (this.isActivePeriod()) {
        if (state.escalationLevel < 1) {
        this.escalate()
        this.runIn(period1 * 60 + 60, checkMotionStatus)
        }
        }
        

	})

    .subscribedEventHandler('motionInactiveHandler', (context, event) => {
        
        if (state.escalationLevel > 0) {
        this.runIn(inactiveTimeout * 60, inactiveTimeoutHandler, ['overwrite': true])
        }
        

	})

    .scheduledEventHandler('inactiveTimeoutHandler', (context, event) => {
        
        if (state.escalationLevel > 0) {
        this.reset()
        }
        

	})
