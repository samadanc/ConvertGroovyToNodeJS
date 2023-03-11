
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose switch to monitor... ', section => {
            section.deviceSetting('myswitch').capability(['switch']).name('');

        });


        page.section('Choose button to monitor... ', section => {
            section.deviceSetting('mybutton').capability(['button']).name('');

        });


        page.section('Choose device to control... ', section => {
            section.deviceSetting('mydevice').capability(['switch']).name('');

        });


        page.section('function', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.myswitch, 'switch', 'switch', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.mybutton, 'button', 'button', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("button action app: ${event.name}, ${event.value}, $settings")
        let level = event.value
        console.log("current action is $level")
        if (level == 'off') {
        console.log('switch off ')
        mydevice."$myfuncoff"()
        } else {
        if (level == 'on') {
        console.log('switch on ')
        mydevice."$myfuncon"()
        } else {
        if (level == 'pushed') {
        console.log('button pushed ')
        mydevice."$myfunc"()
        } else {
        console.log("unknown action: $level ")
        }
        }
        }
        

	})
