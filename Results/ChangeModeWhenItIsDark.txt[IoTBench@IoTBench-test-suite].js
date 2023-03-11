
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When these sensors are all dark', section => {
            section.deviceSetting('sensors').capability(['illuminanceMeasurement']).name('');

        });


        page.section('Change to this mode', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'illuminanceMeasurement', 'illuminance', 'lxChange')

    })

    .subscribedEventHandler('lxChange', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (location.mode == newMode ) {
        return false
        }
        if (this.allDark()) {
        this.setLocationMode(newMode)
        let message = "It got dark, so I have changed mode to '$newMode'"
        this.sendPush(message)
        }
        

	})
