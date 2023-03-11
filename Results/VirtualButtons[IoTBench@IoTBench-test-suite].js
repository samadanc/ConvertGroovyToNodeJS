
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select your button controller: ', section => {
            section.deviceSetting('buttonDevice').capability(['button']).name('Which?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.buttonDevice, 'button', 'button', 'buttonEvent')

    })

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
        console.log("buttonEvent: ${event.name} ${event.value} (${event.data})")
        let buttonNumber = event.jsonData.buttonNumber
        let buttonId = buttonDevice.id + ':' + buttonNumber
        let children = this.getChildDevices()
        let childButton = children.find({ let d ->
        d.deviceNetworkId == buttonId
        })
        switch (event.value) {
        case 'pushed':
        console.log('pushing the virtual button')
        childButton.push()
        break
        case 'held':
        console.log('holding the virtual button')
        childButton.hold()
        break
        case 'default':
        console.log('releasing the virtual button')
        childButton.release()
        break
        default:
        console.log("Unknown event: ${event.value}")
        }
        

	})
