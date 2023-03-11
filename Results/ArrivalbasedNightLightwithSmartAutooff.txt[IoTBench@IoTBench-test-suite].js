
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When one of these people arrives', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('And it\'s dark...', section => {
            section.deviceSetting('luminance').capability(['illuminanceMeasurement']).name('Where?');

        });


        page.section('Turn on this light...', section => {
            section.deviceSetting('selectedSwitch').capability(['switch']).name('Where?');

        });


        page.section('And turn it off after...', section => {
            section.numberSetting('turnOffAfterMinutes').name('How many minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        if (event.value != 'present') {
        debug.log('evt isn\'t for presence.')
        return null
        }
        if
        console.log('Light already on. Ignoring arrival.')
        return null
        }
        if (luminance.currentIlluminance > 40) {
        console.log('Too bright. Ignoring arrival.')
        return null
        }
        if (this.now() < state.timeLastTriggered + 2000 * 60) {
        console.log('Triggered too recently. Ignoring arrival.')
        return null
        }
        
        context.api.devices.sendCommands(context.config.selectedSwitch, 'switch', on)
    
        let delaySeconds = 60 * turnOffAfterMinutes
        this.runIn(delaySeconds, switchTimedOut)
        this.subscribe(selectedSwitch, 'switch.off', switchOffHandler)
        state.timeLastTriggered = this.now()
        

	})
