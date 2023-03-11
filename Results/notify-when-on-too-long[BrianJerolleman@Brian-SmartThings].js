
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switch to monitor:', section => {
            section.deviceSetting('monitorSwitch').capability(['switch']).name('');

        });


        page.section('Notify after this number of hours:', section => {
            section.numberSetting('hours').name('Hours?');

        });


        page.section('Send Notifications?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.monitorSwitch, 'switch', 'switch.off', 'monitorSwitchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.monitorSwitch, 'switch', 'switch.on', 'monitorSwitchOnHandler')

    })

    .subscribedEventHandler('monitorSwitchOnHandler', (context, event) => {
        
        console.log("monitorSwitchOnHandler called: $evt")
        state.monitorSwitchOn = new Date().format('dd/MM/yyyy hh:mm:ss a Z')
        this.runIn(state.secondsLeft, monitorSwitchCheckHandler)
        

	})

    .subscribedEventHandler('monitorSwitchOffHandler', (context, event) => {
        
        console.log("monitorSwitchOffHandler called: $evt, state.monitorSwitchOn = ${state.monitorSwitchOn}")
        let diff = new Date().getTime() - Date.parse('dd/MM/yyyy hh:mm:ss a Z', state.monitorSwitchOn).getTime() / 1000
        state.secondsLeft = state.secondsLeft - diff
        console.log("monitorSwitchOffHandler called: state.secondsLeft = ${state.secondsLeft}, diff = $diff")
        

	})
