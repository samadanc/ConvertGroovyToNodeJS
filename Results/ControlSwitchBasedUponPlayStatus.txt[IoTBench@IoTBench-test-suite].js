
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the player plays...', section => {
            section.deviceSetting('player').capability(['musicPlayer']).name('Which Player?');

        });


        page.section('Turn on a switch...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.player, 'musicPlayer', 'status', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("${event.value}: $evt, $settings")
        log.trace("Turning on switches: $switches")
        if (event.value == 'playing' || event.value == 'paused') {
        this.unschedule('offHandler')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        } else {
        this.runIn(2 * 60, 'offHandler')
        }
        

	})
