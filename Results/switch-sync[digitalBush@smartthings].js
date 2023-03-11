
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switches to keep in sync', section => {
            section.deviceSetting('switches').capability(['switch']).name('Choose Switches');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.type != 'physical') {
        return null
        }
        let switchesToFlip = this.findSwitchesNotInState(event.value)
        switchesToFlip.each({ let s ->
        s."${event.value}"()
        })
        

	})
