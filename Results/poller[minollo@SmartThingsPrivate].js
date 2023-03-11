
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Poller device...', section => {
            section.deviceSetting('pollerDevice').capability(['battery']).name('');

        });


        page.section('Settings... ', section => {
            section.deviceSetting('devices').capability(['polling']).name('Devices');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('poll', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.pollerDevice, 'battery', 'battery', 'pollerEvent')

    })

    .subscribedEventHandler('pollerEvent', (context, event) => {
        
        console.log('[PollerEvent]')
        if (state.keepAliveLatest && this.now() - state.keepAliveLatest > 270000) {
        log.error('Waking up timer')
        this.poll()
        }
        

	})

    .scheduledEventHandler('poll', (context, event) => {
        
        log.info('Polling')
        this.runIn(180, poll)
        state.keepAliveLatest = this.now()
        
        context.api.devices.sendCommands(context.config.devices, 'polling', poll)
    
        

	})
