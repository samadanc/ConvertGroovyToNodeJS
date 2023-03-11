
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Button', section => {
            section.deviceSetting('buttonDevice').capability(['button']).name('Button');

        });


        page.section('Offsets', section => {
            section.numberSetting('sunsetOffset').name('Sunset Offset (minutes)');
            section.numberSetting('sunriseOffset').name('Sunrise Offset (minutes)');

        });


        page.section('Select Light', section => {
            section.deviceSetting('light').capability(['switch']).name('Light');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.buttonDevice, 'button', 'button.pushed', 'buttonEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetTimeHandler')

    })

    .subscribedEventHandler('sunsetTimeHandler', (context, event) => {
        
        this.scheduleEnabledDisabled(event.value, sunsetOffset, true)
        

	})

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
        console.log("buttonEvent: ${event.name} = ${event.value} (${event.data})")
        if (state.enabled == true) {
        let buttonNumber = event.data
        let value = event.value
        
        context.api.devices.sendCommands(context.config.buttonDevice, 'button', eventsSince)
    
        it.value == event.value && it.data == event.data
        })
        console.log("Found ${(recentEvents.size()) ? recentEvents.size() : 0} events in past 3 seconds")
        if (recentEvents.size <= 1) {
        if 
        this.turnOn()
        } else {
        this.scheduleTurnOff()
        }
        } else {
        console.log("Found recent button press events for $buttonNumber with value $value")
        }
        }
        

	})

    .subscribedEventHandler('sunriseTimeHandler', (context, event) => {
        
        this.scheduleEnabledDisabled(event.value, sunriseOffset, false)
        

	})
