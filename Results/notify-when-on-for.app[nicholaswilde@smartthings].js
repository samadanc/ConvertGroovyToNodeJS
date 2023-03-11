
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When a switch turns on...', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('Notify how many minutes later? (optional, default 15 minutes)', section => {
            section.numberSetting('minutesLater').name('When?');

        });


        page.section('Send this message (optional, sends standard status message if not specified)', section => {
            section.textSetting('messageText').name('Message Text');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Both Push and SMS?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log("Switch $theSwitch turned: ${event.value}")
        let minutesLater = minutesLater ? minutesLater : 15
        let delay = minutesLater * 60
        console.log("Sending notification in $minutesLater minutes ($delays)")
        this.runIn(delay, sendMessage)
        

	})
