
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('The Master switch whose on and/or off buttons will serve as toggles', section => {
            section.deviceSetting('master').capability(['switch']).name('Select');

        });


        page.section('Redundant presses will toggle', section => {
            section.deviceSetting('slaves').capability(['switch']).name('Select');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("Master Switch Changed State: ${event.isStateChange()}")
        if (!(event.isStateChange())) {
        console.log("Press is redundant, master is ${master.currentSwitch} toggling slaves")
        if (master.currentSwitch == 'on') {
        slaves*.on()
        } else {
        slaves*.off()
        }
        }
        

	})
