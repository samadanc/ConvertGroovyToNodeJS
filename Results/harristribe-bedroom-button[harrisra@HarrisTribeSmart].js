
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Button', section => {
            section.deviceSetting('buttonDevice').capability(['button']).name('Button');

        });


        page.section('Bedroom Light', section => {
            section.deviceSetting('bedroomLightDevice').capability(['switch']).name('Bedroom Light');

        });


        page.section('Bedside Light', section => {
            section.deviceSetting('bedsideLightDevice').capability(['switch']).name('Bedside Light');

        });


        page.section('Desk Light', section => {
            section.deviceSetting('deskLightDevice').capability(['switch']).name('Desk Light');

        });


        page.section('Fan', section => {
            section.deviceSetting('deskLightDevice').capability(['switch']).name('Fan');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.buttonDevice, 'button', 'button', 'buttonEvent')

    })

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.buttonDevice, 'button', eventsSince)
    
        it.value == 'pushed' || it.value == 'double' && it.data == event.data
        }).sum({
        if (it.value == 'double') {
        2
        } else {
        1
        }
        })
        console.log("Found $buttonPresses button press in past 3 seconds")
        switch (event.value) {
        case 'pushed':
        console.log('single press detected')
        break
        case 'double':
        console.log('double press detected')
        break
        case 'held':
        console.log('hold press detected')
        break
        default:
        console.log('unknown event name: ' + event.name)
        }
        let buttonNumber = event.data
        let value = event.value
        

	})
