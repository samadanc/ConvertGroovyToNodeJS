
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Poller device...', section => {
            section.deviceSetting('pollerDevice').capability(['battery']).name('');

        });


        page.section('Settings', section => {
            section.deviceSetting('alarm').capability(['alarm']).name('Alarm device');

        });


        page.section('Night management', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.pollerDevice, 'battery', 'battery', 'pollerEvent')

    })

    .subscribedEventHandler('pollerEvent', (context, event) => {
        
        console.log("[PollerEvent] checkAlarmCommand==${state.checkAlarmCommandLatest}; poll==${state.pollLatest}; now()==${this.now()}")
        if (state.checkAlarmCommandLatest && this.now() - state.checkAlarmCommandLatest > 660 * 1000) {
        log.error('Checking Alarm Command (timer was asleep?)')
        this.checkAlarmCommand()
        }
        if (state.pollLatest && this.now() - state.pollLatest > 180 * 1000) {
        log.error('Polling (timer was asleep?)')
        this.poll()
        }
        

	})
