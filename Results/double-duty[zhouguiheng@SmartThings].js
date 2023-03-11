
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('The Master switch whose on and/or off buttons will serve as toggles', section => {
            section.deviceSetting('master').capability(['switch']).name('Select');

        });


        page.section('Redundant OFF presses will toggle', section => {
            section.deviceSetting('offSlaves').capability(['switch']).name('Select');

        });


        page.section('Redundant OFF presses will turn off', section => {
            section.deviceSetting('offSlavesOff').capability(['switch']).name('Select');

        });


        page.section('Redundant ON presses will toggle', section => {
            section.deviceSetting('onSlaves').capability(['switch']).name('Select');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.isPhysical()) {
        java.lang.Boolean isStateChange = event.isStateChange()
        console.log("Master Switch Changed State: $isStateChange")
        
        context.api.devices.sendCommands(context.config.master, 'switch', latestState)
    
        console.log("Master Switch Latest State: $state")
        if (!isStateChange) {
        console.log("Press is redundant, toggling slaves associated with the "$state" event")
        if (state == 'on') {
        this.toggleSwitches(onSlaves)
        } else {
        this.toggleSwitches(offSlaves)
        offSlavesOff*.off()
        }
        }
        }
        

	})
