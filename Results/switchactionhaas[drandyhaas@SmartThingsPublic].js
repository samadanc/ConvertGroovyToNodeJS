
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose switch to monitor for off... ', section => {
            section.deviceSetting('myswitch').capability(['switch']).name('');

        });


        page.section('Delay', section => {
            section.numberSetting('mydelay').name('Wait this many minutes...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.myswitch, 'switch', 'switch.off', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("switch delay action app: ${event.name}, ${event.value}, $settings")
        let level = event.value
        console.log("current action is $level")
        if (level == 'off') {
        console.log("switch off : in $mydelay minutes do action $myaction")
        this.sendPush("switch delay : in $mydelay minutes do action $myaction")
        this.runIn(mydelay * 60, domyaction)
        } else {
        console.log("switch unknown action: $level ")
        }
        

	})
