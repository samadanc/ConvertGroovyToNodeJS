
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I arrive and leave...', section => {
            section.deviceSetting('person').capability(['presenceSensor']).name('Who?');

        });


        page.section('Unlock Which Door at Night...', section => {
            section.deviceSetting('nightdoor').capability(['lock']).name('');

        });


        page.section('Turn on Which Light at Night...', section => {
            section.deviceSetting('nightlights').capability(['switch']).name('');

        });


        page.section('Unlock Which Door During the Day...', section => {
            section.deviceSetting('daydoor').capability(['lock']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.person, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        let data = this.getWeatherFeature('astronomy', zipcode)
        let hour = data.moon_phase.current_time.hour.toInteger()
        if (event.value == 'present') {
        if (hour > 6) {
        
        context.api.devices.sendCommands(context.config.daydoor, 'lock', unlock)
    
        } else {
        if (hour < 7) {
        
        context.api.devices.sendCommands(context.config.nightdoor, 'lock', unlock)
    
        
        context.api.devices.sendCommands(context.config.nightlights, 'switch', on)
    
        }
        }
        }
        

	})
