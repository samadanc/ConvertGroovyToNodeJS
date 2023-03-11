
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Cat Feeder Device:', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('Set Run Time (minutes)', section => {
            section.numberSetting('minutesLater').name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        this.sendPush("Turned ON the $theSwitch switch.")
        console.log("Switch $theSwitch turned: ${event.value}")
        let delay = minutesLater * 60
        console.log("Turning off in $minutesLater minutes ($delayseconds)")
        this.runIn(delay, turnOffSwitch)
        

	})
