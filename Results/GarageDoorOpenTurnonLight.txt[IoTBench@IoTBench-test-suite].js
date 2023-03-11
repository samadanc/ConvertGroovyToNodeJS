
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the garage door opens...', section => {
            section.deviceSetting('garageContact').capability(['contactSensor']).name('Where?');

        });


        page.section('Turn on these lights...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Turn off these lights after X minutes...', section => {
            section.deviceSetting('switchesOff').capability(['switch']).name('');
            section.numberSetting('threshold').name('Minutes');

        });


        page.section('Sunrise offset (optional)...', section => {
            section.textSetting('sunriseOffsetValue').name('HH:MM');
            section.enumSetting('sunriseOffsetDir').name('Before or After');

        });


        page.section('Sunset offset (optional)...', section => {
            section.textSetting('sunsetOffsetValue').name('HH:MM');
            section.enumSetting('sunsetOffsetDir').name('Before or After');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.garageContact, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        console.log("${event.value}: $evt, $settings")
        let s = this.getSunriseAndSunset(['sunriseOffset': sunriseOffset , 'sunsetOffset': sunsetOffset ])
        let now = new Date()
        let setTime = s.sunset
        
        context.api.devices.sendCommands(context.config.threshold, 'number', toInteger)
    
        console.log("Sunset is at $setTime. Current time is $now")
        if (setTime.before(now)) {
        log.trace("Turning on switches: $switches")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        console.log("runIn($minuteDelay)")
        this.runIn(minuteDelay, turnSwitchesOff)
        }
        

	})
