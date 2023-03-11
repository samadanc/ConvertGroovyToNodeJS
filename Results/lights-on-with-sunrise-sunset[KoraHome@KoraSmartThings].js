
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When someone isn\'t home after sunset...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Turn on a light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('When returning home, turn light off after...', section => {
            section.numberSetting('minutes1').name('Minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        let now = new Date()
        let sunTime = this.getSunriseAndSunset()
        let sunsOut = null
        
        context.api.devices.sendCommands(context.config.presence1, 'presenceSensor', currentValue)
    
        if (now > sunTime.sunrise && now < sunTime.sunset) {
        sunsOut = 1
        } else {
        sunsOut = 0
        }
        let presenceValue = presence1.find({
        it.currentPresence == 'not present'
        })
        if (presenceValue && sunsOut == 0) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        console.log('It\'s night time. Someone isn\'t home. Turning on lights.')
        } else {
        if (presenceValue && sunsOut == 1) {
        console.log('It\'s day time. Someone isn\'t home. Turning lights off.')
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        } else {
        this.runIn(60 * minutes1 , offHandler)
        console.log('Just turn it off.')
        }
        }
        

	})
