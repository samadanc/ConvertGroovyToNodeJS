
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When all of these people leave home', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Change these thermostats', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Which?');

        });


        page.section('To this Fan setting', section => {
            section.enumSetting('fanSetpoint').name('Which setting?');

        });


        page.section('Turn ON all of these switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        console.log("event.name: ${event.value}")
        if (event.value == 'not present') {
        console.log('checking if everyone is away')
        if (this.everyoneIsAway()) {
        console.log('people are now away so going to change things...')
        this.changeThermo()
        this.changeSwitch()
        this.send("$thermostat fan mode set to '$fanSetpoint', and turning $switches ON because people have left")
        }
        }
        

	})
