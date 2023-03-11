
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose indicator', section => {
            section.deviceSetting('indicator').capability(['switchLevel']).name('Where?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.indicator, 'switchLevel', 'switch.off', 'action')

    })

    .subscribedEventHandler('action', (context, event) => {
        
        console.log('Reset countDown')
        
        context.api.devices.sendCommands(context.config.indicator, 'switchLevel', currentState)
    
        console.log("countDown = ${currentState.value}")
        this.timer()
        this.schedule('59 59 23 ? * * *', resetOccurrences)
        

	})
