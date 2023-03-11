
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose garage door to watch', section => {
            section.deviceSetting('doorContact').capability(['contactSensor']).name('Which Sensor?');
            section.deviceSetting('theDoor').capability(['doorControl']).name('Which Door?');

        });


        page.section('Sunset offset (optional)', section => {
            section.textSetting('sunsetOffsetValue').name('HH:MM');
            section.enumSetting('sunsetOffsetDir').name('Before or After');

        });


        page.section('Zip code (optional, defaults to location coordinates)', section => {
            section.textSetting('zipCode').name('Zip Code');

        });


        page.section('Notifications', section => {
            section.textSetting('message').name('Push message to send:');
            section.textSetting('smsMessage').name('SMS message to send:');

        });


        page.section('Frequency of notifications', section => {
            section.numberSetting('notificationDelay').name('Delay between notifications');
            section.numberSetting('notificationCount').name('How many notifications prior to door close?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunriseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.doorContact, 'contactSensor', 'contact', 'doorChanged')

    })

    .subscribedEventHandler('doorChanged', (context, event) => {
        
        log.trace("Entering doorChanged(${event.value})")
        if (event.value == 'open') {
        log.info('Door opened')
        if (state.isNightTime) {
        log.info('Between sunset and sunrise; scheduling watcher')
        this.scheduleDoorChecker()
        }
        } else {
        log.trace('Door closed -- descheduling callbacks')
        state.NotificationCount = 0
        this.unschedule('doorChecker')
        }
        

	})

    .subscribedEventHandler('sunriseHandler', (context, event) => {
        
        console.log('Sun has risen!')
        state.isNightTime = false
        

	})

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
        console.log('Sun has set!')
        state.isNightTime = true
        

	})
