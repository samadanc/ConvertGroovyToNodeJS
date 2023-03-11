
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select your Garage switch', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('Virtual Switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        let currentState = this.updateCurrentDoorState()
        if (event.value == 'on') {
        if (currentState == 'closed') {
        this.OpenDoor()
        this.runIn(60 * 5, updated)
        }
        } else {
        if (currentState == 'open') {
        this.CloseDoor()
        this.runIn(60 * 5, updated)
        }
        }
        console.log("Event: $evt last state $currentState new state ${theSwitch.currentSwitch}")
        

	})
