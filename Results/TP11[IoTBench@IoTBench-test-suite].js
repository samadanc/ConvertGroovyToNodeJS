
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When a switch turns off...', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('Turn it on how many minutes later?', section => {
            section.numberSetting('minutesLater').name('When?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.off', 'switchOffHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        console.log("Switch $theSwitch turned: ${event.value}")
        let delay = minutesLater * 60
        console.log("Turning off in $minutesLater minutes ($delayseconds)")
        this.runIn(delay, turnOnSwitch)
        

	})
