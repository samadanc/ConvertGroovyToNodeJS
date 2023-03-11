
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('Turn on these lights...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('and change mode to...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        console.log("${event.value}: $evt, $settings")
        let s = this.getSunriseAndSunset(['zipCode': zipCode , 'sunriseOffset': sunriseOffset , 'sunsetOffset': sunsetOffset ])
        let now = new Date()
        let setTime = s.sunset
        console.log("Sunset is at $setTime. Current time is $now")
        if (setTime.before(now)) {
        log.trace("Turning on switches: $switches")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        log.trace("Changing house mode to $HomeAfterDarkMode")
        this.setLocationMode(HomeAfterDarkMode)
        this.sendPush("Welcome home! Changing mode to $HomeAfterDarkMode.")
        }
        

	})
