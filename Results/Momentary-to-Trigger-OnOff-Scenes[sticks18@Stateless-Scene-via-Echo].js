
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select master momentary switch to monitor', section => {
            section.deviceSetting('theSwitch').capability(['momentary']).name('');

        });


        page.section('Trigger this scene tile if master momentary is turned On', section => {
            section.deviceSetting('switchesOn').capability(['momentary']).name('');

        });


        page.section('Trigger this scene tile if master momentary is turned Off', section => {
            section.deviceSetting('switchesOff').capability(['momentary']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'momentary', 'pushtype', 'toggleHandler')

    })

    .subscribedEventHandler('toggleHandler', (context, event) => {
        
        log.info("Triggering ${event.value} command")
        event.value == 'on' ? switchesOn?.on() : switchesOff?.on()
        

	})
