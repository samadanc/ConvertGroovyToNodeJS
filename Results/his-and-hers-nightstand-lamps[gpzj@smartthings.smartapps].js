
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Button to Use:', section => {
            section.deviceSetting('myButton').capability(['button']).name('Who\');

        });


        page.section('Lamps to Control:', section => {
            section.deviceSetting('myLamp').capability(['switch']).name('Main Lamp? (Press Button)');
            section.deviceSetting('theirLamp').capability(['switch']).name('Other Person\');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.myButton, 'button', 'button', 'mainHandler')

    })

    .subscribedEventHandler('mainHandler', (context, event) => {
        
        let data = this.parseJson(event.data)
        console.log("event data: $data")
        console.log("switchOnHandler called: $evt")
        if ($event.value == pressed ) {
        console.log("Toggling $myLamp.")
        this.toggleMyLamp()
        } else {
        if ($event.value == held ) {
        console.log('Double Pressed.')
        this.doublePress()
        }
        }
        

	})
