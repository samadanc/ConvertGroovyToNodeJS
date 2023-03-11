
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I leave home with...', section => {
            section.deviceSetting('me').capability(['presenceSensor']).name('Your phone');

        });


        page.section('And leave behind...', section => {
            section.deviceSetting('keys').capability(['presenceSensor']).name('Your keys');

        });


        page.section('Send text message at this number (or via push notification if not specified)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.me, 'presenceSensor', 'presence.not present', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        if (keys.currentPresence == 'present') {
        this.sendMessage("It looks like you forgot your ${keys.displayName} at $location!")
        }
        

	})
