
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which lock to monitor?', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


        page.section('Automatically lock after', section => {
            section.numberSetting('after').name('Minutes');

        });


        page.section('Timeout to disable SmartLock', section => {
            section.numberSetting('disableTimeout').name('Seconds');

        });


        page.section('Notification method', section => {
            section.booleanSetting('push').name('Smartthings Push Notification');
            section.booleanSetting('pushover').name('Pushover.me Notification');

        });


        page.section('Pushover Notifications', section => {
            section.textSetting('apiKey').name('API Key');
            section.textSetting('userKey').name('User Key');
            section.textSetting('deviceName').name('Device Name (blank for all)');
            section.textSetting('sound').name('Sound');
            section.enumSetting('priority').name('Priority');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        if (state.lockingDoor) {
        state.lockingDoor = false
        return null
        }
        if (state.count == 0) {
        this.startTimer(disableTimeout, clearState)
        console.log("startTimer($disableTimeout,checkDisableSmartLock)")
        }
        state.count = state.count + 1
        console.log("Event Value: ${event.value}")
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', log)
    
        if (event.value == 'unlocked') {
        state.lockTheLock = true
        } else {
        state.lockTheLock = false
        }
        console.log("state.lockTheLock: ${state.lockTheLock}")
        this.checkDisableSmartLock()
        

	})
