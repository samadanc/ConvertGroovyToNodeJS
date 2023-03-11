
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When one of these tags leaves...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Monitor these lights...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

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
        if (!presenceValue) {
        console.log('You left.')
        let light = this.leftLightsOn()
        if (light) {
        this.sendPush("$light light was left on.")
        }
        }
        

	})
