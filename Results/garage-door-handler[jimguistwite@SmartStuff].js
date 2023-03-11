
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose Doors:', section => {
            section.deviceSetting('garageDoors').capability(['garageDoorControl']).name('Garage Doors');

        });


        page.section('Choose Lights:', section => {
            section.deviceSetting('lights').capability(['switch']).name('Lights');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.garageDoors, 'garageDoorControl', 'switch', 'garageDoorStateHandler')

    })

    .subscribedEventHandler('garageDoorStateHandler', (context, event) => {
        
        console.log("GDM: event name: ${event.name} ${event.value}")
        let anyOpen = false
        let message = 'Home: '
        garageDoors.each({
        anyOpen |= 'doorOpen' == it.switchState.value
        message = message + "${it.displayName} "
        if ('doorOpen' == it.switchState.value) {
        message = message + 'OPEN. '
        } else {
        message = message + 'CLOSED. '
        }
        })
        lights.each({
        if (anyOpen) {
        it.on()
        } else {
        it.off()
        }
        })
        this.sendPush(message)
        

	})
