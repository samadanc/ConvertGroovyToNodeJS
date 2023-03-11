
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I\'m here...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who\');

        });


        page.section('And someone arrives...', section => {
            section.deviceSetting('presence2').capability(['presenceSensor']).name('Who arrives?');

        });


        page.section('Turn the alarm stobe on...', section => {
            section.deviceSetting('alarm').capability(['alarm']).name('Which alarm strobe?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence2, 'presenceSensor', 'presence', 'onPresenceChange')

    })

    .subscribedEventHandler('onPresenceChange', (context, event) => {
        
        console.log("event.name: ${event.value}")
        let youreHere = presence1.latestValue == 'present'
        let theyreHere = presence2.latestValue == 'present'
        console.log("Your Presence: ${presence1.latestValue}")
        console.log("Their Presence: ${presence2.latestValue}")
        console.log("You're Here: $youreHere")
        console.log("They're Here: $theyreHere")
        if (youreHere && theyreHere ) {
        
        context.api.devices.sendCommands(context.config.alarm, 'alarm', strobe)
    
        }
        

	})
