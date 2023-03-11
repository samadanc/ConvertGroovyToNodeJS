
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Auto-Lock...', section => {
            section.deviceSetting('contact0').capability(['contactSensor']).name('Which door?');
            section.deviceSetting('lock0').capability(['lock']).name('Which lock?');
            section.numberSetting('autolock_delay').name('Delay for auto-Lock after door is closed? (Seconds)');
            section.numberSetting('relock_delay').name('Delay for re-lock w/o opening door? (Seconds)');
            section.numberSetting('leftopen_delay').name('Notify if door open for X seconds.');
            section.enumSetting('push_enabled').name('Enable NORMAL push notifications?');
            section.enumSetting('debug_notify').name('Enable DEBUG push notifications?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock0, 'lock', 'unlock', 'door_handler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact0, 'contactSensor', 'contact.closed', 'door_handler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact0, 'contactSensor', 'contact.open', 'door_handler')

        await context.api.subscriptions.subscribeToDevices(context.config.lock0, 'lock', 'lock', 'door_handler')

    })

    .subscribedEventHandler('door_handler', (context, event) => {
        
        if (event.value == 'closed') {
        this.unschedule(lock_door)
        this.unschedule(notify_door_left_open)
        state.lockattempts = 0
        if (autolock_delay == 0) {
        this.debug_handler("$contact0 closed, locking IMMEDIATELY.")
        this.lock_door()
        } else {
        this.debug_handler("$contact0 closed, locking after $autolock_delay seconds.")
        this.runIn(autolock_delay, 'lock_door')
        }
        }
        if (event.value == 'open') {
        this.unschedule(lock_door)
        this.unschedule(notify_door_left_open)
        this.unschedule(check_door_actually_locked)
        state.lockattempts = 0
        this.debug_handler("$contact0 has been opened.")
        this.runIn(leftopen_delay, 'notify_door_left_open')
        }
        if (event.value == 'unlocked') {
        this.unschedule(lock_door)
        this.unschedule(check_door_actually_locked)
        state.lockattempts = 0
        this.debug_handler("$lock0 was unlocked.")
        this.debug_handler("Re-locking in $relock_delay seconds, assuming door remains closed.")
        this.runIn(relock_delay, 'lock_door')
        }
        if (event.value == 'locked') {
        this.unschedule(lock_door)
        this.debug_handler("$lock0 reports: LOCKED")
        }
        

	})
