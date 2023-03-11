
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When all of these people come back', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Change these thermostats', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Which?');

        });


        page.section('To this Fan setting', section => {
            section.enumSetting('fanSetpoint').name('Which setting?');

        });


        page.section('Turn OFF all of these switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        console.log("event.name: ${event.value}")
        if (event.value == 'present') {
        console.log('checking if everyone is back')
        if (this.everyoneIsBack()) {
        console.log('people are now back so going to change things...')
        this.changeThermo()
        this.changeSwitch()
        this.send("$thermostat fan mode set to '$fanSetpoint', and turning $switches OFF because people have come back")
        }
        }
        

	})
