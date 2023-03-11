
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I arrive and leave...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Set Nest to home/away...', section => {
            section.deviceSetting('nest1').capability(['presenceSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("presenceHandler ${event.name}: ${event.value}")
        
        context.api.devices.sendCommands(context.config.presence1, 'presenceSensor', currentValue)
    
        console.log(current)
        let presenceValue = presence1.find({
        it.currentPresence == 'present'
        })
        console.log(presenceValue)
        if (presenceValue) {
        this.runIn(300, setNestToPresent)
        console.log('Someone\'s home!')
        } else {
        
        context.api.devices.sendCommands(context.config.nest1, 'presenceSensor', away)
    
        console.log('Everyone\'s away.')
        }
        

	})
