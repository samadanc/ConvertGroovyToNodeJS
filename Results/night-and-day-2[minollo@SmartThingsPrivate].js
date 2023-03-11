
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Poller device...', section => {
            section.deviceSetting('pollerDevice').capability(['battery']).name('');

        });


        page.section('Day modes...', section => {

        });


        page.section('Weekdays mode change times...', section => {
            section.timeSetting('dayTimeWeek').name('Switch to day mode at?');
            section.timeSetting('nightTimeWeek').name('Switch to night mode at?');
            section.timeSetting('sleepTimeWeek').name('Switch to sleep mode at?');
            section.timeSetting('sleepAlarmTimeWeek').name('Switch to sleep with alarm mode at?');

        });


        page.section('Weekend mode change times...', section => {
            section.timeSetting('dayTimeWeekend').name('Switch to day mode at?');
            section.timeSetting('nightTimeWeekend').name('Switch to night mode at?');
            section.timeSetting('sleepTimeWeekend').name('Switch to sleep mode at?');
            section.timeSetting('sleepAlarmTimeWeekend').name('Switch to sleep with alarm mode at?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.pollerDevice, 'battery', 'battery', 'pollerEvent')

    })

    .subscribedEventHandler('pollerEvent', (context, event) => {
        
        console.log('[PollerEvent]')
        if (state.keepAliveLatest && this.now() - state.keepAliveLatest > 450000) {
        log.error('Waking up timer')
        this.timeMonitor()
        }
        

	})
