
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Poller device...', section => {
            section.deviceSetting('pollerDevice').capability(['battery']).name('');

        });


        page.section('Switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');

        });


        page.section('Daily Event #1', section => {
            section.timeSetting('timeOnAt1').name('Switch on at?');
            section.timeSetting('timeOffAt1').name('Switch off at?');
            section.booleanSetting('enabled1').name('Enabled');

        });


        page.section('Daily Event #2', section => {
            section.timeSetting('timeOnAt2').name('Switch on at?');
            section.timeSetting('timeOffAt2').name('Switch off at?');
            section.booleanSetting('enabled2').name('Enabled');

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
        if (state.checkOnScheduledAt && this.now() - state.checkOnScheduledAt > 60 * 1000) {
        log.error('Waking up checkOn timer')
        this.checkOn()
        }
        if (state.checkOffScheduledAt && this.now() - state.checkOffScheduledAt > 60 * 1000) {
        log.error('Waking up checkOff timer')
        this.checkOff()
        }
        

	})
