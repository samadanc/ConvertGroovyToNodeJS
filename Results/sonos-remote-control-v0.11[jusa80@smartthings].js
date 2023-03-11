
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select your devices', section => {
            section.deviceSetting('buttonDevice').capability(['button']).name('Sonos Control');
            section.deviceSetting('levelDevice').capability(['switchLevel']).name('Sonos Volume Control');
            section.deviceSetting('sonos').capability(['audioVolume']).name('Sonos Master');
            section.deviceSetting('sonosSlaves').capability(['audioVolume']).name('Sonos Slaves');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.buttonDevice, 'button', 'button', 'buttonEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.levelDevice, 'switchLevel', 'level', 'buttonEvent')

    })

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
        let device = event.name
        let value = event.value
        console.log("buttonEvent: ${event.name} = ${event.value} (${event.data})")
        console.log("command: $device, value: $value")
        
        context.api.devices.sendCommands(context.config.buttonDevice, 'button', eventsSince)
    
        it.value == event.value && it.data == event.data
        })
        console.log("Found ${(recentEvents.size()) ? recentEvents.size() : 0} events in past 2 seconds")
        if (recentEvents.size <= 1) {
        this.handleCommand(device, value)
        } else {
        console.log("Found recent button press events for $device with value $value")
        }
        

	})
