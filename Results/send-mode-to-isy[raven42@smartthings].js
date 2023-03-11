
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.textSetting('isyAddress').name('ISY Address');
            section.numberSetting('isyPort').name('ISY Port');
            section.textSetting('isyUserName').name('ISY Username');
            section.textSetting('isyPassword').name('ISY Password');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        console.log("modeChangeHandler() mode changed '${event.value}'")
        let mode_map = ['Home': 20, 'Away': 21, 'Sleep': 22, 'Off': 23]
        if (location.modes?.find({
        it.name == event.value
        })) {
        console.log("modeChangeHandler() found mode '${event.value}' in location")
        if (mode_map.containsKey(event.value)) {
        console.log("modeChangeHandler() found mode '${event.value}' in mode_map")
        this.sendMode(mode_map[event.value])
        } else {
        console.log("modeChangeHandler() mode ['${event.value}'] not found in mode_map")
        }
        } else {
        console.log("modeChangeHandler() mode ['${event.value}'] not found in location")
        }
        

	})
