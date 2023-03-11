
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I arrive...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Choose your Door Sensor...', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Where?');

        });


        page.section('Select Door Lock', section => {
            section.deviceSetting('lock').capability(['lock']).name('');

        });


        page.section('And verify that it locked after these many minutes (default 10)', section => {
            section.numberSetting('openThreshold').name('');

        });


        page.section('Via text message at this number (or via push notification if not specified', section => {

        });


        page.section('', section => {

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence.present', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        log.trace("lockUnlock(${event.name}: ${event.value})")
        let t0 = this.now()
        let delay = openThreshold != null && openThreshold != '' ? openThreshold * 60 : 600
        console.log('Scheduling of door lock and check')
        this.runIn(delay, lockUnlockedTooLong, ['overwrite': false])
        console.log("Unlocked door due to arrival of ${event.displayName}")
        
        context.api.devices.sendCommands(context.config.lock, 'lock', unlock)
    
        console.log("Scheduled lockUnlockedTooLong in ${(this.now() - t0)} msec")
        

	})
