
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on this light', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('Check Presence', section => {
            section.deviceSetting('myPhone').capability(['presenceSensor']).name('');

        });


        page.section('Zip code', section => {
            section.textSetting('zipCode').name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.myPhone, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("presenceHandler called: $evt")
        let s = this.getSunriseAndSunset(['zipCode': zipCode ])
        let setTime = s.sunset
        let riseTime = s.sunrise
        let now = new Date()
        console.log("Time now $now")
        console.log("sunset at the location of your hub $setTime")
        console.log("sunrise at the location of your hub $riseTime")
        console.log("presence is ${event.value}")
        if (now.after(setTime) && event.value == 'present') {
        
        context.api.devices.sendCommands(context.config.theSwitch, 'switch', on)
    
        console.log('Switch: ON')
        }
        

	})
