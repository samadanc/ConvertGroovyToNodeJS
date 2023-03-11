
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this light is toggled at night', section => {
            section.deviceSetting('light').capability(['switch']).name('');

        });


        page.section('Toggle these camera LEDs', section => {
            section.deviceSetting('camera').capability(['imageCapture']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.light, 'switch', 'switch.off', 'lightOff')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'onSunset')

        await context.api.subscriptions.subscribeToDevices(context.config.light, 'switch', 'switch.on', 'lightOn')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'onSunrise')

    })

    .subscribedEventHandler('onSunrise', (context, event) => {
        
        log.info('Turning off camera LED since the sun is out now')
        
        context.api.devices.sendCommands(context.config.camera, 'imageCapture', ledOff)
    
        

	})

    .subscribedEventHandler('lightOn', (context, event) => {
        
        log.info("${event.displayName} was turned on, turning off camera LED")
        
        context.api.devices.sendCommands(context.config.camera, 'imageCapture', ledOff)
    
        

	})

    .subscribedEventHandler('lightOff', (context, event) => {
        
        console.log("the light is off: $evt")
        let cdt = new Date(this.now())
        let sunsetSunrise = this.getSunriseAndSunset()
        log.trace("Current DT: $cdt, Sunset ${sunsetSunrise.sunset}, Sunrise ${sunsetSunrise.sunrise}")
        if (cdt >= sunsetSunrise.sunset || cdt <= sunsetSunrise.sunrise) {
        log.info("${event.displayName} was turned off at night, turning on camera LED")
        
        context.api.devices.sendCommands(context.config.camera, 'imageCapture', ledOn)
    
        } else {
        log.info("${event.displayName} was turned off during daytime, turning off camera LED")
        
        context.api.devices.sendCommands(context.config.camera, 'imageCapture', ledOff)
    
        }
        

	})

    .subscribedEventHandler('onSunset', (context, event) => {
        
        if (light.currentSwitch == 'off') {
        log.info('Turning on camera LED at sunset since light is off')
        
        context.api.devices.sendCommands(context.config.camera, 'imageCapture', ledOn)
    
        } else {
        log.info('Turning off camera LED at sunset since light is on')
        
        context.api.devices.sendCommands(context.config.camera, 'imageCapture', ledOff)
    
        }
        

	})
