
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Select Nest thermostat');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        console.log("Location: $location = ${location.currentMode}")
        let set = false
        let away = false
        if (away_modes instanceof String) {
        if (location.currentMode == away_modes ) {
        set = true
        away = true
        }
        } else {
        if
        set = true
        away = true
        }
        }
        if (present_modes instanceof String) {
        if (location.currentMode == present_modes ) {
        set = true
        }
        } else {
        if
        set = true
        }
        }
        if (set && !away) {
        console.log('Set to present')
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', present)
    
        } else {
        if (set) {
        console.log('Set to away')
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', away)
    
        }
        }
        

	})
