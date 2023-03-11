
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Change these thermostats modes...', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'changeMode')

    })

    .subscribedEventHandler('changeMode', (context, event) => {
        
        let newMode = location.mode
        log.info("Marking $newMode")
        if (newMode == 'Away') {
        log.info('Marking thermostat AWAY')
        thermostats?.away()
        } else {
        if (newMode == 'Home') {
        log.info('Marking thermostat HOME')
        thermostats?.present()
        }
        }
        

	})
