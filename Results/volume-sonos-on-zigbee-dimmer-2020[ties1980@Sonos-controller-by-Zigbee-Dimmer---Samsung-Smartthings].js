
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is turned on, off or dimmed', section => {
            section.deviceSetting('master').capability(['switch']).name('Where?');

        });


        page.section('Turn on or off all of these switches as well', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Choose Sonos player', section => {
            section.deviceSetting('sonos').capability(['mediaPlayback']).name('On this speaker player');

        });


        page.section('['hideable': true, 'hidden': true], 'More options', section => {
            section.numberSetting('volume').name('Set the volume');

        });


        page.section('And Dim these switches', section => {
            section.deviceSetting('dimSwitches').capability(['switchLevel']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'level', 'dimHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log('Switch on')
        console.log(this.onSwitches())
        

	})

    .subscribedEventHandler('dimHandler', (context, event) => {
        
        console.log("Dim level: ${event.value}")
        console.log("Sonos level: ${sonos.currentLevel}")
        
        context.api.devices.sendCommands(context.config.sonos, 'mediaPlayback', setVolume)
    
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log('Switch off')
        console.log(this.offSwitches())
        

	})
