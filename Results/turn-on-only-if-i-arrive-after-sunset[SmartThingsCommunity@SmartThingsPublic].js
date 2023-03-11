
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I arrive and leave...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Turn on/off a light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        let now = new Date()
        let sunTime = this.getSunriseAndSunset()
        console.log("nowTime: $now")
        console.log("riseTime: ${sunTime.sunrise}")
        console.log("setTime: ${sunTime.sunset}")
        console.log("presenceHandler ${event.name}: ${event.value}")
        
        context.api.devices.sendCommands(context.config.presence1, 'presenceSensor', currentValue)
    
        console.log(current)
        let presenceValue = presence1.find({
        it.currentPresence == 'present'
        })
        console.log(presenceValue)
        if (presenceValue && now > sunTime.sunset) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        console.log('Welcome home at night!')
        } else {
        if (presenceValue && now < sunTime.sunset) {
        console.log('Welcome home at daytime!')
        } else {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        console.log('Everyone\'s away.')
        }
        }
        

	})
