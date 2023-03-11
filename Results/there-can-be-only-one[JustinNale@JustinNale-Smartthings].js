
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is used...', section => {
            section.deviceSetting('master').capability(['switch']).name('Where?');

        });


        page.section('Turn off all of these switches', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        log.info(event.value)
        
        context.api.devices.sendCommands(context.config.master, 'switch', statesSince)
    
        console.log("${recentStates?.size()} STATES FOUND, LAST AT ${(recentStates) ? recentStates[0].dateCreated : }")
        if (event.value == 'on') {
        console.log('detected on, turn off other light(s)')
        offSwitches?.off()
        }
        

	})
