
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this changes...', section => {
            section.deviceSetting('dimmer').capability(['switchLevel']).name('Virtual dimmer switch');

        });


        page.section('Set the color temperature on these...', section => {
            section.deviceSetting('lights').capability(['colorTemperature']).name('Tunable white lights');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.dimmer, 'switchLevel', 'level', 'setLevelHandler')

    })

    .subscribedEventHandler('setLevelHandler', (context, event) => {
        
        let level = event.value.toFloat()
        let kelvin = Math.round(level * 38 + 2700)
        console.log("Dimmer level: $level")
        console.log("Setting color temperature to $kelvin")
        lights?.setColorTemperature(kelvin)
        

	})
