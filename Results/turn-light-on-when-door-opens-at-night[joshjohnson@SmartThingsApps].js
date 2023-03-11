
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When it opens...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('');

        });


        page.section('Turn on a switch...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('For how many seconds...', section => {
            section.numberSetting('secondsDelay').name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        console.log('Contact opened')
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', currentValue)
    
        console.log("Switch state: $currentValue")
        let now = new Date()
        let sunTime = this.getSunriseAndSunset()
        console.log("nowTime: $now")
        console.log("riseTime: ${sunTime.sunrise}")
        console.log("setTime: ${sunTime.sunset}")
        if (now > sunTime.sunset || now < sunTime.sunRise) {
        console.log('It\'s dark outside')
        if (currentValue == 'off') {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        this.runIn(secondsDelay, turnOffSwitch)
        }
        }
        

	})
