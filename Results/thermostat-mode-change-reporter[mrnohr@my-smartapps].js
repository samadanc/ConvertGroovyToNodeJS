
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a thermostat', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatMode', 'thermostatEventHandler')

    })

    .subscribedEventHandler('thermostatEventHandler', (context, event) => {
        
        console.log("thermostatEventHandler - ${event.name} = ${event.value}")
        let secs = 5
        console.log("will check the value in $secs secs and report if different")
        this.runIn(secs, 'sendNotification', ['overwrite': false])
        

	})
