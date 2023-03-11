
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Dimmer to control', section => {
            section.deviceSetting('dimmer').capability(['switchLevel']).name('Which dimmer?');
            section.numberSetting('brightness').name('On light level');
            section.numberSetting('timeToOff').name('Turn off in .. minutes');

        });


        page.section('When I arrive?', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('When I unlock the door?', section => {
            section.deviceSetting('lock').capability(['lock']).name('');

        });


        page.section('Sunrise offset (optional)...', section => {
            section.textSetting('sunriseOffsetValue').name('HH:MM');
            section.enumSetting('sunriseOffsetDir').name('Before or After');

        });


        page.section('Sunset offset (optional)...', section => {
            section.textSetting('sunsetOffsetValue').name('HH:MM');
            section.enumSetting('sunsetOffsetDir').name('Before or After');

        });


        page.section('Zip code (optional, defaults to location coordinates)...', section => {
            section.textSetting('zipCode').name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.dimmer, 'switchLevel', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lock, 'lock', 'lock', 'lockHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.value == 'on' && timeToOff && timeToOff > 0) {
        this.runIn(timeToOff * 60, turnOffLight)
        console.log("Schedule light to turn off in $timeToOff minutes.")
        } else {
        if (event.value == 'off') {
        this.unschedule(turnOffLight)
        console.log('Light is off, remove scheduled jobs')
        }
        }
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        if (event.value == 'present') {
        console.log('someone has arrived')
        this.setDimmer()
        } else {
        console.log('someone has left')
        }
        

	})

    .subscribedEventHandler('lockHandler', (context, event) => {
        
        if (event.value == 'unlocked') {
        this.setDimmer()
        }
        

	})
