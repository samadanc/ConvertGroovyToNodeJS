
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When something is opened...', section => {
            section.deviceSetting('sensor1').capability(['contactSensor']).name('What?');

        });


        page.section('Turn on a light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Between Sunset and Sunrise...', section => {
            section.textSetting('sunsetOffsetValue').name('Minutes (+/-)');
            section.textSetting('sunriseOffsetValue').name('Minutes (+/-)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor1, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        let now = new Date()
        let sunriseOffset = sunriseOffsetValue ? sunriseOffsetValue : '00:00'
        let sunsetOffset = sunsetOffsetValue ? sunsetOffsetValue : '00:00'
        let sunTime = this.getSunriseAndSunset(['sunriseOffset': sunriseOffset , 'sunsetOffset': sunsetOffset ])
        console.log("nowTime: $now")
        console.log("adjusted riseTime: ${sunTime.sunrise}")
        console.log("adjusted setTime: ${sunTime.sunset}")
        if (now > sunTime.sunset) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        console.log('Welcome home at night!')
        } else {
        if (now < sunTime.sunrise) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        console.log('Welcome home in the morning!')
        }
        }
        

	})
