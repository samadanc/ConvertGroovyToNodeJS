
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this door opens:', section => {
            section.deviceSetting('thedoor').capability(['contactSensor']).name('Which door?');

        });


        page.section('And motion is not detected here:', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Motion where?');

        });


        page.section('Turn on this light', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('Which light?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thedoor, 'contactSensor', 'contactSensor.open', 'contactOpenedHandler')

    })

    .subscribedEventHandler('contactOpenedHandler', (context, event) => {
        
        console.log("contactOpenedHandler called: $evt")
        
        context.api.devices.sendCommands(context.config.themotion, 'motionSensor', currentState)
    
        if (motionState.value == 'inactive') {
        console.log('There is no motion inside the door, so turn on the lights!')
        this.sendLocationEvent(['name': 'alarmSystemStatus', 'value': 'off'])
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', on)
    
        } else {
        console.log('Motion is active inside the door, so do nothing.')
        }
        

	})
