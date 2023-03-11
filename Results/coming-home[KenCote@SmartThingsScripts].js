
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I arrive and leave...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Turn on/off a light...', section => {
            section.deviceSetting('dayLights').capability(['switch']).name('');

        });


        page.section('Turn on/off a light at night...', section => {
            section.deviceSetting('nightLights').capability(['switch']).name('');

        });


        page.section('Open/close garage door...', section => {
            section.deviceSetting('gdc1').capability(['garageDoorControl']).name('');

        });


        page.section('Minutes to wait before reversing?', section => {
            section.numberSetting('minutesToWait').name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dayLights, 'switch', 'switch.on', 'homeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.gdc1, 'garageDoorControl', 'door.open', 'homeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.nightLights, 'switch', 'switch.on', 'homeHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("Presence handler: Event Name: ${event.name}, Value: ${event.value}, State Changed ${event.isStateChange()}")
        if (event.isStateChange() && event.value == 'present') {
        state.fromPresence = true
        
        context.api.devices.sendCommands(context.config.dayLights, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.gdc1, 'garageDoorControl', open)
    
        let now = new Date().format('yyyy-MM-dd HH:mm:ss', location.timeZone)
        let sunTime = this.getSunriseAndSunset()
        let sunset = sunTime.sunset.format('yyyy-MM-dd HH:mm:ss', location.timeZone)
        if (now > sunset ) {
        
        context.api.devices.sendCommands(context.config.nightLights, 'switch', on)
    
        }
        }
        

	})

    .subscribedEventHandler('homeHandler', (context, event) => {
        
        if (state.fromPresence) {
        let delay = minutesToWait * 60
        console.log("Turning off $switch1 and closing garage $gdc1 in $delay seconds: Event Name: ${event.name}, Value: ${event.value}, State Changed ${event.isStateChange()}")
        this.runIn(delay, closeUpHandler)
        state.fromPresence = false
        }
        

	})
