
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('The switch whose off button will be re-purposed', section => {
            section.deviceSetting('master').capability(['switch']).name('Where?');

        });


        page.section('The switch(es) to be toggled', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        java.lang.Boolean isStateChange = event.isStateChange()
        console.log("Master Switch Changed State: $isStateChange")
        java.lang.Boolean isOff = master.latestState
        console.log("Master Switch Currently Off: $isOff")
        if (isOff && !isStateChange) {
        console.log('Current and prior state were off, let\'s toggle the switches')
        this.toggleSwitches()
        }
        

	})
