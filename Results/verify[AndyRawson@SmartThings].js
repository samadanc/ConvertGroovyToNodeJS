
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select devices to verify', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'stream', 'alarmHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'activity', 'alarmHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'battery', 'batteryHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchesHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmHandler')

    })

    .subscribedEventHandler('alarmHandler', (context, event) => {
        
        console.log("Verify Event name: ${event.name}")
        console.log("Verify Event value: ${event.value}")
        

	})

    .subscribedEventHandler('batteryHandler', (context, event) => {
        
        console.log("Battery Event device: ${event.device}, Battery Level: ${event.value}")
        

	})

    .subscribedEventHandler('switchesHandler', (context, event) => {
        
        let d = event.device
        let val = event.value
        if (event.value == 'on') {
        console.log("${event.device.hub.id} switch turned on.")
        } else {
        if (event.value == 'off') {
        console.log("$d switch turned off.")
        }
        }
        if (d.hasCommand('refresh')) {
        d.refresh()
        console.log("$d switch refresh")
        if (d.currentSwitch != val ) {
        console.log("$d switch was not turned $val!")
        } else {
        console.log("$d switch was verified $val")
        }
        } else {
        if (d.hasCommand('poll')) {
        d.poll()
        console.log("$d switch poll")
        } else {
        console.log("$d doesn't have polling or refresh commands")
        }
        }
        

	})
