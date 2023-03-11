
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('Turn on a light...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Between this time at night:', section => {
            section.timeSetting('timeOfDay1').name('Time?');

        });


        page.section('And this time in the morning:', section => {
            section.timeSetting('timeOfDay2').name('Time?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        console.log("${event.value}: $evt, $settings")
        let startTime = this.timeToday(timeOfDay1)
        let endTime = this.timeToday(timeOfDay2)
        if (this.now() < startTime.time && this.now() > endTime.time) {
        } else {
        log.trace("Turning on switches: $switches")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        }
        

	})
