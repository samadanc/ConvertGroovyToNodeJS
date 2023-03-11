
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Lighting', section => {
            section.deviceSetting('objLight').capability(['switch']).name('Select the lights you want controlled.');
            section.numberSetting('objMinutes').name('How long, in minutes, to keep the lights on.');

        });


        page.section('User Presence', section => {
            section.deviceSetting('objUser').capability(['presenceSensor']).name('Select the presence sensors or phones that will trigger the event.');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.objUser, 'presenceSensor', 'presence', 'handlerCheckPresence')

    })

    .subscribedEventHandler('handlerCheckPresence', (context, event) => {
        
        let sunriseTime = this.getSunriseAndSunset().sunrise.format('yyyy-MM-dd HH:mm:ss', location.timeZone)
        let sunsetTime = this.getSunriseAndSunset().sunset.format('yyyy-MM-dd HH:mm:ss', location.timeZone)
        let currentTime = new Date(((long) this.now())).format('yyyy-MM-dd HH:mm:ss', location.timeZone)
        if (currentTime < sunriseTime && currentTime < sunsetTime ) {
        console.log('0001 to sunrise  // Night')
        if (event.value == 'present') {
        
        context.api.devices.sendCommands(context.config.objLight, 'switch', on)
    
        this.runIn(objMinutes * 60, handlerLightsOff)
        }
        } else {
        if (currentTime > sunriseTime && currentTime < sunsetTime ) {
        console.log('sunrise to sunset // Day')
        
        context.api.devices.sendCommands(context.config.objLight, 'switch', off)
    
        } else {
        if (currentTime > sunriseTime && currentTime > sunsetTime ) {
        console.log('sunset to 2359 // Night')
        if (event.value == 'present') {
        console.log('turning on...')
        
        context.api.devices.sendCommands(context.config.objLight, 'switch', on)
    
        this.runIn(objMinutes * 60, handlerLightsOff)
        }
        }
        }
        }
        

	})
